window.addEventListener('load', function() {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
  var city = 'eastvale';
  var apiKey = '&APPID=d629efe66c026788c614fb0b6a331cff';
  var units = '&units=imperial';


  var input;

  var long;
  var lat;

  var temperatureDescription = document.querySelector('.temp_description');
  var temperatureDegree = document.querySelector('.temperature_degree');
  var temperatureMin = document.querySelector('.temperature_min');
  var temperatureMax = document.querySelector('.temperature_max');
  var locationTimezone = document.querySelector('.location_timezone');
  var temperatureSection = document.querySelector('.temperature');
  var temperatureSpan = document.querySelector('.temperature .symbol')
  input = document.querySelector('#city');
  // console.log(input.value);

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      
      // var api = `${proxy}https://api.darksky.net/forecast/4175dff516b4a8de91fb924e6fccaca3/${lat},${long}`;

      
    });
  };

  function setup() {
    var button = document.querySelector('#submit');
    button.addEventListener("click",function() {
      weatherAsk();
      // setIcons;
    });

    
  }

  function weatherAsk() {
    var url = api + input.value + apiKey + units;
      
    // console.log(api);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        var { name } = data;
        var { temp, temp_min, temp_max } = data.main;
        var { main, description } = data.weather[0];

        temperatureDegree.textContent = temp;
        temperatureMin.textContent = temp_min;  
        temperatureMax.textContent = temp_max;  
        // console.log(temperatureDescription.textContent = description)
        temperatureDescription.textContent = main;
        locationTimezone.textContent = name;

        // Forumula for cesius
        var celsius = (temp - 32) + (5 / 9);

        // Set iCON
        setIcons(description, document.querySelector(".icon"));

        // Change temp;
        temperatureSection.addEventListener('click', function() {
          if(temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
          } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = temp
          }
          
        })

      });
  }

  function setIcons(description, iconID) {
    var skycons = new Skycons({color: "white"});
    var currentIcon = description.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  setup();
});