// menu
const navLinks = document.querySelector(".nav_links");
const menuIcon = document.querySelector("#menu_icon");

menuIcon.addEventListener("click", function () {
  if (navLinks.classList.contains("showItem")) {
    navLinks.classList.remove("showItem");
  } else {
    navLinks.classList.add("showItem");
  }
});

// unicorns
const unicornsContainer = document.querySelector(".unicorns_container");
const card = document.querySelector(".card");
const cardBack = document.querySelector(".card__face--back");
let unicorns;

function getUnicorns(url) {
  const ajax = new XMLHttpRequest();

  ajax.open("GET", url, true);

  ajax.onload = function () {
    if (this.status === 200) {
      unicorns = JSON.parse(this.responseText).unicorns;

      unicorns.forEach(Write);
    } else {
      console.log(this.statusText);
    }
  };

  ajax.onerror = function () {
    console.log("there was an error");
  };

  ajax.send();
}

function Write(unicorn) {
  unicornsContainer.innerHTML += `
  <div class="unicorns_card">
  <div class="card_first">
   <img class="card_img" src="${unicorn.photo}">
   <div class="card_info_icon"><i class="fas fa-info-circle"></i></div>
   </div>
   <div class="card_second">
     <div class="card_close"><i class="fas fa-chevron-down"></i></div>
   <h3 class="card_name">${unicorn.name}</h3>
   <div class="card_info">
   <h4>Born in ${unicorn.birth}</h4>
   <h4> ${unicorn.gender}</h4>
   </div>
   <h4 class="card_about_title">About ${unicorn.name}:</h4>
   <p class="card_about">${unicorn.about}</p>
   <button onclick="adopt('${unicorn.name}')" class="card_btn_adopt"><a href="#contact_section">adopt</a></button>
   </div>
   </div>
  `;

  const infoBtns = document.querySelectorAll(".card_info_icon");
  const cardSeconds = document.querySelectorAll(".card_second");
  const cardCloseBtns = document.querySelectorAll(".card_close");

  infoBtns.forEach((infoBtn) => {
    infoBtn.addEventListener("click", showInfo);
  });

  cardCloseBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", hideInfo);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getUnicorns("unicornsArray.json");
});

// submit form

const form = document.getElementById("form");
const formTitle = document.getElementById("form_title");
const messageSent = document.querySelector(".message_sent");
const name = document.getElementById("name");
const email = document.getElementById("email");
const topic = document.getElementById("topic");
const message = document.getElementById("message");
const validationMessage = document.querySelector(".validation_message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value === "" || email.value === "" || message.value === "") {
    validationMessage.classList.add("visible");
    setTimeout(() => {
      validationMessage.classList.remove("visible");
    }, 3000);
  } else {
    form.style.display = "none";
    formTitle.style.display = "none";
    messageSent.style.display = "block";
    setTimeout(() => {
      name.value = "";
      email.value = "";
      topic.value = "default";
      message.value = "";
      form.style.display = "flex";
      formTitle.style.display = "block";
      messageSent.style.display = "none";
    }, 3000);
  }
});

// adopt

function showInfo(e) {
  console.log(e.target.parentElement.parentElement.nextElementSibling);
  e.target.parentElement.parentElement.nextElementSibling.style.transform =
    "translateY(0)";
  e.target.parentElement.parentElement.nextElementSibling.style.visibility =
    "visible";
}

function hideInfo(e) {
  e.target.parentElement.parentElement.style.transform = "translateY(100%)";
  e.target.parentElement.parentElement.style.visibility = "hidden";
}

function adopt(unicornName) {
  topic.value = "adoption";
  message.value = `I'm interested in adopting ${unicornName}. I would be grateful for more information regarding adoption.`;
}
