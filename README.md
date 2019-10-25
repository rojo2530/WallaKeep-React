# WallaKeep-React

## Requirements & dependencies 

* Axios
* React
* Node and NPM
* Bulma
* Antd
* Git (not necessary but recommended)
* MongoDB
* Express

## Introduction

WallaKeep is a SPA application made with React, displays a list of adverts on the front where you can filter by name, price, tag and type (Sell or Buy). 
Then you can see the detail of each advert if you click on it or edit.
Too, you can create a new Advert.

WallaKeep is mobile first.

Use API inside server folder , in next link you can find more info about API:

https://github.com/IsmaelB83/keepcoding-backend-node

Attach App's Capture:

![Alt text](https://github.com/rojo2530/WallaKeep-React/blob/master/Captura2.JPG)

## Install

* Clone Repo with https://github.com/rojo2530/BeerFront.git
* Make sure MongoDB server is running.
* Inside folder server and client, execute `npm install`
* Inside folder server, execute `npm run init` , this command import data into Database.
* Inside Folder server, execute `npm start` , this commando start api server
* Finally execute `npm start` inside client folder

Note: By default , server API is running in port 3001

## Development Notes

In chrome developer tools, in console tab you could view next warning:

`index.js:1375 Warning: Failed prop type: The prop `pages` is marked as required in `Pagination`, but its value is `undefined`.
    in Pagination (at Adverts.jsx:190)
    in Adverts (created by Context.Consumer)
    in Route (at App.js:32)
    in Switch (at App.js:31)
    in Router (created by BrowserRouter)
    in BrowserRouter (at App.js:30)
    in ErrorBoundary (at App.js:28)
    in App (at src/index.js:10)`
    
This error is because because the api does not return the total number of adverts, it is impossible to know the total number of pages beforehand.
