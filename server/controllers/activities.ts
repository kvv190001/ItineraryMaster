import {pool} from '../config/database.js'
import { Request, Response, response } from 'express'

const createActivity = async (req: Request, res: Response) => {
    const trip_id = parseInt(req.params.trip_id)
    const {activity} = req.body
    try{
        const results = await pool.query(
            'INSERT INTO activities (activity, trip_id) VALUES ($1, $2) RETURNING *', [activity, trip_id]
        )
        res.status(201).json(results.rows[0])
    } catch (error){
        res.status(409).json( { error: (error as Error).message })
    }
}

const getActivities = async (req: Request, res: Response) => {
    try{
        const results = await pool.query('SELECT * FROM activities ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: (error as Error).message} )
    }
}

const getTripActivities = async (req: Request, res: Response) => {
    try {
        const trip_id = parseInt(req.params.trip_id)
        const results = await pool.query('SELECT * FROM activities WHERE trip_id = $1', [trip_id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: (error as Error).message} )
    }
    
}

const updateActivityLikes = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.trip_id)
        const {num_votes} = req.body
        const results = await pool.query('UPDATE activities SET num_votes = $1 WHERE id = $2', [parseInt(num_votes), id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: (error as Error).message} )
    }
}

const deleteActivity = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM activities WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: (error as Error).message} )
    }
}

export default{
    getActivities,
    getTripActivities,
    createActivity,
    deleteActivity,
    updateActivityLikes
}