// ================ Select elements =================

const balancEl = document.querySelector(".balance .value")
const incomeTotalEl = document.querySelector(".outcome-total")
const outcomeTotalEl = document.querySelector(".income-total")
const chartEl = document.querySelector(".chart")
const expenseEl = document.querySelector("#expense")
const incomeEl = document.querySelector("#income")
const allEl = document.querySelector("#all")
const incomeList = document.querySelector("#income .list")
const expenseList = document.querySelector("#expense .list")
const allList = document.querySelector("#all .list")

// ================ Select btn ==================

const expenseBtn = document.querySelector(".tab1")
const incomeBtn = document.querySelector(".tab2")
const allBtn = document.querySelector(".tab3")

// ================ Input btns ==================

const addExpense = document.querySelector(".add-expense")
const expenseTitle = document.querySelector("expense-title-input")
const expenseAmount = document.querySelector("expense-amount-input")

const addIncome = document.querySelector(".add-income")
const incomeTitle = document.getElementById("income-title-input")
const incomeAmount = document.getElementById("income-amount-input")

// ==================== Event Listeners ===================

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

// ================== Variables =======================

let ENTRY_LIST = [];


function active(element) {
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


addIncome.addEventListener('click', function () {
    if (!incomeTitle.value || !incomeAmount.value) return;
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value)
    }
    ENTRY_LIST.push(income)
    updateUI();
    clearInput([incomeTitle, incomeAmount])
})
addExpense.addEventListener('click', function () {
    if (!expenseTitle.value || !expenseAmount.value) return;
    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }
    ENTRY_LIST.push(expense)
    updateUI();
    clearInput([expenseTitle, expenseAmount])
})



