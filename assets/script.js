const apiKey = '4cf0f11bba614bf4d1fcfd31a7ec59b0';
const cityName = document.getElementById('searchCity');

const searches = JSON.parse(localStorage.getItem('searches')) || [];

const formSubmitHandler = function (event) {
    event.preventDefault();
  
    const city = cityName.value.trim(); // trim gets rid of extra white space
  
    if (city) { // truthy / true
      getWeather(city); // call 
      saveSearch(city);

    } else {
      alert('Please enter a city name');
    }
};

window.onload = function () {
    displaySearchHistory();
}

$("#searchBtn").on("click", formSubmitHandler);

document.getElementById('searchHistoryList').addEventListener('click', function(event){
    if (event.target.tagName === 'LI') {
        const cityName = event.target.textContent;
        getWeather(cityName);
    }
});

function getWeather (requestUrl) {
    const currentDate = dayjs().format('MMMM D, YYYY');
    document.querySelector('#currentDate').textContent = currentDate;
    ;

    const fetchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${requestUrl}&appid=` + apiKey + `&units=imperial`;
    fetch(fetchUrl) 
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            document.querySelector('#currentTemp').textContent= "Temp: " + data.main.temp + "F";
            document.querySelector('#currentWind').textContent= "Wind Speed: " + data.wind.speed;
            document.querySelector('#currentIcon').src="https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            document.querySelector('#currentHumidity').textContent= "Humidity: " + data.main.humidity + "%";
        }) 

    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${requestUrl}&appid=` + apiKey + `&units=imperial`;

    fetch(forecastUrl) 
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            const forecastDate = [];
            for (let i = 0; i < data.list.length; i++) {
                const timestamp = data.list[i].dt;
                const dateObject =new Date(timestamp * 1000);
                const formattedDate = dateObject.toLocaleDateString();
                forecastDate.push(formattedDate);
            }
        
            document.querySelector('#day1Date').textContent= forecastDate[3];
            document.querySelector('#day1Temp').textContent= "Temp: " + data.list[3].main.temp + "F";
            document.querySelector('#day1Wind').textContent= "Wind Speed: " + data.list[3].wind.speed;
            document.querySelector('#day1Icon').src="https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png";
            document.querySelector('#day1Humidity').textContent= "Humidity: " + data.list[3].main.humidity + "%";
            
            document.querySelector('#day2Date').textContent= forecastDate[11];
            document.querySelector('#day2Temp').textContent= "Temp: " + data.list[11].main.temp + "F";
            document.querySelector('#day2Wind').textContent= "Wind Speed: " + data.list[11].wind.speed;
            document.querySelector('#day2Icon').src="https://openweathermap.org/img/wn/" + data.list[11].weather[0].icon + "@2x.png";
            document.querySelector('#day2Humidity').textContent= "Humidity: " + data.list[11].main.humidity + "%";

            document.querySelector('#day3Date').textContent= forecastDate[19];
            document.querySelector('#day3Temp').textContent= "Temp: " + data.list[19].main.temp + "F";
            document.querySelector('#day3Wind').textContent= "Wind Speed: " + data.list[19].wind.speed;
            document.querySelector('#day3Icon').src="https://openweathermap.org/img/wn/" + data.list[19].weather[0].icon + "@2x.png";
            document.querySelector('#day3Humidity').textContent= "Humidity: " + data.list[19].main.humidity + "%";

            document.querySelector('#day4Date').textContent= forecastDate[27];
            document.querySelector('#day4Temp').textContent= "Temp: " + data.list[27].main.temp + "F";
            document.querySelector('#day4Wind').textContent= "Wind Speed: " + data.list[27].wind.speed;
            document.querySelector('#day4Icon').src="https://openweathermap.org/img/wn/" + data.list[27].weather[0].icon + "@2x.png";
            document.querySelector('#day4Humidity').textContent= "Humidity: " + data.list[27].main.humidity + "%";

            document.querySelector('#day5Date').textContent= forecastDate[35];
            document.querySelector('#day5Temp').textContent= "Temp: " + data.list[35].main.temp + "F";
            document.querySelector('#day5Wind').textContent= "Wind Speed: " + data.list[35].wind.speed;
            document.querySelector('#day5Icon').src="https://openweathermap.org/img/wn/" + data.list[35].weather[0].icon + "@2x.png";
            document.querySelector('#day5Humidity').textContent= "Humidity: " + data.list[35].main.humidity + "%";

        }) 
};

function saveSearch(city) {
    if (!searches.includes(city)) {
   
    searches.push(city); 

    localStorage.setItem('searches', JSON.stringify(searches));
    displaySearchHistory(); 
    };
};

function displaySearchHistory() {
    const searchHistoryList = document.getElementById('searchHistoryList');
    searchHistoryList.innerHTML = '';

    for (let i = 0; i < searches.length; i++) {
        let li = document.createElement('li');
        li.textContent = searches[i];
        searchHistoryList.appendChild(li);
        
    }
};


// when i search for a city, weather from 5 days shows up and will be added to the search history (localStorage)
// in a card, the current weather conditions will apear as well as the date, city name, an icon representing current weather condition, temp, humidity, and wind speed.
// the same thing will appear for FUTURE weather conditions.
// present the city's weather info as stated above when clicking a city in the search history.

// create a requestURL look at repo how to do