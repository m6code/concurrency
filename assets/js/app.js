
// instantiate EasyHttp
const httpRequest = new EasyHTTP();

// Instantiate the UI class
const ui = new UI;

// create the query string
const query = `${ui.fromCurrency}_${ui.toCurrency}`;

// Fetch data from API
document.addEventListener('DOMContentLoaded', convertCurrency());

// Convert Currency
function convertCurrency() {
    // make http request
    httpRequest.get(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}