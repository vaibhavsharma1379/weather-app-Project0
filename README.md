# weather-app-Project0

# One Weather

One Weather is a web application that displays weather, astronomy, and sports news, Unique facts information based on your location or the city name you enter. It uses Angular JS, HTML, and CSS for the front-end development, and JSON Server for the back-end database. It also uses OpenWeather API, Ninja API, and Astronomy API to fetch the data from different sources.

## Features

- Login and register page for sign in and sign up with full functionality
- Current weather of your location or the city name you enter, with background image and weather icon changing according to the weather condition
- Hourly weather of your location or the city name you enter, from past 7 hours to next 7 hours and weather icon according to weather condition
- Daily weather of your location or the city name you enter, with sorting option and weather icon according to weather condition
- Astronomy view of your location or the city name you enter, with sunrise time, sunset time, moon phase, moon rise time, moon set time, moon illumination, time zone, and background image and moon phase image changing according to the day and night
- Sports news for football, cricket, and golf, with information about stadium, country, region, tournament, start time, and match teams
- Unique facts cards with 10 random facts that change every time you refresh the website
- Navigation bar and footer

## Installation

To install One Weather on your local machine, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/vaibhavsharma1379/weather-app-Project0.git`
2. Navigate to the project folder using `cd oneweather`
3. Install the dependencies using `npm install`
4. Start the JSON Server using `json-server --watch db.json`
5. Start the Angular JS server using `ng serve`
6. Open your browser and go to `http://localhost:4200`

## Usage

To use One Weather on your browser, follow these steps:

1. If you are a new user, register an account using the sign up page
2. If you are an existing user, log in using the sign in page
3. Choose one of the four options from the navigation bar: Weather, Astronomy, Sports News, or Unique Facts
4. If you choose Weather or Astronomy, you can enter a city name in the search box or use your current location by clicking on the location icon
5. If you choose Sports News, you can see the information about todays matchs: Football, Cricket, or Golf
6. If you choose Unique Facts, you can refresh the page to see new facts
7. Enjoy the information displayed on your screen
