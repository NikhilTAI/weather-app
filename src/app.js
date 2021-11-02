const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecastName = require('./utils/forecastByName')
const forecastCoords = require('./utils/forecastByCoords')
const dotenv = require('dotenv');

dotenv.config({path:'config.env'});

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nikhil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nikhil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    forecastName(req.query.address, (error, forecastData, location) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
app.get('/coords', (req, res) => {
    if (!req.query.coords) {
        return res.send({
            error: 'No location found!'
        })
    }
    forecastCoords(req.query.coords, (error, forecastData, location) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil',
        errorMessage: 'Page not found.'
    })
})
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up on port '+port)
})