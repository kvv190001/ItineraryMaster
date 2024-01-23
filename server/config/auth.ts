import {pool} from './database.js'
import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport'

const options = {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: "itinerarymaster-production.up.railway.app/auth/github/callback"
}

const verify =  async (accessToken: any, refreshToken: any, profile: any, callback: any) => {
    const { _json: { id, name, login, avatar_url } } = profile

    const userData = {
        githubId: id,
        username: login,
        avatarUrl: avatar_url,
        accessToken
    }

    try {
        const results = await pool.query('SELECT * FROM users WHERE username = $1', [userData.username])
        const user = results.rows[0]

        if(!user){
            const results = await pool.query('INSERT INTO users (githubid, username, avatarurl, accesstoken) VALUES ($1,$2,$3,$4) RETURNING *', [userData.githubId, userData.username, userData.avatarUrl, accessToken])
        }

        const newUser = results.rows[0]
        return callback(null, user)
    } catch (error) {
        return callback(error)
    }
}

export const GitHub = new GitHubStrategy(options, verify)