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
import { response } from 'express';
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body;
    try {
        const results = yield pool.query('INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, description, img_url, num_days, start_date, end_date, total_cost]);
        res.status(201).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield pool.query('SELECT * FROM trips ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const results = yield pool.query('SELECT * FROM trips WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const updateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body;
        const results = yield pool.query('UPDATE trips SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost = $7 WHERE id = $8', [title, description, img_url, num_days, start_date, end_date, total_cost, id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        response.status(409).json({ error: error.message });
    }
});
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const activity_deletion = yield pool.query('DELETE FROM activities WHERE trip_id = $1', [id]);
        const user_removal = yield pool.query('DELETE FROM users_trips WHERE trip_id = $1', [id]);
        const destinations_deletion = yield pool.query('DELETE FROM trips_destinations WHERE trip_id = $1', [id]);
        const results = yield pool.query('DELETE FROM trips WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
export default {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
};
