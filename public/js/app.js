// console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const locationButton = document.querySelector('#location')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

locationButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (!navigator.geolocation) {
        alert('geolocation is not supported by your browser.')
    } else {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // console.log(latitude,longitude);
            messageOne.textContent = 'Loading...'
            messageTwo.textContent = ''
    
            fetch('/coords?coords=' + latitude + "," + longitude).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                    }
                })
            })
        });
        
    }
})