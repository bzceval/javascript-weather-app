const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

localStorage.setItem("apiKey", EncryptStringAES("4d8fb5b93d4af21d66a2948710284366"));
localStorage.setItem("apiKey", "RAPAIooyOVFdRNn7gPi6i8vUp3OJvy0Np5wgMGgNO0a2a258kya95/arqJmhPrWc");

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    getWeatherDataFromApi();
});

const getWeatherDataFromApi = async() =>{
    // alert("http request is gone");
    // input.value = "";
    const tokenKey = DecryptStringAES(localStorage.getItem("apiKey"));
    // console.log(apikey);
    const inputVal = input.value;
    const unitType = "metric";
    const lang = "tr";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}`;

    try {
        // const response = await fetch(url).then(response => response.json());
        //axios.get(url) == axios(url)
        const response = await axios(url);
        const { name, main, sys, weather } = response.data;
        // console.log(response.data);
        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
        //forEach => array + nodeList
        //map, filter, reduce => array
        const cityNameSpans = list.querySelectorAll(".city span");
        const cityNameSpansArray = Array.from(cityNameSpans)
        console.log(cityNameSpansArray);
        // const cityListItemsArray = Array.from(cityListItems).map(x => x.innerText);
        if(cityNameSpansArray.length > 0){
            const filteredArray = cityNameSpansArray.filter(span => span.innerText == name);
            // console.log(cityListItemsArray.length);
            if(filteredArray.length > 0){
            // if(cityListItemsArray.includes(name)){
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

        //Capturing
        createdLi.addEventListener("click", (e) => {
            if(e.target.tagName == "IMG"){
                e.target.src = (e.target.src == iconUrl) ? iconUrlAWS : iconUrl  
            }
            
        });

        //Bubbling
        //When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

        // createdLi.addEventListener("click", (e) => {
        //     alert(`${e.target.tagName} element is clicked!`);
        //     window.location.href = "https://clarusway.com";
        // });

        //Stop the Bubbling => e.stopPropagation();
        // document.querySelector("figure").addEventListener("click", (e) => {
        //     alert(`${e.target.tagName} element is clicked!`);
        //     e.stopPropagation();
        // });


    } 
    catch (error) {
        msg.innerText = error;
        setTimeout(()=>{
            msg.innerText = "";
        }, 5000);
    }
    form.reset();
}
