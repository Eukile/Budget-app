// ================ Select elements =================

const balancEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// ================ Select btn ==================

const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// ================ Input btns ==================

const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

// ==================== Event Listeners ===================

expenseBtn.addEventListener('click', function () {
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
    show(expenseEl);
    hide([incomeEl, allEl]);
})
incomeBtn.addEventListener('click', function () {
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
    show(incomeEl);
    hide([expenseEl, allEl]);
})
allBtn.addEventListener('click', function () {
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
    show(allEl);
    hide([incomeEl, expenseEl]);
})

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

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);


// ================== Variables =======================

let ENTRY_LIST;
let balance = 0, income = 0, outcome = 0
const DELETE = "delete", edit = "edit"

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();


// ================= Helpers =========================

function deleteOrEdit(event) {
    const targetBtn = event.target;

    const entry = targetBtn.parentNode;

    if (targetBtn.id = DELETE) {
        deleteEntry(entry);
    } else if (targetBtn.id == edit) {
        editEntry(entry)
    }
}

function deleteEntry(entry) {
    ENTRY_LIST.splice(entry.id, 1);
    updateUI();
}

function editEntry(entry) {
    console.log(entry)
    let ENTRY = ENTRY_LIST[entry.id];

    if (ENTRY.type == "income") {
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title;
    } else if (ENTRY.type == "expense") {
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title;
    }

    deleteEntry(entry);
}



function updateUI() {
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = Math.abs(calculateTotal(income, outcome));

    // Determine sign of balance
    let sign = (income >= outcome) ? "$" : "-$";

    // Update UI
    balancEl.innerHTML = `<small>${sign}</small>${balance}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;

    clearElement([incomeList, expenseList, allList]);

    ENTRY_LIST.forEach((entry, index) => {
        if (entry.type == "income") {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index);
        } else if (entry.type == "expense") {
            showEntry(expenseList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.list, entry.amount, index)
    })
    updateChart(income, outcome)

    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function showEntry(list, type, title, amount, id) {
    const entry = `<li id = "${id}" class = "${type}">
                            <div class = "entry">${title}: $${amount}</div>
                            <div id ="edit"></div>
                            <div id ="delete"></div>
                    </li>`;
    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry)
}

function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = "";
    })
}

function calculateTotal(type, list) {
    let sum = 0;

    for (let entry = 0; entry < list.length; entry++) {
        if (entry.type == type) {
            sum += entry.amount;
        }
    }

    return sum;
}

function calculateBalance(income, outcome) {
    return income - outcome;
}


function clearInput(inputs) {
    inputs.forEach(input => {
        input.value = "";
    })
}

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






