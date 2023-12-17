// for animation of the container
const containerForm = document.querySelector(".container-form");

window.onload = () => {
  containerForm.classList.add("animation")
}


// name => not empty : this field is required | if the name is not string: wrong format strings only
// email => not empty: this field is required | if the email is not valid : wrong format email
// phone number => not empty : this field is required | if the number is string : wrong format nubmers only
// if all of this is true next step 

const form = document.getElementById("form");
const email = document.getElementById("email");
const name = document.getElementById("name");
const phone = document.getElementById("phone");

form.onsubmit = (e) => {
  checkInputs();
  e.preventDefault()
}

function checkInputs() {
  emailCheck();
  nameCheck();
  phoneCheck();
  if (emailCheck() && nameCheck() && phoneCheck()) {
    return true;
  } else {
    return false;
  }
}


email.onkeyup = () => {
  emailCheck();
}
name.onkeyup = () => {
  nameCheck();
}
phone.onkeyup = () => {
  phoneCheck()
}

function emailCheck() {
  let re = /^\w+@\w+\.[a-zA-Z]{2,3}$/;
  let emailValue = email.value.trim();
  if (emailValue == "") {
    makeError(email, "This Field Is Required");
    return false;
  } else if (!re.test(emailValue)) {
    makeError(email, "wrong format for email");
    return false;
  } else {
    removeError(email);
    return true;
  }
}


function nameCheck() {
  let nameValue = name.value.trim();
  let re = /^\w*\s\w*$/
  if (nameValue == "") {
    makeError(name, "This Field Is Required")
    return false;
  } else if (!re.test(nameValue)) {
    makeError(name, "Wrong Format For Name")
    return false;
  } else {
    removeError(name)
    return true;
  }
}

function phoneCheck() {
  let phoneValue = phone.value.trim();
  let re = /^[0-9]{10}$/
  if (phoneValue == "") {
    makeError(phone, "This Field Is Required")
    return false;
  } else if (!re.test(phoneValue)) {
    makeError(phone, "Wrong Format For Phone");
    return false;
  } else {
    removeError(phone);
    return true;
  }
}

function makeError(element, message) {
  let parent = element.parentElement;
  parent.classList.add("active");
  parent.querySelector("small").textContent = message;
}
function removeError(element) {
  let parent = element.parentElement;
  parent.classList.remove("active");
  parent.querySelector("small").textContent = "";
}

// for moving between the steps

let steps = [...document.querySelectorAll(".num")];
let selections = [...document.querySelectorAll(".selections .selection")];
let nexts = document.querySelectorAll("#next");
let prevs = document.querySelectorAll("#previous")
steps[1].classList.add("active")
let change = document.getElementById("change");
const confirm = document.getElementById("confirm");
let thankYou = document.querySelector(".thankYou");

currentStep = 0;

change.onclick = () => {
  currentStep = 1;
  changeStep()
}

steps.forEach(step => {
  step.onclick = () => {
    thankYou.classList.remove("popUp")
    currentStep = step.id - 1;
    changeStep();
  }
})
// check if the form is valid

nexts.forEach(next => {
  next.onclick = () => {
    if (checkInputs()) {
      currentStep++;
      changeStep();
    } else {
      currentStep = 0;
      changeStep();
    }
    if (next.classList.contains("addOns")) {
      removePicksSelectedLast();
      custmizeTotalPicks(firstProcess(), secondProcess());
      calculAndChangeTheText()
    }
    if (next.classList.contains("pickNext")) {
      removePicksSelectedLast();
      checkSelectedPlans();
      calculAndChangeTheText();
    }
  }
})

prevs.forEach(prev => {
  prev.onclick = () => {
    currentStep--;
    changeStep();
  }
})


confirm.onclick = () => {
  if (checkInputs()) {
    removeSlection()
    thankYou.classList.add("popUp");
  } else {
    currentStep = 0;
    changeStep();
  }
}


function removeSlection() {
  selections.forEach(selection => {
    selection.classList.remove("active")
  })
}


function changeStep() {
  removeAllActive();
  selections[currentStep].classList.add("active");
  steps[currentStep].parentElement.classList.add("active");
}

function removeAllActive() {
  steps.forEach(step => step.parentElement.classList.remove("active"))
  selections.forEach(selection => selection.classList.remove("active"))
}

// for toggle checkbox button

const checkbox = document.querySelector(".checkbox");
const free = document.querySelectorAll(".free");
const prices = document.querySelectorAll(".price");
let typePayement = document.querySelector(".type-payment");

let pricesYears = ["$90/yr", "$120/yr", "$150/yr"];
let pricesMonths = ["$9/mo", "$12/mo", "$15/mo"];
checkbox.onclick = () => {
  checkbox.parentElement.classList.toggle("active");
  checkbox.parentElement.classList.toggle("gray");
  if (checkbox.parentElement.classList.contains("active")) {
    free.forEach(fr => fr.classList.add("yearlly"))
    for (let i = 0; i < prices.length; i++) {
      prices[i].textContent = pricesYears[i];
    }
    for (let i = 0; i < pricesTwo.length; i++) {
      pricesTwo[i].textContent = pricesTwoYear[i];
    }
  } else {
    free.forEach(fr => fr.classList.remove("yearlly"))
    for (let i = 0; i < prices.length; i++) {
      prices[i].textContent = pricesMonths[i];
    }
    for (let i = 0; i < pricesTwo.length; i++) {
      pricesTwo[i].textContent = pricesTwoMonth[i];
    }
  }
}

const plans = document.querySelectorAll(".plan");
let pricesTwo = [...document.querySelectorAll(".priceTwo")];
let pricesTwoMonth = ["+$1/mo", "+$2/mo", "+$2/mo"];
let pricesTwoYear = ["+$10/yr", "+$20/yr", "+$20/yr"]
plans.forEach(plan => {
  plan.onclick = () => {
    removePicksSelected();
    plan.classList.add("selected");
  }
})


function checkSelectedPlans() {
  plans.forEach(plan => {
    if (plan.classList.contains("selected")) {
      let planName = plan.querySelector("h4");
      let planPrice = plan.querySelector(".price");
      custmizeTheTotal(planName, planPrice)
    }
  })
}

let stat = "";
function custmizeTheTotal(name, price) {
  let plan = document.getElementById("plan");
  let priceSelected = document.querySelector(".price-selected");
  priceSelected.textContent = price.textContent;
  if (price.textContent.slice(-2) === "mo") {
    plan.textContent = `${name.textContent} (Monthly)`;
    stat = "mo"
  } else {
    plan.textContent = `${name.textContent} (Yearly)`;
    stat = "yo"
  }
}

function removePicksSelected() {
  plans.forEach(plan => {
    plan.classList.remove("selected");
  })
}

// for checkbox checked

const checks = document.querySelectorAll(".check");
const picks = document.querySelectorAll(".pick");

picks.forEach(pick => {
  pick.onclick = () => {
    pick.classList.toggle("selected");
    if (pick.classList.contains("selected")) {
      pick.querySelector(".check").classList.add("checked");
    } else {
      pick.querySelector(".check").classList.remove("checked");
    }
  }
})

function firstProcess() {
  let ar = [];
  picks.forEach(pick => {
    if (pick.classList.contains("selected")) {
      let names = pick.querySelector("h4");
      ar.push(names);
    }
  })
  return ar;
}

function secondProcess() {
  let ar = [];
  picks.forEach(pick => {
    if (pick.classList.contains("selected")) {
      let prices = pick.querySelector(".priceTwo")
      ar.push(prices);
    }
  })
  return ar;
}


function removePicksSelectedLast() {
  let picksS = document.querySelector(".picks-selected");
  [...picksS.children].forEach(picks => {
    picks.remove();
  })
}

// custmize the total picks

function custmizeTotalPicks(first, second) {
  let picksS = document.querySelector(".picks-selected");
  for (let i = 0; i < first.length; i++) {
    let div = `<div class="pick-sel">
    <span id="name">${first[i].textContent}</span>
    <div id="price" class="to-calculet">${second[i].textContent}</div>
    </div>`
    picksS.innerHTML += div;
  }
}

function calcutedTotal() {
  let all = [];
  let pricesToCalculet = document.querySelectorAll(".to-calculet");
  pricesToCalculet.forEach(price => {
    let re = /[0-9]*/g;
    let ar = price.innerHTML.match(re).filter(ele => ele !== "" ? ele : false)
    all.push(+ar[0])
  })
  return all;
}

function calculAndChangeTheText() {
  let arr = calcutedTotal();
  let totalPrice = document.querySelector(".total-price");
  let textTotal = document.querySelector(".textTotal");
  if (stat === "mo") textTotal.innerHTML = `Total (per Month)`; else textTotal.innerHTML = `Total (per Year)`;
  totalPrice.innerHTML = `$${arr.reduce((c, a) => a + c)}/${stat}`
}

