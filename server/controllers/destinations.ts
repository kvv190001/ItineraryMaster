import { pool } from '../config/database.js'
import { Request, Response, response } from 'express'

const createDestination = async (req: Request,res: Response) => {
  try {
    const { destination, description, city, country, img_url, flag_img_url } = req.body

    const results = await pool.query(
      `INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [destination, description, city, country, img_url, flag_img_url]
    )
    res.status(201).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json( { error: (error as Error).message } )
  }
}

const getDestinations = async (req: Request,res: Response) => {
  try {
    const results = await pool.query('SELECT * FROM destinations ORDER BY id ASC')
    res.status(200).json(results.rows)
  }
  catch (error) {
    res.status(409).json( { error: (error as Error).message } )
  }
}

const getDestination = async (req: Request,res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM destinations WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json( { error: (error as Error).message } )
  }
}

const updateDestination = async (req: Request,res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const { destination, description, city, country, img_url, flag_img_url } = req.body
    const results = await pool.query(
      `UPDATE destinations
      SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6
      WHERE id = $7`,
      [destination, description, city, country, img_url, flag_img_url, id]
    )
    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json( { error: (error as Error).message } )
  }
}

const deleteDestination = async (req: Request,res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM destinations WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json( { error: (error as Error).message } )
  }
}

export default {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination
}