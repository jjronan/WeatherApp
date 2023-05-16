function initAutocomplete() {
	  
    const input = document.getElementById("pac-input");
    const options = {
      types: ["(cities)"],
    };

    const autocomplete = new google.maps.places.Autocomplete(
      input,
      options
    );
  
    autocomplete.addListener("place_changed", () => { 
      console.log("test");
      const place = autocomplete.getPlace();
          
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert(
          "No details available for input: '" + place.name + "'"
        );
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      getWeatherData(lat, lng);

    });
    
    async function getWeatherData(lat, lng) {
      //build API url for weather data
      const url = new URL("https://api.open-meteo.com/v1/forecast?");
      url.searchParams.append("latitude", lat);
      url.searchParams.append("longitude", lng);
      url.searchParams.append("temperature_unit","fahrenheit");
      url.searchParams.append("current_weather","true");
      //fetch data

      const response = await fetch(url);
      const data = await response.json();
      dataObj = data;
      console.log(dataObj);
      
      const temperature = document.getElementById("temp");
      temperature.innerText = dataObj.current_weather.temperature;
      
      const windspeed = document.getElementById("wind");
      windspeed.innerText = dataObj.current_weather.windspeed;

    }
    
}
  