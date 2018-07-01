if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// instantiate EasyHttp
const httpRequest = new EasyHTTP;

// Fetch data from API
document.addEventListener('DOMContentLoaded', convertCurrency());
// convert button
document.getElementById('convertBtn')
    .addEventListener('click', convertCurrency);

// Convert Currency
function convertCurrency() {
    // UI variables
    const fromCurrency = document.getElementById('CURR_FR').value;
    const toCurrency = document.getElementById('CURR_TO').value;
    const fromCurrencyValue = document.getElementById('curr-from-value').value;
    const toCurrencyValue = document.getElementById('curr-to-value');
    // create the query string
    const query = `${fromCurrency}_${toCurrency}`;

    // make http request
    httpRequest.get(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`)
        .then(data => {
            console.log(data);
            // Update the UI with data
            paint(data);
        })
        .catch(err => console.log(err));

    // Update UI
    function paint(data) {
        // toCurrencyValue.value = data.query;
        toCurrencyValue.value = (data[`${query}`] * fromCurrencyValue).toFixed(2);
        console.log(data[`${query}`].toFixed(2));
    }
}