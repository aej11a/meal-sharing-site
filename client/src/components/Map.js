import React from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

const SimpleMap = () => {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '45vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyDTcOhMHYO4q9iqKBD75sicIxiBLJnFS2s',
                }}
                defaultCenter={{
                    lat: 59.95,
                    lng: 30.33,
                }}
                defaultZoom={11}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    )
}

export default SimpleMap
