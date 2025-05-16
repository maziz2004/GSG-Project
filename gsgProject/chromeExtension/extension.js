const inputEl = document.getElementById("inputEl");
const inputBtn = document.getElementById("inputBtn");
const tabBtn = document.getElementById("tabBtn");
const deleteBtn = document.getElementById("deleteBtn");
const ulEl = document.getElementById("ulEl");

let leads = JSON.parse(localStorage.getItem("leads")) || [];

// Render leads with parameter
function renderLeads(leadsArray) {
    let listItems = "";
    for (let i = 0; i < leadsArray.length; i++) {
        listItems += `
      <li>
        <a href="${leadsArray[i]}" target="_blank">${leadsArray[i]}</a>
        <button onclick="deleteLead(${i})">✕</button>
      </li>
    `;
    }
    ulEl.innerHTML = listItems;
}

// Initial render
renderLeads(leads);

// Save input lead
inputBtn.addEventListener("click", () => {
    if (inputEl.value) {
        leads.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem("leads", JSON.stringify(leads));
        renderLeads(leads);
    }
});

// Save current tab
tabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        leads.push(tabs[0].url);
        localStorage.setItem("leads", JSON.stringify(leads));
        renderLeads(leads);
    });
});

// Delete single lead
function deleteLead(index) {
    leads.splice(index, 1);
    localStorage.setItem("leads", JSON.stringify(leads));
    renderLeads(leads);
}

// Delete all leads
deleteBtn.addEventListener("click", () => {
    localStorage.clear();
    leads = [];
    renderLeads(leads);
});