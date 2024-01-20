import React from 'react'
import './DestinationBtn.css'

type DestinationProps = {
  id: number
  destination: string
}

const DestinationBtn = (props: DestinationProps) =>  {

  return (
    <button className="DestinationBtn" id={props.id.toString()}>{props.destination}</button>
  );

};

export default DestinationBtn;