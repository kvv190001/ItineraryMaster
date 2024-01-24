import './App.css';
import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ReadTrips from './pages/ReadTrips'
import CreateTrip from './pages/CreateTrip'
import EditTrip from './pages/EditTrip'
import CreateDestination from './pages/CreateDestination'
import ReadDestinations from './pages/ReadDestinations'
import TripDetails from './pages/TripDetails'
import { Link } from 'react-router-dom'
import CreateActivity from './pages/CreateActivity'
import AddToTrip from './pages/AddToTrip'
import Login from './pages/Login'
import Avatar from './components/Avatar'

type userData = {
  id: number
  githubid: number
  username: string
  avatarurl: string
  accesstoken: string
}

const App = () => {
  const API_URL = import.meta.env.MODE === 'production' ? 'https://itinerarymaster-production.up.railway.app' : 'http://localhost:3001'
  
  const [trips, setTrips] = useState([])
  const [user, setUser] = useState<userData>()

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, {credentials: 'include'})
      const json = await response.json()
      console.log(json.user)
      setUser(json.user)
    }

    const fetchTrips = async () => {
      const response = await fetch(`${API_URL}/api/trips`)
      const data = await response.json()
      setTrips(data)
    }

    getUser()
    fetchTrips()
  }, [API_URL]);

  const logout =  async () => {
    const response = await fetch(`${API_URL}/auth/logout`, { credentials: 'include' })
    await response.json()
    window.location.href = '/'
  }

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: user && user.id ?
        <ReadTrips user={user} data={trips} /> : <Login api_url={API_URL}/>
    },
    {
      path:"/trip/new",
      element: user && user.id ?
        <CreateTrip user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path:"/edit/:id",
      element: user && user.id ?
        <EditTrip user={user} data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path:"/destinations",
      element: user && user.id ?
      <ReadDestinations user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path:"/trip/get/:id",
      element: user && user.id ?
        <TripDetails user={user} data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path:"/destination/new/:trip_id",
      element: user && user.id ?
        <CreateDestination user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path:"/activity/create/:trip_id",
      element: user && user.id ?
        <CreateActivity user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path:"/destinations/add/:destination_id",
      element: user && user.id ?
        <AddToTrip user={user} data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    }
  ]);

  
  return ( 
    <div className="App">
      {
        user && user.id ?
          <div className="header">
            <h1>Itinerary Master ✈️</h1>
            <Link to="/"><button className="headerBtn">Explore Trips</button></Link>
            <Link to="/destinations"><button className="headerBtn">Explore Destinations</button></Link>
            <Link to="/trip/new"><button className="headerBtn"> + Add Trip </button></Link>
            <button onClick={logout} className='headerBtn'>Logout</button>
            <Avatar className='avatar' user={user} />
          </div>
        : <></>
      }

      {element}
    </div>
  );
}

export default App;
