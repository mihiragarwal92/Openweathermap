# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Weather Application Documentation

## Overview

This weather application fetches current weather data using the OpenWeatherMap API based on user input or geolocation. It displays weather conditions, temperature, and other relevant details in a user-friendly interface. The application supports a light/dark mode toggle for improved user experience.

## Technologies Used

- **React**: Frontend JavaScript library for building user interfaces.
- **axios**: Library for making HTTP requests.
- **animate.css**: Library for animations.
- **react-icons**: Icon library for displaying icons.
- **CSS**: Custom styling for UI components.

## Features

1. **Weather Data Display**
   - Displays current weather conditions, temperature, and location.
   - Provides additional details such as weather description, feels like temperature, min/max temperature, humidity, visibility, and wind speed.

2. **User Location**
   - Automatically fetches weather data based on the user's geolocation upon page load.

3. **Search Functionality**
   - Allows users to search for weather data by entering a location.

4. **Light/Dark Mode Toggle**
   - Switches between light and dark themes for improved readability and user preference.

5. **Dynamic Styling**
   - Uses dynamic styling based on weather conditions to display appropriate icons and backgrounds.

## Components

- **App Component**: Main component handling state management, API requests, and rendering UI elements.
  - **State Variables**: Manage weather data, location, temperature, time, and theme.
  - **Hooks**: Utilizes `useState` and `useEffect` hooks for managing state and side effects.
  - **API Integration**: Makes use of Axios for fetching weather data from OpenWeatherMap API.
  - **Dynamic UI**: Dynamically updates UI based on fetched data and user interactions.
  - **Time Update**: Updates current time and date continuously.
  - **Theme Toggle**: Implements a toggle button to switch between light and dark themes.

## Usage

1. **Getting Started**
   - Ensure Node.js and npm are installed.
   - Clone the project repository and install dependencies (`npm install`).
   - Start the development server (`npm start`).

2. **Using the Application**
   - Upon loading, the application fetches weather data based on the user's geolocation.
   - Users can manually search for weather data by entering a location in the search bar.
   - Toggle between light and dark mode using the theme button for different viewing preferences.

## Deployment

- Deploy the application to a hosting service or platform like Netlify, Vercel, or GitHub Pages.
- Ensure environment variables (like API keys) are securely handled for production deployments.

## Future Enhancements

- **Forecast Display**: Implement a feature to display weather forecasts for upcoming days.
- **User Preferences**: Allow users to customize units (e.g., Celsius vs. Fahrenheit) and language preferences.
- **Error Handling**: Enhance error handling and user feedback for failed API requests or invalid inputs.
- **Accessibility**: Improve features like screen reader support and keyboard navigation.

## Credits

- **OpenWeatherMap API**: Provides weather data used in the application.
- **React Icons**: Library for weather icons.
- **Animate.css**: Library for animations.

