import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import './CreateActivity.css'

const CreateActivity = () => {

    const [activity, setActivity] = useState({activity: "" })
    const {trip_id} = useParams();


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setActivity( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const createActivity = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        }
        
        await fetch(`/api/activities/` + trip_id, options)
        window.location.href = '/'
    }

    return (
        <div>
            <center><h3>Add Activity</h3></center>
            <form onSubmit={createActivity}>
                <label>Activity</label> <br />
                <input type="text" id="activity" name="activity" value={activity.activity} onChange={handleChange}/><br />
                <br/>

                <label>Trip ID</label><br />
                <input type="number" id="trip_id" name="trip_id" value={trip_id} readOnly/><br />
                <br/>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreateActivity