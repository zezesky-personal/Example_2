import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

app.use(cors());
app.use(express.json());

// Fallback image if Google Places doesn't provide one
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400";

const specialtiesMapping = {
    'Dentist': 'Dentist',
    'Vision': 'Optometrist',
    'General': 'Family Medicine',
    'Dermatologist': 'Dermatologist',
    'Cardiologist': 'Cardiologist'
};

app.get('/api/doctors', async (req, res) => {
    const { lat, lng, category, query } = req.query;

    // Base keyword for search
    let searchTerm = "Doctor";
    if (category && category !== 'all') {
        searchTerm = category;
    }
    if (query) {
        searchTerm = `${query} ${searchTerm}`;
    }

    const location = (lat && lng) ? `${lat},${lng}` : null;

    try {
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchTerm)}&key=${GOOGLE_PLACES_API_KEY}`;

        if (location) {
            url += `&location=${location}&radius=5000`; // 5km radius if location provided
        }

        const response = await axios.get(url);
        const results = response.data.results || [];

        // Map and fetch details for each place to get the website
        const doctors = await Promise.all(results.map(async (place, index) => {
            let website = null;
            try {
                const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=website&key=${GOOGLE_PLACES_API_KEY}`;
                const detailRes = await axios.get(detailUrl);
                website = detailRes.data.result?.website;
            } catch (err) {
                console.error("Error fetching place details:", err.message);
            }

            const photoRef = place.photos?.[0]?.photo_reference;
            const imageUrl = photoRef
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`
                : FALLBACK_IMAGE;

            // Extract specialty from category, query or fallback to place type
            let specialty = category && category !== 'all' ? category : 'General';
            if (place.types.includes('dentist')) specialty = 'Dentist';

            return {
                id: place.place_id || index,
                name: place.name,
                specialty: specialty,
                subtitle: specialtiesMapping[specialty] || place.formatted_address.split(',')[0],
                distance: place.rating ? `${place.rating} ⭐ Rating` : "Top Rated",
                image: imageUrl,
                bio: `${place.name} is a high-rated facility located at ${place.formatted_address}. Specializing in ${specialty}. ${place.user_ratings_total ? `Based on ${place.user_ratings_total} reviews.` : ''}`,
                link: website || `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}`
            };
        }));

        res.json(doctors);
    } catch (error) {
        console.error("Error fetching from Google Places:", error.message);
        res.status(500).json({ error: "Failed to fetch doctors from external API" });
    }
});

app.get('/api/categories', (req, res) => {
    const categories = [
        { id: 'all', name: 'All Specialists' },
        { id: 'Dentist', name: 'Dentist' },
        { id: 'Vision', name: 'Vision' },
        { id: 'General', name: 'General' },
        { id: 'Dermatologist', name: 'Dermatologist' },
        { id: 'Cardiologist', name: 'Cardiologist' }
    ];
    res.json(categories);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
