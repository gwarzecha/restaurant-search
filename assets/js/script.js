//GLOBAL VARIABLES
var zomatoApiKey = "67e6c9cf18ec88d51590db6c7bb32edc";

var imgApiKey = "20053445-7c1ada4a51a5744095df38f1d";

var fetchLocation = document.querySelector("#submitBtn");

var cityId = ""; // Made  variable global


//FUNCTIONS

window.onload = function() {
  recentCity = localStorage.getItem("cityCode");
  console.log(recentCity);
  recentCuisine = localStorage.getItem("cuisineVal");
  console.log(recentCuisine);


  cuisineResults(recentCity, recentCuisine);
};




//api search syntax for pixabay imgs
var imgApiUrl = "https://pixabay.com/api/?q=plated_food" +
  "&image_type=photo&key=" +
  imgApiKey;
console.log(imgApiUrl);

// fetch for imgs from pixabay
fetch(imgApiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);

    var imgList = [2, 3, 4, 7, 8, 9, 13, 14, 16, 17];

    // picks random image from imgList on page load/refresh to populate the main page photo 
    var randImg = imgList[Math.floor(Math.random() * imgList.length)];

    var fetchedPhotos = response.hits[randImg].webformatURL;
    console.log(fetchedPhotos);

    // dynammically renders img to page
    var photoInput = `<img class="mainImg responsive-img circle hide-on-med-and-down" src="${fetchedPhotos}" alt="plated food"/>`

    $("#mainPhoto").append(photoInput);
  });

// function to enter city and subsequent cuisine buttons
fetchLocation.addEventListener("click", function (event) {
  event.preventDefault();

  $("#restaurantContainer").empty();

  //console.log("clicked");
  // city name entered within the search field
  var cityName = document.querySelector("#searchInput").value;
  //console.log(cityName);

  

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
      cityId = response.location_suggestions[0].id;

      localStorage.setItem("cityCode", cityId);
    })
});

var buttonM = document.querySelector("#iconBtnM");
buttonM.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
    cuisineResults(cityId, buttonM.value);
  }
});

var buttonA = document.querySelector("#iconBtnA");
buttonA.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
    cuisineResults(cityId, buttonA.value);
  }
});

var buttonP = document.querySelector("#iconBtnP");
buttonP.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonP.value);
  }
});

var buttonC = document.querySelector("#iconBtnC");
buttonC.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonC.value);
  }
});

var buttonH = document.querySelector("#iconBtnH");
buttonH.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonH.value);
  }
});

var buttonJ = document.querySelector("#iconBtnJ");
buttonJ.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonJ.value);
  }
});

var buttonB = document.querySelector("#iconBtnB");
buttonB.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonB.value);
  }
});

var buttonS = document.querySelector("#iconBtnS");
buttonS.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonS.value);
  }
});

var buttonF = document.querySelector("#iconBtnF");
buttonF.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonF.value);
  }
});

var buttonD = document.querySelector("#iconBtnD");
buttonD.addEventListener("click", function (event) {
  event.preventDefault();
  if(cityId==""){
    alert("Please enter a city name!")
  } else {
  cuisineResults(cityId, buttonD.value);
  }
});

function cuisineResults(cityId, btnValue) {

  console.log("clicked", btnValue);

  $("#restaurantContainer").empty();

  // all of the below are fetch calls to retrieve cuisine/restuarant data from zomato 
  var myHeaders = new Headers();
  myHeaders.append("user-key", zomatoApiKey);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  fetch("https://developers.zomato.com/api/v2.1/search?entity_id=" +
    cityId +
    "&entity_type=city&cuisines=" +
    btnValue
    , requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      localStorage.setItem("cuisineVal", btnValue);

      var list = response.restaurants;
      //console.log(list);

      for (var i = 0; i < 5; i++) {
        console.log(list[i]);
        var imgUrl = list[i].restaurant.featured_image.length > 0 ? list[i].restaurant.featured_image : "./assets/imgs/image-card-temp.png"
        //if (list[i].restaurant.featured_image.length > 0) {
          var restaurantCard = //offset-s3 in class
            `<div class="col s12 l3 m3 card large card-image"> 
          <img class="foodImg" src="${imgUrl}" alt="restaurant photo"/>
          <span class="card-title">${list[i].restaurant.name}</span>
          <div class="card-content">
            <a href="${list[i].restaurant.menu_url}" target="_blank">View Menu</a>
            <p class="address">${list[i].restaurant.location.address}</p>
            <hr>
            <p class="hours">${list[i].restaurant.timings}</p>
          </div>
        </div>`
          //console.log(restaurantCard);
          //<p class="rating">${list[i].restaurant.price_range}</p>

          $("#restaurantContainer").append(restaurantCard);
        //}
      }
    })
};