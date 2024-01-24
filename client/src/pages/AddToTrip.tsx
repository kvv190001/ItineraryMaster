import React, { useState, useEffect } from 'react';
import AddTripOptionCard from '../components/AddTripOptionCard';

type Trip = {
    id: number
    title: string
    description: string
    img_url: string
}

type userData = {
    id: number
    githubid: number
    username: string
    avatarurl: string
    accesstoken: string
}

type TripProps = {
    user: userData
    data: Trip[]
    api_url: string
}

const AddToTrip = (props: TripProps) => {

    const [trips, setTrips] = useState<Trip[]>([]);
    

    useEffect(() => {
        setTrips(props.data);
    }, [props]);
    
    return (
        <div className="AddToTrip">
            {
                trips && trips.length > 0 ?
                trips.map((trip: Trip,index) => 
                   <AddTripOptionCard key={trip.id} 
                         id={trip.id} 
                         title={trip.title} 
                         description={trip.description} 
                         img_url={trip.img_url}  />
                ) : <h3 className="noResults">{'No Trips Yet 😞'}</h3>
            }
        </div>  
    )
}

export default AddToTrip;