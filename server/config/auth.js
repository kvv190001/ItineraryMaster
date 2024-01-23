var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from './database.js';
import { Strategy as GitHubStrategy } from 'passport-github2';
const options = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "itinerarymaster-production.up.railway.app/auth/github/callback"
};
const verify = (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const { _json: { id, name, login, avatar_url } } = profile;
    const userData = {
        githubId: id,
        username: login,
        avatarUrl: avatar_url,
        accessToken
    };
    try {
        const results = yield pool.query('SELECT * FROM users WHERE username = $1', [userData.username]);
        const user = results.rows[0];
        if (!user) {
            const results = yield pool.query('INSERT INTO users (githubid, username, avatarurl, accesstoken) VALUES ($1,$2,$3,$4) RETURNING *', [userData.githubId, userData.username, userData.avatarUrl, accessToken]);
        }
        const newUser = results.rows[0];
        return callback(null, user);
    }
    catch (error) {
        return callback(error);
    }
});
export const GitHub = new GitHubStrategy(options, verify);
