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
const createTripUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trip_id = parseInt(req.params.trip_id);
        const { username } = req.body;
        const results = yield pool.query(`
      INSERT INTO users_trips (trip_id, username)
      VALUES($1, $2)
      RETURNING *`, [trip_id, username]);
        res.status(200).json(results.rows[0]);
        console.log('🆕 added user to trip');
    }
    catch (error) {
        res.status(409).json({ error: error.message });
        console.log('Error:', error.message);
    }
});
const getTripUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trip_id = parseInt(req.params.trip_id);
        const results = yield pool.query('SELECT * FROM users_trips WHERE trip_id = $1', [trip_id]);
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
        console.log('🚫 unable to GET all users (travelers) - Error:', error.message);
    }
});
const getUserTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const results = yield pool.query(`
      SELECT trips.* FROM users_trips, trips
      WHERE users_trips.trip_id = trips.id
      AND users_trips.username = $1`, [username]);
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
        console.log('🚫 unable to GET users trips - Error:', error.message);
    }
});
export default {
    createTripUser,
    getTripUsers,
    getUserTrips
};
