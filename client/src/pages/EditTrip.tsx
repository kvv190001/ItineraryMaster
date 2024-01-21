import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { useParams } from 'react-router-dom';
import './EditTrip.css'

type TripItem = {
    id: number
    title: string
    description: string
    img_url: string
    num_days: number
    start_date: string
    end_date: string
    total_cost: string
}

const EditTrip = ({data, api_url}) => {

    const {id} = useParams<{id: string}>();
    const [post, setPost] = useState({id: 0, title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: "0.0" })

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id!))[0];
        setPost({id: result.id, title: result.title, description: result.description, img_url: result.img_url, num_days: result.num_days, start_date: result.start_date.slice(0,10), end_date: result.end_date.slice(0,10), total_cost: result.total_cost});
    }, [data, id]);


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    

    const updatePost = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        }

        fetch(`${api_url}/api/trips/` + id, options)
        window.location.href = '/'
    }


    const deletePost = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const options = {
            method: 'DELETE'
        }

        fetch(`${api_url}/api/trips/` + id, options)
        window.location.href = '/'
    }

    return (
        <div>
            <form onSubmit={updatePost}>
                <label>Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange}/><br />
                <br/>

                <label>Description</label><br />
                <textarea rows={5} cols={50} id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                <br/>

                <label>Image URL </label><br />
                <input type="text" id="img_url" name="img_url" value={post.img_url} onChange={handleChange}/><br />
                <br/>

                <label>Number of Days</label><br />
                <input type="number" id="num_days" name="num_days" value={post.num_days} onChange={handleChange}/><br />
                <br/>

                <label>Start Date </label><br />
                <input type="text" id="start_date" name="start_date" value={post.start_date} onChange={handleChange}/><br />
                <br/>

                <label>End Date </label><br />
                <input type="text" id="end_date" name="end_date" value={post.end_date} onChange={handleChange}/><br />
                <br/>

                <label>Total Cost</label><br />
                <input type="text" id="total_cost" name="total_cost" value={post.total_cost} onChange={handleChange}/><br />
                <br/>


                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditTrip