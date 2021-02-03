
//https://pixabay.com/api/?key=20053445-7c1ada4a51a5744095df38f1d&q=chinese+food&image_type=photo

//var imgApiKey = "20053445-7c1ada4a51a5744095df38f1d";


//requestedImg = "food";

//api search syntax for pixabay imgs
//var imgApiUrl = "https://pixabay.com/api/?q=" +
//requestedImg +
//"&image_type=photo&key=" +
//imgApiKey;
//console.log(imgApiUrl);


//pexels API info
//var pexelsApiKey = "563492ad6f91700001000001aa957735b0244456a7108662035e3142";



// unsplash API code for second API requirement implementation
var unsplashKey = "Yu5LO39b5xy7jlpbWPmFIupILbHp_QF2Z8qFEukAaGc";

var unsplashUrl = "https://api.unsplash.com/search/?client_id=" +
unsplashKey +
"&collections&page=1&query=plated_food";
console.log(unsplashUrl);

fetch(unsplashUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);

    var fetchedPhotos = response.photos.results[0];
    console.log(fetchedPhotos);

    var photoInput = `<img class="mainImg responsive-img circle hide-on-med-and-down" src="${fetchedPhotos.urls.small}"/>`

    $("#mainPhoto").append(photoInput);
  });
  
  

 





// Add some kind of img functionality using the img API
// Try and make the code more DRY as it is incredibly redundant. 

//GLOBAL VARIABLES
var zomatoApiKey = "67e6c9cf18ec88d51590db6c7bb32edc";

var fetchLocation = document.querySelector("#submitBtn");


//FUNCTIONS



// get last searched city from local storage and plug it into the search function
window.onload = function() {
  recentSearch = localStorage.getItem("city");
  console.log(recentSearch);

  getMeFood(recentSearch);
};


var getMeFood = function () {
  fetchLocation.addEventListener("click", function () {
    //console.log("clicked");
    // city name entered within the search field
    var cityName = document.querySelector("#searchInput").value;
    //console.log(cityName);

    localStorage.setItem("city", cityName);

    // fetch call to retrieve city data from zomato 
    var myHeaders = new Headers();
    myHeaders.append("user-key", zomatoApiKey);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    fetch("https://developers.zomato.com/api/v2.1/cities?q="
      + cityName
      , requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        // fetches the city id for the first city in the area (which is typically the one searched for)
        var fetchedId = response.location_suggestions[0].id;
        //console.log(fetchedId);


        // icon food-type buttons
        var buttonM = document.querySelector("#iconBtnM");
        buttonM.addEventListener("click", function () {
          console.log("clicked");

          // all of the below are fetch calls to retrieve cuisine/restuarant data from zomato 
          var myHeaders = new Headers();
          myHeaders.append("user-key", zomatoApiKey);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders
          };

          fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" +
            fetchedId +
            "&entity_type=city&cuisines=73", requestOptions)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              console.log(response);

              var list = response.restaurants;
              //console.log(list);

              $("#restaurantContainer").html("");

              for (var i = 0; i < 5; i++) {
                console.log(list[i]);
                if (list[i].restaurant.featured_image.length > 0) {
                  var restaurantCard = //offset-s3 in class
                  `<div class="col s3 card large card-image"> 
                    <img class="foodImg" src="${list[i].restaurant.featured_image}"/>
                    <span class="card-title">${list[i].restaurant.name}</span>
                    <div class="card-content">
                      <p class="rating">${list[i].restaurant.price_range}</p>
                      <p class="address">${list[i].restaurant.location.address}</p>
                      <p class="hours">${list[i].restaurant.timings}</p>
                    </div>
                  </div>`
                  //console.log(restaurantCard);

                  $("#restaurantContainer").append(restaurantCard);
                }
              }
            })
        });

        var buttonA = document.querySelector("#iconBtnA");
        buttonA.addEventListener("click", function () {
          //console.log("clicked");

          // fetch call to retrieve data from zomato 
          var myHeaders = new Headers();
          myHeaders.append("user-key", zomatoApiKey);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders
          };

          fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" +
            fetchedId +
            "&entity_type=city&cuisines=1", requestOptions)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              console.log(response);

              var list = response.restaurants;
              //console.log(list);

              $("#restaurantContainer").html("");

              for (var i = 0; i < 5; i++) {
                console.log(list[i]);
                if (list[i].restaurant.featured_image.length > 0) {
                  var restaurantCard = //offset-s3 in class
                  `<div class="col s3 card large card-image"> 
                    <img class="foodImg" src="${list[i].restaurant.featured_image}"/>
                    <span class="card-title">${list[i].restaurant.name}<span>
                    <div class="card-content>
                      <p class="rating">${list[i].restaurant.price_range}</p>
                      <p class="address">${list[i].restaurant.location.address}</p>
                      <p class="hours">${list[i].restaurant.timings}</p>
                    </div>
                  </div>`
                  //console.log(restaurantCard);

                  $("#restaurantContainer").append(restaurantCard);
                }
              }
            })
        });

        var buttonP = document.querySelector("#iconBtnP");
        buttonP.addEventListener("click", function () {
          //console.log("clicked");

          // fetch call to retrieve data from zomato 
          var myHeaders = new Headers();
          myHeaders.append("user-key", zomatoApiKey);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders
          };

          fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" +
            fetchedId +
            "&entity_type=city&cuisines=55", requestOptions)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              console.log(response);

              var list = response.restaurants;
              //console.log(list);

              $("#restaurantContainer").html("");

              for (var i = 0; i < 5; i++) {
                console.log(list[i]);
                if (list[i].restaurant.featured_image.length > 0) {
                  var restaurantCard = //offset-s3 in class
                  `<div class="col s3 card large card-image"> 
                    <img class="foodImg" src="${list[i].restaurant.featured_image}"/>
                    <span class="card-title">${list[i].restaurant.name}<span>
                    <div class="card-content>
                      <p class="rating">${list[i].restaurant.price_range}</p>
                      <p class="address">${list[i].restaurant.location.address}</p>
                      <p class="hours">${list[i].restaurant.timings}</p>
                    </div>
                  </div>`
                  //console.log(restaurantCard);

                  $("#restaurantContainer").append(restaurantCard);
                }
              }
            })
        });

        var buttonC = document.querySelector("#iconBtnC");
        buttonC.addEventListener("click", function () {
          //console.log("clicked");

          // fetch call to retrieve data from zomato 
          var myHeaders = new Headers();
          myHeaders.append("user-key", zomatoApiKey);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders
          };

          fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" +
            fetchedId +
            "&entity_type=city&cuisines=161", requestOptions)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              console.log(response);

              var list = response.restaurants;
              //console.log(list);

              $("#restaurantContainer").html("");

              for (var i = 0; i < 5; i++) {
                console.log(list[i]);
                if (list[i].restaurant.featured_image.length > 0) {
                  var restaurantCard = //offset-s3 in class
                  `<div class="col s3 card large card-image"> 
                    <img class="foodImg" src="${list[i].restaurant.featured_image}"/>
                    <span class="card-title">${list[i].restaurant.name}<span>
                    <div class="card-content>
                      <p class="rating">${list[i].restaurant.price_range}</p>
                      <p class="address">${list[i].restaurant.location.address}</p>
                      <p class="hours">${list[i].restaurant.timings}</p>
                    </div>
                  </div>`
                  //console.log(restaurantCard);

                  $("#restaurantContainer").append(restaurantCard);
                }
              }
            })
        });

        var buttonH = document.querySelector("#iconBtnH");
        buttonH.addEventListener("click", function () {
          //console.log("clicked");

          // fetch call to retrieve data from zomato 
          var myHeaders = new Headers();
          myHeaders.append("user-key", zomatoApiKey);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders
          };

          fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" +
            fetchedId +
            "&entity_type=city&cuisines=143", requestOptions)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              console.log(response);

              var list = response.restaurants;
              //console.log(list);

              $("#restaurantContainer").html("");

              for (var i = 0; i < 5; i++) {
                console.log(list[i]);
                if (list[i].restaurant.featured_image.length > 0) {
                  var restaurantCard = //offset-s3 in class
                  `<div class="col s3 card large card-image"> 
                    <img class="foodImg" src="${list[i].restaurant.featured_image}"/>
                    <span class="card-title">${list[i].restaurant.name}<span>
                    <div class="card-content>
                      <p class="rating">${list[i].restaurant.price_range}</p>
                      <p class="address">${list[i].restaurant.location.address}</p>
                      <p class="hours">${list[i].restaurant.timings}</p>
                    </div>
                  </div>`
                  //console.log(restaurantCard);

                  $("#restaurantContainer").append(restaurantCard);
                }
              }
            })
        });

        var buttonJ = document.querySelector("#iconBtnJ");
        buttonJ.addEventListener("click", function () {
          //console.log("clicked");

          // fetch call to retrieve data from zomato 
          var myHeaders = new Headers();
          myHeaders.append("user-key", zomatoApiKey);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders
          };

          fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" +
            fetchedId +
            "&entity_type=city&cuisines=3", requestOptions)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              console.log(response);

              var list = response.restaurants;
              //console.log(list);

              $("#restaurantContainer").html("");

              for (var i = 0; i < 5; i++) {
                console.log(list[i]);
                if (list[i].restaurant.featured_image.length > 0) {
                  var restaurantCard = //offset-s3 in class
                    `<div class="col s3 card large card-image"> 
                      <img class="foodImg" src="${list[i].restaurant.featured_image}"/>
                      <span class="card-title">${list[i].restaurant.name}</span>
                      <div class="card-content">
                        <p class="rating">${list[i].restaurant.price_range}</p>
                        <p class="address">${list[i].restaurant.location.address}</p>
                        <p class="hours">${list[i].restaurant.timings}</p>
                      </div>
                    </div>`
                    //console.log(restaurantCard);

                  $("#restaurantContainer").append(restaurantCard);
                }
              }
            })
        });
      })
  });
};















