import https from 'https'
import { API_KEY } from './.env'
import readline from 'readline'


// console.log(API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const getCurrencyData = () => {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`

    // console.log(url);


    https.get(url, (response) => {
        let data = ''

        response.on('data', (chunk) => {
            data += chunk
        })

        response.on('end', () => {
            const rates = JSON.parse(data).conversion_rates
            rl.question('Enter amount of the current USD currency: ', (amount)=>{
                rl.question('Enter your selected currency: ', (currency)=>{
                    console.log('The converted amout is : ', amount*rates[(currency).toUpperCase()]);
                })
            })
            // console.log(rates);
        })

        response.on('error', (error) => {
            console.log('Something went wrong! ', error.message);
        })

    })




}

getCurrencyData()