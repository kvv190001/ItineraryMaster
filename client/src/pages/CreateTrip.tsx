import React, { useState, ChangeEvent, FormEvent } from 'react';
import './CreateTrip.css'

const CreateTrip = ({user, api_url}) => {

    const [post, setPost] = useState({id: 0, title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: "0.0" })
    
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const createPost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        }

        await fetch(`${api_url}/api/trips`, options)
        window.location.href = '/'
    }


    return (
        <div>
            <center><h3> Create New Trip</h3></center>
            <form onSubmit={createPost} >
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
            </form>
        </div>
    )
}

export default CreateTrip