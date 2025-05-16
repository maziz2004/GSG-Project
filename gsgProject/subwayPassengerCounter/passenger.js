// Initialize variables
let count = 0;
let entries = [];
const welcomeMsg = document.getElementById('welcome-msg');
const countEl = document.getElementById('count-el');
const errorEl = document.getElementById('error-msg');
const entriesEl = document.getElementById('entries-list');

// Update welcome message with concatenation
welcomeMsg.textContent += " Station #42";

function updateDisplay() {
    countEl.textContent = count;
}

function increment() {
    count += 1;
    errorEl.textContent = "";
    updateDisplay();
}

function decrement() {
    if (count > 0) {
        count -= 1;
        errorEl.textContent = "";
    } else {
        errorEl.textContent = "Count cannot be negative!";
    }
    updateDisplay();
}

function save() {
    if (count === 0) {
        errorEl.textContent = "Cannot save zero passengers!";
        return;
    }

    entries.push(count);
    entriesEl.textContent = entries.join(" - ");
    count = 0;
    updateDisplay();
    errorEl.textContent = "Entry saved!";

    // Clear success message after 2 seconds
    setTimeout(() => {
        errorEl.textContent = "";
    }, 2000);
}

// Initialize display
updateDisplay();