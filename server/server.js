import express from 'express';
import cors from 'cors';
import tripRoutes from './routes/trips.js';
import activityRoutes from './routes/activities.js';
import destinationRoutes from './routes/destinations.js';
import tripDestinationRoutes from './routes/trips_destinations.js';
import userTripRoutes from './routes/users_trips.js';
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ Itinerary Master</h1>');
});
// api routes
app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips-destinations', tripDestinationRoutes);
app.use('/api/users-trips', userTripRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${3001}`);
});
