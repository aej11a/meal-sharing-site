import React, { useState } from 'react'
import { render } from 'react-dom'
import { storage } from '../firebase'

export const ImageUpload = () => {
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')

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
            (snapshot) => {},
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url)
                    })
            }
        )
    }

    console.log('image: ', image)

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}> Upload </button>
            <div></div>
            <div>
                <img
                    style={{ width: '300px', height: '280px' }}
                    src={url}
                    alt="firebase-image"
                />
            </div>
        </div>
    )
}
