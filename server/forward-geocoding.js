const axios = require('axios')
const params = {
    access_key: process.env.GEOCODE_KEY,
    query: '109 Williams Ave, Jersey City, NJ',
}

axios
    .get('http://api.positionstack.com/v1/forward', { params })
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
