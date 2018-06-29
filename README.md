# ConCurrency
A currency converter app

## To run locally
```sh
git clone https://github.com/m6code/concurrency.git
npm install
npm start
```

Visit http://localhost:8080 on your browser (Chrome)

## To test project on Chrome
- run ```npm start``` in project root directory
- visit http://localhost:8080
- open developer tools (ctrl + shift + I or F12)
  - go to applications tab -> service worker to check if it is installed properly
- disconnect from the internet and stop server by running ```ctrl + c```
- reload the page. 

if service worker was successfully installed page will show cached content
