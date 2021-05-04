import React, { useState } from 'react'
import { render } from 'react-dom'
import { storage } from '../firebase'

export const ImageUpload = () => {
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        console.log('image received')
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            'state_changed',
            (snapsot) => {},
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url)
                    })
            }
        )
    }

    console.log('image: ', image)

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}> Upload </button>
        </div>
    )
}
