import React, {useState} from "react"
import { useParams } from "react-router-dom"
import './CreateActivity.css'

const AddUserToTrip = ( { api_url } ) => {
    const [username, setUsername] = useState({username: ''})
    const {trip_id} = useParams()

    const handleChange = (event) => {
        const {name, value} = event.target 
        setUsername((prev) => {
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const addUserToTrip = async (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username)
        }

        fetch(`${api_url}/api/users-trips/create/${trip_id}`, options)

        window.location.href = '/'
    }

    return(
        <div >
            <center><h3>Add User To Trip</h3></center>
            <form onSubmit={addUserToTrip}> 
                <label>Enter GitHub Username:</label>
                <input type="text" id="username" name="username" value={username.username} /><br />
                <br />

                <label>Trip ID</label>
                <input type="number" id="trip_id" name="trip_id" value={trip_id} readOnly /><br />
                <br />

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
} 