import React, {useState} from 'react';
import './ActivityBtn.css'

type ActivityProps = {
  id: number
  activity: string
  num_votes: number
}

const ActivityBtn = (props: ActivityProps) =>  {

  const [num_votes, setNumVotes] = useState(props.num_votes)

  const updateCount = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({num_votes: num_votes + 1})
    }
    
    fetch('/api/activities/' + props.id, options)
    setNumVotes((num_votes) => num_votes + 1)
  }

  return (
    <button className='activityBtn' id={props.id.toString()} onClick={updateCount}>
      {props.activity} <br/> {'△ ' + num_votes + ' Upvotes' }
    </button>
  )

}

export default ActivityBtn;
