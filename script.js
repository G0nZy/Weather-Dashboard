


// $(document).ready(function() {
//     $("#search-button").on("click", function() {
//       var searchValue = $("#search-value").val();
  
//       // clear input box
//       $("#search-value").val("");
  
//       searchWeather(searchValue);
//     });
  
//     $(".history").on("click", "li", function() {
//       searchWeather($(this).text());
//     });
  
//     function makeRow(text) {
//       var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
//       $(".history").append(li);
//     }
  
//     function searchWeather(searchValue) {
//       $.ajax({
//         type: "GET",
//         url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",
//         dataType: "json",
//         success: function(data) {
//           // create history link for this search
//           if (history.indexOf(searchValue) === -1) {
//             history.push(searchValue);
//             window.localStorage.setItem("history", JSON.stringify(history));
      
//             makeRow(searchValue);
//           }
          
//           // clear any old content
//           $("#today").empty();
  
//           // create html content for current weather
//           var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
//           var card = $("<div>").addClass("card");
//           var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
//           var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
//           var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
//           var cardBody = $("<div>").addClass("card-body");
//           var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  
//           // merge and add to page
//           title.append(img);
//           cardBody.append(title, temp, humid, wind);
//           card.append(cardBody);
//           $("#today").append(card);
  
//           // call follow-up api endpoints
//           getForecast(searchValue);
//           getUVIndex(data.coord.lat, data.coord.lon);
//         }
//       });
//     }
    
//     function getForecast(searchValue) {
//       $.ajax({
//         type: "GET",
//         url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",
//         dataType: "json",
//         success: function(data) {
//           // overwrite any existing content with title and empty row
//           $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
  
//           // loop over all forecasts (by 3-hour increments)
//           for (var i = 0; i < data.list.length; i++) {
//             // only look at forecasts around 3:00pm
//             if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
//               // create html elements for a bootstrap card
//               var col = $("<div>").addClass("col-md-2");
//               var card = $("<div>").addClass("card bg-primary text-white");
//               var body = $("<div>").addClass("card-body p-2");
  
//               var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
  
//               var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
  
//               var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
//               var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
  
//               // merge together and put on page
//               col.append(card.append(body.append(title, img, p1, p2)));
//               $("#forecast .row").append(col);
//             }
//           }
//         }
//       });
//     }
  
//     function getUVIndex(lat, lon) {
//       $.ajax({
//         type: "GET",
//         url: "http://api.openweathermap.org/data/2.5/uvi?appid=7ba67ac190f85fdba2e2dc6b9d32e93c&lat=" + lat + "&lon=" + lon,
//         dataType: "json",
//         success: function(data) {
//           var uv = $("<p>").text("UV Index: ");
//           var btn = $("<span>").addClass("btn btn-sm").text(data.value);
          
//           // change color depending on uv value
//           if (data.value < 3) {
//             btn.addClass("btn-success");
//           }
//           else if (data.value < 7) {
//             btn.addClass("btn-warning");
//           }
//           else {
//             btn.addClass("btn-danger");
//           }
          
//           $("#today .card-body").append(uv.append(btn));
//         }
//       });
//     }
  
//     // get current history, if any
//     var history = JSON.parse(window.localStorage.getItem("history")) || [];
  
//     if (history.length > 0) {
//       searchWeather(history[history.length-1]);
//     }
  
//     for (var i = 0; i < history.length; i++) {
//       makeRow(history[i]);
//     }
//   });
  







const api = {



    key: "5103c5257e730371ae6800c0b6c92e20",
base: "https://api.openweathermap.org/data/2.5/"


            }


 const searchbox = document.querySelector('.form-control');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt){


if(evt.keyCode == 13 ){
getResults(searchbox.value);
                            
                 }
 if(evt.keyCode === '.btn'){
getResults(searchbox.value);
                        }


            }


    function getResults (query){

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather =>{
            return weather.json();
             }).then(displayResults);
                        



                            }


  function displayResults (weather){


                                        
                                   
    let city = document.querySelector('.location .city');
 city.innerText = `${weather.name}, ${weather.sys.country}`;

      let now = new Date();
    let date = document.querySelector('.location .date');
      date.innerText = currentDate(now);

      let temp = document.querySelector('.current .temp');
      temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span> `;

    let weather_el = document.querySelector('.current .weather');
         weather_el.innerText= weather.weather[0].main;

            let hilow = document.querySelector(".hi-low");
                       hilow.innerText= Hi/Lo - `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;
                                   
                                    
                    


                      

                    
                    
                    
                    }

            function currentDate (d){

                 let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                       
                                       
                  let day = days[d.getDay()];
                  let date = d.getDate();
                   let month = months [d.getMonth()];
                  let year = d.getFullYear();

                   return `${day} ${date} ${month} ${year} `;
                                        }

    

   
                                        forecast.forEach(day => {
                                            let date = new Date(day.dt * 1000);
                                            let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                                            let name = days[date.getDay()];
                                            let dayBlock = document.createElement("div");
                                            dayBlock.className = 'forecast__item';
                                            dayBlock.innerHTML =
                                              `<div class="forecast-item__heading">${name}</div>
                                              <div class="forecast-item__info">
                                              <i class="wi ${applyIcon(day.weather[0].icon)}"></i>
                                              <span class="degrees">${Math.round(day.temp.day)}
                                              <i class="wi wi-degrees"></i></span></div>`;
                                            FORECAST.appendChild(dayBlock);
                                          });
                                        

                        









