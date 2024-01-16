import {pool} from '../config/database.js'
import { Request, Response, response } from 'express'

const createTripDestination = async (req: Request, res: Response) => {
    try{
        const {trip_id, destination_id} = req.body
        const results = await pool.query('INSERT INTO trips_destinations (trip_id, destination_id) VALUES ($1, $2) RETURNING *', [trip_id, destination_id])

        response.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: (error as Error).message })
    }
}

const getTripsDestinations = async (req: Request, res: Response) => {
    try {
        const results = await pool.query('SELECT * FROM trips_destinations ORDER BY trip_id ASC')
        response.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: (error as Error).message })
    }
}

const getAllTrips = async (req: Request, res: Response) => {
    try{
        const query = 'SELECT * FROM trips, trips_destinations WHERE  trips_destinations.trip_id = trips.id AND trips_destinations.destination_id = $1'
        const destination_id = parseInt(req.params.destination_id)
        const results = await pool.query(query, [destination_id])
        response.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: (error as Error).message })
    }
}

const getAllDestinations = async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM destinations, trips_destinations WHERE trips_destinations.destination_id = destinations.id AND trips_destinations.trip_id = $1'
        const trip_id = parseInt(req.params.trip_id)
        const results = await pool.query(query, [trip_id])
        response.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: (error as Error).message })
    }
}

export default {
    createTripDestination,
    getTripsDestinations,
    getAllTrips,
    getAllDestinations
}