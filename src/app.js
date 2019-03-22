const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//set up handlebars engine and view path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up path to static directory
app.use(express.static(path.join(__dirname, '../public')))

//app.com
//app.com/help
//app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Martin Shell'
    }
    )
})

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About Me',
            name: 'Martin Shell'
        }
    )
})

app.get('/help', (req, res) => {
    res.render('help',
        {
            helpText: 'Here is where we would put help information',
            title: 'Help',
            name: 'Martin Shell'
        })
})
app.get('/help/*', (req, res) => {
    res.render('404',
        {
            title: '404',
            name: 'Martin Shell',
            errorMessage: "Help topic not Found"
        })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                forecast,
                location,
                address: req.query.address
                
                
            })

        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' })

    }
    res.send(
        {
            products: []
        })
})


app.get('*', (req, res) => {
    res.render('404',
        {
            title: '404',
            name: 'Martin Shell',
            errorMessage: "Page not Found"
        })
})
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Martin',
//         age:66
//     })
//})


// app.get('/about', (req, res) => {
//     res.send('<h2>About Page</h2>')
// })


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})





