import React from 'react'
import { useParams } from 'react-router-dom';
import './Card.css'

type TripProps = {
  key: number
  id: number
  title: string
  description: string
  img_url: string
}


const AddTripOptionCard = (props: TripProps) =>  {
  const {destination_id} = useParams();

  const addToTrip = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({trip_id: props.id, destination_id: destination_id})
    }

    await fetch(`/api/trips-destinations`, options)
    window.location.href = '/'
}

  return (
      <div className="Card" style={{ backgroundImage:`url(${props.img_url})`}} >
        <div className="card-info">
          <h2 className="title">{props.title}</h2>
          <p className="description">{props.description}</p>
          <button className="addToTrip" onClick={addToTrip}>+ Add to Trip</button>
        </div>
      </div>
  );
};

export default AddTripOptionCard;