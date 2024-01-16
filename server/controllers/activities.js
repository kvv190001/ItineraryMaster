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
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trip_id = parseInt(req.params.trip_id);
    const { activity } = req.body;
    try {
        const results = yield pool.query('INSERT INTO activities (activity, trip_id) VALUES ($1, $2) RETURNING *', [activity, trip_id]);
        res.status(201).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield pool.query('SELECT * FROM activities ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getTripActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trip_id = parseInt(req.params.trip_id);
        const results = yield pool.query('SELECT * FROM activities WHERE trip_id = $1', [trip_id]);
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const updateActivityLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.trip_id);
        const { num_votes } = req.body;
        const results = yield pool.query('UPDATE activities SET num_votes = $1 WHERE id = $2', [parseInt(num_votes), id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const results = yield pool.query('DELETE FROM activities WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
export default {
    getActivities,
    getTripActivities,
    createActivity,
    deleteActivity,
    updateActivityLikes
};
