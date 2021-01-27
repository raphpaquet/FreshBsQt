
## Project Overview

Fresh BsQt. A grocery delivery app that helps users shop local according to their location. Developed by Ariel Flores, Raphaelle Paquet, and Matthew Ford. 

## Motivation 

It is easy to get groceries delivered from a large grocery store, yet there are few options when it comes to supporting small businesses. Typically, shopping local requires an in person trip to multiple stores. Fresh BsQt revolves around the concept that users can view and buy items from multiple stores at once, and have their groceries delivered. A group project as part of the Lighthouse Labs curriculum.

## Visuals

!["Home page & Login"](client/public/screenshots/home-login2.gif)
!["Shop & map page"](client/public/screenshots/shoppage.gif)
!["Checkout page"](client/public/screenshots/checkout.gif)

## Tech/Frameworks Used

Front End: ReactJS, CSS, Material-UI, Axios, Google Maps Javascript API, Stripe

Back End: NodeJS, Express, PostgreSQL

## Features

Google Maps API. Users can view shops around them, and navigate to the shop website if they want. The system measures the distance between the user and stores, and if the user is within a certain distance, those items will be available for delivery. The map clearly conveys they are truly shopping local. They never have to type in their address for the app to get their location, it is all done in one click. 

Ease of use. Users can effortlessly navigate the app. Their location is targeted with one click, and forms are automatically filled out if they have an account. They are also presented with an option to checkout as a guest if they do not have an account. Users are frequently introduced with simple decisions, an overload of information is never present. 

Stripe. Stripe was leveraged to provide an easy checkout process. As many developers know, building an in house payment system is not always the best solution. Stripe was implemented in a seamless manner that suits the theme and design of the app. 

The database. Adding products to the menu is quick and easy to do. Product entries are added to the database, and the front end code renders the new products without any adjustments. 

## API Keys

Depending on the situation, a google maps API key may be required to run the map system. See setup process for more info.


## Setup
step 1: cd into backend-express and run "npm install".

step 2: While on vagrant run "createdb final_project -O labber"

step 3: run "npm run db:reset" from your backend-express folder

step 4: cd into client and run "npm install".

step 5: Make sure there is a google maps API key. Around line 328 in client/src/components/GoogleMap.js, there should be a valid API key for the map to work. The code should look similar to the example below. 

```
<LoadScript
      googleMapsApiKey='YOUR_API_KEY_HERE'>
      <GoogleMap
```