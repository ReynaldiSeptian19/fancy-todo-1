const weatherAPI = require('../helpers/weather')

class WeatherController {
    static showWeather = async (req, res, next) => {
        try {
            const cuaca = await weatherAPI()

            res.status(200).json({ cuaca })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = WeatherController