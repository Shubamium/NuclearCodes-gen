// Get Component
let resultEl = document.querySelector('#generated');
let btnEl = document.querySelector('#btn-generate');

// Functionality
btnEl.addEventListener("click", ()=>{
    resultEl.textContent = generateCode();
}) //BTN Clicked


// Main Generator Function
function generateCode(){
    return 177013;
}