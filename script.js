document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=1edd5d800bf9c0171142333c510351b6";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i = 0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += '<h3>Feels like: ' + json.main.feels_like + " &deg;F</h3>"
      results += "<p>"
      for (let i = 0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=1edd5d800bf9c0171142333c510351b6";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let forecast = "<h2> 5-day/3-hour Forecast</h2><div class=\"gap\"></div> <table>";
      let currentDay = null;
      if(json.list.length > 0){
        currentDay = (json.list[0].dt_txt).substring(0, 10);
        forecast += "<tr><th colspan=\"5\">";
        forecast +=  moment(json.list[0].dt_txt).format('MMMM Do YYYY');
        forecast += "</th></tr>";
      }
      for (let i=0; i < json.list.length; i++) {
        if(currentDay !== (json.list[i].dt_txt).substring(0, 10)){
          forecast += "</table><div class=\"gap\"></div><table>";
          forecast += "<tr><th colspan=\"5\">";
          forecast +=  moment(json.list[i].dt_txt).format('MMMM Do YYYY');
          forecast += "</th></tr>";
          currentDay = (json.list[i].dt_txt).substring(0, 10);
        }
        forecast += "<tr>"
	       forecast += "<td>" + moment(json.list[i].dt_txt).format('h a') + "</td>";
	       forecast += "<td>Temperature: " + json.list[i].main.temp + "&deg;F</td>";
	       forecast += "<td>Feels like: " + json.list[i].main.feels_like + "&deg;F</td>"
         forecast += "<td> Humidity: " + json.list[i].main.humidity + "&percnt;</td>"
         forecast += '<td><img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></td>'
         forecast += "</tr>"
      }
      forecast += "</table>"
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
