This application is live at: https://whitepear.github.io/projects/frontend/local_weather/app/index.html

This application provides users with information about the weather in their locality. It makes use of the browser's geolocation functionality in order to provide this information.

The reported temperature can be converted between Celsius and Fahrenheit at the touch of a button. The application's presentation changes depending on the weather data provided to the user. The application is responsively-designed and consumes JSON data from the OpenWeather API.

Note: An API key is required in order to receive weather data from the OpenWeather API. This key has been removed from the code within this repository. Additionally, due to limitations inherent to the OpenWeather API, the live version of the application (linked above) must route API requests through a proxy. As a result, there may be a delay during certain application actions.