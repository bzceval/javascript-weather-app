const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".container input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

//dbden böyle geldi sandık şifreli şekilde.
localStorage.setItem(
  "tokenKey",
  "XakDl0282yu2LTjq8eQ/dA04iNUXb4UQXbYfTxBoS02bYbQux2oXfY0/15uf7UGM"
);
// böyle anlamlandırılmayan tokenın güvenlik mekanizmasını yaptık çünkü kullanıcı verilerini şifrelerini localde şifreli olarak tutuyor. Kullanıcı istekte bulunduğunda bu şifreleme ile bilgiler kullanılıyor.
// AES şifreleme algoritmalı sürekli kullanıldığından çabuk kırılabilir new tech kullanmalısın.
// önce random oluşturdum sonra random şifreledim sonrada token güvenliği sağlanıldı.
// localStorage.setItem(
//   "tokenKeyEncrypted",
//   EncryptStringAES("87b4c7f4cc15aae54d328ed3864f87bf")
// );

form.addEventListener("submit", (event) => {
  //default olarak çalışan submit özelliğini yakaladığım yerde gözardı ediyorum ve benim tanımladığım fnleri çalıştır.
  event.preventDefault();
  getWeatherDataFromApi();
});

// 1. getApi func (http methods == verbs)
const getWeatherDataFromApi = async () => {
  alert("http req is gone!");
  //bir apiye istek atacağız bu yüzden bir tokena ihtiyaç var.
  //şifreli olarak tuutuğum tokenı yakaladım
  //   const tokenKey = localStorage.getItem("tokenKey")
  //bunu http req gönderirken çözümlemem lazım // decryp.
  const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey"));
  alert(tokenKey);
  //input valueye nereden ulaşacağız
  const inputValue = input.value;
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${tokenKey}&units=${units}&lang=${lang}`;

  const response = await fetch(url).then((response) => response.json());
  console.log(response);
};
