class UI {
    constructor(){
        this.fromCurrency = document.getElementById('CURR_FR').value;
        this.toCurrency = document.getElementById('CURR_TO').value;
        this.fromCurrencyValue = document.getElementById('curr-from-value').value;
        this.toCurrencyValue = document.getElementById('curr-to-value');
        this.convertBtn = document.getElementById('convertBtn');
    }
}