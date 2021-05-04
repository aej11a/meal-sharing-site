import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Link } from 'react-router-dom'

const Pin = ({ text, link }) => {
    const innerContent = (
        <div style={{ marginLeft: '-20px', marginTop: '-40px' }}>
            <img style={{ height: 40 }} src="/mapPin.png" alt="Pin"></img>
            {text}
        </div>
    )
    return link ? (
        <Link to={link} style={{ textDecoration: 'none', color: 'black' }}>
            {innerContent}
        </Link>
    ) : (
        innerContent
    )
}

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

const SimpleMap = ({ meals }) => {
    const [center, setCenter] = React.useState()
    //const [pins, setPins] = React.useState([])
    const showPosition = (position) => {
        let lat = position.coords.latitude
        let lng = position.coords.longitude
        setCenter({ lat, lng })
    }
    // eslint-disable-next-line
    const getPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, posError)
        } else {
            alert('Must be on Google Chrome for this functionality.')
        }
    }
    var pinArray = []
    if (meals) {
        for (var i = 0; i < meals.length; i++) {
            const currPin = (
                <Pin
                    lat={meals[i].latitude}
                    lng={meals[i].longitude}
                    text={meals[i].name}
                    link={`/meals/display/${meals[i].id}`}
                />
            )
            pinArray.push(currPin)
        }
    }
    React.useEffect(() => {
        getPosition()
    }, [getPosition])
    // React.useEffect(() => {
    //     if(props.meals !== undefined){
    //         buildPins(props.meals)
    //     }
    // }, [props.meals])
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
                    {pinArray}
                </GoogleMapReact>
            </div>
        )
    else {
        return null
    }
}

export default SimpleMap
