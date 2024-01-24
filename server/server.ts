import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'
import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/trips_destinations.js'
import userTripRoutes from './routes/users_trips.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(session({
    secret: 'codepath',
    resave: false,
    saveUninitialized: true
}))

const CLIENT_URL = process.env.NODE_ENV === 'production' ? 'https://itinerarymaster-production-b25a.up.railway.app' : 'http://localhost:5173'

app.use(express.json())
app.use(cors({
    origin: CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user: any, done) => {
    done(null, user)
})


app.get('/', (req, res) => {
    res.redirect(CLIENT_URL)
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// auth routes
app.use('/auth', authRoutes)

// api routes
app.use('/api/trips', tripRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/trips-destinations', tripDestinationRoutes)
app.use('/api/users-trips', userTripRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${3001}`)
})

