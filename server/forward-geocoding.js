const axios = require('axios')
const params = {
    access_key: process.env.GEOCODE_KEY,
    query: '109 Williams Ave, Jersey City, NJ',
}

axios
    .get('http://api.positionstack.com/v1/forward', { params })
    .then((response) => {
        console.log('Latitude: ' + response.data.data[0].latitude)
        console.log('Longitude: ' + response.data.data[0].longitude)
    })
    .catch((error) => {
        console.log(error)
    })
