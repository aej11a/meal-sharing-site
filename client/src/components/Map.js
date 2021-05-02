import React from 'react'
import GoogleMapReact from 'google-map-react'

const Pin = ({ text }) => (
    <div style={{ marginLeft: '-20px', marginTop: '-40px' }}>
        <img style={{ height: 40 }} src="/mapPin.png" alt="Pin"></img>
        {text}
    </div>
)

const posError = () => {
    if (navigator.permission) {
        navigator.permissions.query({ name: 'geolocation' }).then((res) => {
            if (res.state === 'denied') {
                alert('Please enable location permissions.')
            }
        })
    } else {
        alert('Unable to access location.')
    }
}

const SimpleMap = (props) => {
    const [center, setCenter] = React.useState()
    const showPosition = (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        setCenter({ lat, lng })
    }
    const getPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, posError)
        } else {
            alert('Must be on Google Chrome for this functionality.')
        }
    }
    React.useEffect(() => {
        getPosition()
    }, [getPosition])
    if (center)
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '45vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyDTcOhMHYO4q9iqKBD75sicIxiBLJnFS2s',
                    }}
                    defaultCenter={center}
                    defaultZoom={15}
                >
                    <Pin
                        lat={center.lat}
                        lng={center.lng}
                        text="Your Location"
                    />
                </GoogleMapReact>
            </div>
        )
    else {
        return null
    }
}

export default SimpleMap
