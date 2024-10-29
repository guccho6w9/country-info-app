# Country Infor App

This is a Country Information App that allows users to view information about different countries. The application is structured with a backend (BE) and a frontend (FE), utilizing APIs to fetch country information.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/guccho6w9/country-info-app.git
   cd country-info-app
Backend dependencies (included requirements.txt in BE):

cd BE:

npm install


Frontend dependencies.
cd FE:

npm install

cd FE/country-info:
npm install


## Usage 

1) Start the backend server:

cd BE:

node server.js


2) Start the frontend application:

cd FE:

npm run dev


## API Integration
This application utilizes an external API (restcountries) to fetch ISO3 country codes since the original api's didnt have one. This is to display in the app population data with chart.js.

## Functionality
Users can view a list of available countries.
By clicking on a country, users are redirected to a detailed view where they can see more information about the selected country.
The app includes a fixed header with a logo that links back to the main page.
CORS implemented to run both backend and frontend in different ports.
All API's are public, no need for .env or to save them in config archives.
It was made in like 6 hours.
