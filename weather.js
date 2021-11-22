const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem("apikey", EncryptStringAES("4d8fb5b93d4af21d66a2948710284366"));

form.addEventListener("submit", e =>{
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async() =>{
  let apikey = DecryptStringAES(localStorage.getItem("apikey"));
  let inputVal = input.value;
  let weatherType = "metric";
  // console.log(apikey);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=${weatherType}`;

  const response = await axios.get(url);
  console.log(response);

  const { main, name, sys, weather} = response.data;
  console.log(name);
}




