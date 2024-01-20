import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/DestinationCard';

type DestinationData = {
    id: number
    destination: string
    description: string
    city: string
    country: string
    img_url: string
    flag_img_url: string
}

type DestinationProps = {
    data: DestinationData[]
}


const ReadDestinations = (props: DestinationProps) => {

    const [destinations, setDestinations] = useState<DestinationData[]>([]);


    useEffect(() => {

        setDestinations(props.data);
    }, [props]);


    return (
        <div className="ReadDestinations">
            {
                destinations && destinations.length > 0 ?
                    destinations.map((destination, index) =>
                        <DestinationCard key={destination.id}
                            id={destination.id}
                            destination={destination.destination}
                            description={destination.description}
                            city={destination.city}
                            country={destination.country}
                            img_url={destination.img_url}
                            flag_img_url={destination.flag_img_url}
                        />
                    ) : <h3 className="noResults">{'No Destinations Yet 😞'}</h3>
            }
        </div>
    )
}

export default ReadDestinations;