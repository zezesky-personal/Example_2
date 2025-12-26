import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Wilson",
        specialty: "Dentist",
        subtitle: "Cosmetic & Family Dentistry",
        distance: "0.8 miles",
        image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=400",
        bio: "Over 15 years of experience in creating beautiful smiles. Focused on patient comfort and modern techniques.",
        link: "#"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Vision",
        subtitle: "Optometrist",
        distance: "1.2 miles",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
        bio: "Specializing in pediatric vision and advanced contact lens fittings. Dedicated to eye health for all ages.",
        link: "#"
    },
    {
        id: 3,
        name: "Dr. Emily Brooks",
        specialty: "General",
        subtitle: "Family Medicine",
        distance: "2.5 miles",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
        bio: "Comprehensive care for the whole family, from routine checkups to chronic disease management.",
        link: "#"
    },
    {
        id: 4,
        name: "Dr. James Rodriguez",
        specialty: "Dermatologist",
        subtitle: "Skin & Laser Center",
        distance: "3.1 miles",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
        bio: "Expert in clinical and cosmetic dermatology. Specializing in skin rejuvenation and cancer prevention.",
        link: "#"
    },
    {
        id: 5,
        name: "Dr. Linda Martinez",
        specialty: "Dentist",
        subtitle: "Pediatric Dentistry",
        distance: "1.5 miles",
        image: "https://images.unsplash.com/photo-1598256989490-efd3747d6295?auto=format&fit=crop&q=80&w=400",
        bio: "Making dental visits fun for kids. Specialized care for infants, children, and teens.",
        link: "#"
    }
];

const categories = [
    { id: 'all', name: 'All Specialists' },
    { id: 'Dentist', name: 'Dentist' },
    { id: 'Vision', name: 'Vision' },
    { id: 'General', name: 'General' },
    { id: 'Dermatologist', name: 'Dermatologist' },
    { id: 'Cardiologist', name: 'Cardiologist' }
];

app.get('/api/doctors', (req, res) => {
    res.json(doctors);
});

app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
