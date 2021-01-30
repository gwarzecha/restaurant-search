console.log("working")

//https://pixabay.com/api/?key=20053445-7c1ada4a51a5744095df38f1d&q=chinese+food&image_type=photo

var imgApiKey = "20053445-7c1ada4a51a5744095df38f1d"; 
var zomatoApiKey = "67e6c9cf18ec88d51590db6c7bb32edc"; 

requestedImg = "pizza";

// api search syntax for pixabay imgs
var imgApiUrl = "https://pixabay.com/api/?q=" +
  requestedImg +
  "&image_type=photo&key=" +
  imgApiKey;
  console.log(imgApiUrl);



// fetch call to retrieve data from zomato 
var myHeaders = new Headers();
myHeaders.append("user-key", zomatoApiKey);
var requestOptions = {
  method: 'GET',
  headers: myHeaders
};

fetch("https://developers.zomato.com/api/v2.1/cuisines?city_id=301", requestOptions)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
  })

  /* not sure if this is needed or not
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  */