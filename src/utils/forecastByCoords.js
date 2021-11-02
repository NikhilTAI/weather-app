const request = require('request')

const forecast = (coords, callback) => {
    const lat = coords.split(',')[0]
    const lon = coords.split(',')[1]
    
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+ process.env.APIKEY

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod == 404) {
            callback('Unable to find location', undefined)
        } else {
            const location = body.name+","+body.sys.country;
            callback(undefined, body.weather[0].main + '. It is currently ' + body.main.temp + ' degress out. Minimun temperature is '+ body.main.temp_min + ' and maximum temperature is ' + body.main.temp_max +'. Humidity is '+ body.main.humidity +'.', location)
        }
    })
}

module.exports = forecast