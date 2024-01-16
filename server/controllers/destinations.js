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
const createDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { destination, description, city, country, img_url, flag_img_url } = req.body;
        const results = yield pool.query(`INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *`, [destination, description, city, country, img_url, flag_img_url]);
        res.status(201).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getDestinations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield pool.query('SELECT * FROM destinations ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const getDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const results = yield pool.query('SELECT * FROM destinations WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const updateDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { destination, description, city, country, img_url, flag_img_url } = req.body;
        const results = yield pool.query(`UPDATE destinations
      SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6
      WHERE id = $7`, [destination, description, city, country, img_url, flag_img_url, id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
const deleteDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const results = yield pool.query('DELETE FROM destinations WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message });
    }
});
export default {
    createDestination,
    getDestinations,
    getDestination,
    updateDestination,
    deleteDestination
};
