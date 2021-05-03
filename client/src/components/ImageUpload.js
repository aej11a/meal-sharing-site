import React, { useState } from 'react'
import { render } from 'react-dom'
import { storage } from 'firebase'

export const ImageUpload = () => {
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {}

    console.log('image: ', image)

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onclick={handleUpload}> Upload </button>
        </div>
    )
}
