const balancEl = document.querySelector(".balance .value")

const incomeTotalEl = document.querySelector(".outcome-total")

const outcomeTotalEl = document.querySelector(".income-total")

const chartEl = document.querySelector(".chart")

const expenseBtn = document.querySelector(".tab1")
const incomeBtn = document.querySelector(".tab2")
const allBtn = document.querySelector(".tab3")

element.classList.remove("active");
element.classList.add("active")

const incomeList = document.querySelector("#income .list")
const expenseList = document.querySelector("#expense .list")
const allList = document.querySelector("#all .list")

const expenseEl = document.querySelector("#expense")
const incomeEl = document.querySelector("#income")
const allEl = document.querySelector("#all")

element.classList.remove("hide");
element.classList.add("hide")

const addIncome = document.querySelector(".add-income")
const incomeTitle = document.getElementById("income-title-input")
const incomeAmount = document.getElementById("income-amount-input")



expenseBtn.addEventListener('click', function () {
    active(expenseBtn);
    inactive([incomeBtn, allBtn])
    show(expenseEl);
    hide([incomeEl, allEl])
})
incomeBtn.addEventListener('click', function () {
    active(incomeBtn);
    inactive([expenseBtn, allBtn])
    show(incomeEl);
    hide([expenseEl, allEl])
})
allBtn.addEventListener('click', function () {
    active(allBtn);
    inactive([incomeBtn, expenseBtn])
    show(allEl);
    hide([incomeEl, expenseEl])
})


function ative(element) {
    element.classList.add("active")
}

function show(element) {
    element.classList.remove("hide")
}

function hide(elementsArray) {
    elementsArray.forEach(element => {
        element.classList.add("hide")
    });
}
function inactive(elementsArray) {
    elementsArray.forEach(element => {
        element.classList.remove("active")
    });
}



