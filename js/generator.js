
// Get Component
let resultEl = document.querySelector('#generated');
let btnEl = document.querySelector('#btn-generate');
let btnVisitEl = document.querySelector('#btn-visit');
let btnSaveEl = document.querySelector('#btn-save');
let listContainerEl = document.querySelector('#code-list');
let usePrefixEl = document.querySelector('#use-prefix');
let prefixEl = document.querySelector('#prefix');

let codeInList = [];

let nuclearCode = 177013; 

// Functionality / Events
btnEl.addEventListener("click", ()=>{
    nuclearCode = generateCode(getUsePrefix()); //Set code
    resultEl.textContent = nuclearCode;
}) 

btnVisitEl.addEventListener("click", ()=>{
    window.open(`https://nhentai.net/g/${getNuclearCode()}`)
})

btnSaveEl.addEventListener("click", ()=>{
    addToList(nuclearCode);
})

function getNuclearCode() {
    return nuclearCode;
}

function getUsePrefix() {
    return usePrefixEl.checked;
}  


// Main Generator Function
function generateCode(prefix = false){
    // return 177013;

    // Base Number Variables
    let [num1,num2,num3,num4,num5,num6] = 
    [ 
        getRandomRange(4),  // 1    0 <=> 4
        getRandomRange(9),  // 2    0 <=> 9
        getRandomRange(9),  // 3    0 <=> 9    Default Range Random between 0-9
        getRandomRange(9),  // 4    0 <=> 9      
        getRandomRange(9),  // 5    0 <=> 9
        getRandomRange(9)   // 6    0 <=> 9

    ];


    // Add prefix Functionality to start a specific number
    if(prefix === true){
        num1 = parseInt(prefixEl.value);
        console.log(prefixEl.value);
    }



    // Generate Rules And Exception
    if(num1 === 4){
        num2 = getRandomRange(2);
        
        if(num2 === 2){
            num3 = getRandomRange(8);

            if(num3 === 8){
                num4 = getRandomRange(2);
                
                if(num4 === 2){
                    num5 = 0;
                    num6 = 0;
                }
            }

        }

    }


    // Concat all of the generated numbers and return it
    let generatedNumber = concatNumber(num1,num2,num3,num4,num5,num6);
    generatedNumber = parseInt(generatedNumber,10);

    return generatedNumber;

}

// Generate a number between range
function getRandomRange(max){
    max++; // Increment so the max become inclusive
    return Math.floor(Math.random() * max);
}

// Function to concat a number in a string way
function concatNumber(...nums){

    let result = '';

    nums.forEach(number => {
        result += number;
    });

    return result;
}



// List Functions
function addToList(codes){

    if(codeInList.includes(codes)) return;
    let listEl = document.createElement("div");
    listEl.classList.add("code-list_item");
    listEl.innerHTML = `
        <p class="code">${codes}</p>
        <button class="btn-del" onclick="deleteThis(this)">Remove</div>
    `
    listContainerEl.appendChild(listEl);

    codeInList.push(codes);

}

// Delete List
function deleteThis(btn){
    const parentEl = btn.parentElement;
    let text = parentEl.querySelector(".code");
    let number = parseInt(text);

    // Remove the element from list
    codeInList.shift(number);

    parentEl.remove();
}

// Input Validation
function limiter(input) {
    try {
        input.value = parseInt(input.value);
    } catch (error) {
        input.value = 0;
    }

    // if(Number.isInteger(input.value)) input.value = 0;
    if (input.value < 0) input.value = 0;
    if (input.value > 4) input.value = 4;
 }