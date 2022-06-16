const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

// localStorage.setItem("apiKey", EncryptStringAES("4d8fb5b93d4af21d66a2948710284366"));

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    getWeatherDataFromApi();
});

// function getWeatherDataFromApi(){}
const getWeatherDataFromApi = async() =>{
    // alert("http request gone");
    // input.value = "";
    let tokenKey = DecryptStringAES(localStorage.getItem("apiKey"));
    // console.log(apikey);
    let inputVal = input.value;
    let unitType = "metric";
    let lang = "tr";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}`;

    try {
        // const response = await fetch.get(url).then(response => response.json());
        //axios.get(url) == axios(url)
        const response = await axios(url);
        const { name, main, sys, weather } = response.data;
        // console.log(response.data);
        let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        //forEach => array + nodeList
        //map, filter, reduce => array
        const cityListItems = list.querySelectorAll(".city");
        const cityListItemsArray = Array.from(cityListItems);
        if(cityListItemsArray.length > 0){
            const filteredArray = cityListItemsArray.filter(cityCard => cityCard.querySelector("span").innerText == name);
            // console.log(cityListItemsArray.length);
            if(filteredArray.length > 0){
                msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
                setTimeout(()=>{
                    msg.innerText = "";
                }, 5000);
                form.reset();
                return;
            }
        }
        // else{}
        const createdLi = document.createElement("li");
        createdLi.classList.add("city");
        const createdLiInnerHTML = 
            `<h2 class="city-name" data-name="${name}, ${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
                <img class="city-icon" src="${iconUrl}">
                <figcaption>${weather[0].description}</figcaption>
            </figure>`;
        createdLi.innerHTML = createdLiInnerHTML;
        //append vs. prepend
        list.prepend(createdLi);

    } 
    catch (error) {
        msg.innerText = error;
        setTimeout(()=>{
            msg.innerText = "";
        }, 5000);
    }
    form.reset();
}