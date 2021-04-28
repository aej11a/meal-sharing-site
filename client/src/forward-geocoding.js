const axios = require('axios')

export async function getCoordinates(address) {
    try {
        let apiCall = await getApiCall(address)
        return {
            latitude: apiCall.data.data[0].latitude,
            longitude: apiCall.data.data[0].longitude,
            map_url: apiCall.data.data[0].map_url,
        }
    } catch (error) {
        throw error
    }
}

async function getApiCall(address) {
    const params = {
        access_key: process.env.REACT_APP_GEOCODE_KEY,
        query: address,
    }
    return axios.get('http://api.positionstack.com/v1/forward', { params })
}
