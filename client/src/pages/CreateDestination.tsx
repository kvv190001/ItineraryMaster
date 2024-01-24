import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import './CreateDestination.css'

const CreateDestination = ({user, api_url}) => {

    const [destination, setDestination] = useState({destination: "", description: "", city: "", country: "", img_url: "", flag_img_url: "" })
    const {trip_id} = useParams();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setDestination( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const createDestination = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        console.log(destination)


        const addDestination = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(destination)
            }

            const response = await fetch(`${api_url}/api/destinations`, options)
            const data = await response.json()
            setDestination(data)
            return data.id 
        }

        const createTripDestination = async (destination_id) => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({trip_id: trip_id, destination_id: destination_id})
            }

            const response = await fetch(`${api_url}/api/trips-destinations`, options)
            const data = await response.json()
            return data 
        }

        const destinationId = await addDestination()
        await createTripDestination(destinationId)
        // window.location.href = '/destinations'
    }

    return (
        <div>
            <center><h3>Add Destination</h3></center>
            <form onSubmit={createDestination}>
                <label>Destination</label> <br />
                <input type="text" id="destination" name="destination" value={destination.destination} onChange={handleChange}/><br />
                <br/>

                <label>Description</label><br />
                <textarea rows={5} cols={50} id="description" name="description" value={destination.description} onChange={handleChange}>
                </textarea>
                <br/>

                <label>City </label><br />
                <input type="text" id="city" name="city" value={destination.city} onChange={handleChange}/><br />
                <br/>

                <label>Country</label><br />
                <input type="text" id="country" name="country" value={destination.country} onChange={handleChange}/><br />
                <br/>

                <label>Image URL </label><br />
                <input type="text" id="img_url" name="img_url" value={destination.img_url} onChange={handleChange}/><br />
                <br/>

                <label>Flag Image URL</label><br />
                <input type="text" id="flag_img_url" name="flag_img_url" value={destination.flag_img_url} onChange={handleChange}/><br />
                <br/>

                <label>Trip ID</label><br />
                <input type="text" id="flag_img_url" name="flag_img_url" value={trip_id} readOnly/><br />
                <br/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default CreateDestination