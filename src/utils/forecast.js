const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'https://api.darksky.net/forecast/c661b1d468891cfb256fcb706ef5763b/'+lat+','+lon;
    //console.log( url)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out.  The probabilty of rain is " + body.currently.precipProbability + "%");
        }

    })
}



module.exports = forecast