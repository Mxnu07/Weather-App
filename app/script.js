document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "YOUR_API_KEY_HERE";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchInput = document.querySelector(".search input");
    const searchBttn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city){
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        // error handling
        if(response.status === 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }else{

        var data = await response.json();

        console.log(data);

        // display city name, temperature, humidity, wind speed
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main === "Clouds"){
            weatherIcon.src = "images/clouds.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #4d6464, #afb3b0)";
        }
        else if(data.weather[0].main === "Rain"){
            weatherIcon.src = "images/rain.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #1d1e34, #323672)";
        }
        else if(data.weather[0].main === "Clear"){
            weatherIcon.src = "images/clear.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #17edea, #afb3b0)";
        }
        else if(data.weather[0].main === "Snow"){
            weatherIcon.src = "images/snow.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #b7e7fa, #9da2e8)";
        }
        else if(data.weather[0].main === "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #1d1e34, #323672)";
        }
        else{
            weatherIcon.src = "images/clear.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #17edea, #afb3b0)";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }}

    // search button click event
    searchBttn.addEventListener("click", ()=>{
        checkWeather(searchInput.value);
    });

    // search input "Enter" key event
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchInput.value);
        }
    });
});