var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from '../config/database.js';
const createTripDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trip_id, destination_id } = req.body;
        const results = yield pool.query('INSERT INTO trips_destinations (trip_id, destination_id) VALUES ($1, $2) RETURNING *', [trip_id, destination_id]);
        res.status(201).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getTripsDestinations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield pool.query('SELECT * FROM trips_destinations ORDER BY trip_id ASC');
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getAllTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM trips, trips_destinations WHERE  trips_destinations.trip_id = trips.id AND trips_destinations.destination_id = $1';
        const destination_id = parseInt(req.params.destination_id);
        const results = yield pool.query(query, [destination_id]);
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getAllDestinations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM destinations, trips_destinations WHERE trips_destinations.destination_id = destinations.id AND trips_destinations.trip_id = $1';
        const trip_id = parseInt(req.params.trip_id);
        const results = yield pool.query(query, [trip_id]);
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
export default {
    createTripDestination,
    getTripsDestinations,
    getAllTrips,
    getAllDestinations
};
