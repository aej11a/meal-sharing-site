import React, { useState } from 'react'
import { render } from 'react-dom'
import { storage } from 'firebase'

const ImageUpload = () => {
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        if (e.target.files[0]) {
        }
    }

    const handleUpload = () => {}

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onclick={handleUpload}> Upload </button>
        </div>
    )
}
