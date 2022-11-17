
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

function restoreData(){

    // Fetch the data from localstorage
    let listData = localStorage.getItem("listData");
    if(listData === null) return;

    codeInList = JSON.parse(listData).list;
    
    // Refresh the list
    refreshTheList();
}

// Restore at the start
document.addEventListener("DOMContentLoaded", ()=>{
    restoreData();
});


function saveData(){
    console.log("data saved");
    let listObj = {
        list: codeInList
    }
    localStorage.setItem("listData",JSON.stringify(listObj));
}

// Functionality / Events
btnEl.addEventListener("click", ()=>{
    nuclearCode = generateCode(getUsePrefix()); //Set code
    // resultEl.textContent = nuclearCode;
    showResult(nuclearCode);
    btnSaveEl.disabled = false;
});

btnVisitEl.addEventListener("click", ()=>{
    openCode(getNuclearCode());
});

btnSaveEl.addEventListener("click", ()=>{
    addToList(nuclearCode);
    btnSaveEl.disabled = canAddToList();

});

function openCode(code){
    const str1 = "ta";
    const str2 = "hen";

    window.open(`https://n${str2}${str1}i.net/g/${code}`)
}

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
    if(prefix === true && prefixEl.value != "" ){
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


    // Save the data
    return generatedNumber;

}

// Function to display the code
function showResult(code){

    // Convert the code into a string type
    let stringifyCode = '' + code;
    
    // Clear the container
    resultEl.innerHTML = "";

    // Divide each letter into a span
    for(let i = 0; i < stringifyCode.length; i++){

        // Construct the element
        const letter = document.createElement("span");
        letter.classList = ["code_letter"];
        letter.innerText = stringifyCode[i];

        // Base Style
        letter.style.position = "relative";
        letter.style.left = "100px";
        letter.style.opacity = "0";

        // Append the element to the container
        resultEl.appendChild(letter);
        
        // Add Animation 
        letter.animate([
            {
                left:"0px",
                opacity:1
            }
        ],{
            duration: 350,
            easing:"ease",
            // Add staggering
            delay: `${(i+1) * 1.2 * 100}`,
            fill: "forwards"
        })
        
    }
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
function addToList(codes, pushToArr = true){

    if(!canAddToList(codes) && pushToArr) return;
    // console.log("caled");

    let listEl = document.createElement("div");
    listEl.classList.add("code-list_item");
    listEl.innerHTML = `
        <a class="code" onclick="openCode(${codes} );">${codes}</a>
        <button class="btn-del" onclick="deleteThis(this)"><i class="fa-solid fa-trash-can"></i></div>
    `
    listContainerEl.appendChild(listEl);

    if(pushToArr){
        codeInList.push(codes);
        saveData();

    }

}

function clearList(){
    codeInList = [];
    refreshTheList();
    saveData();
}
function refreshTheList(){
    // Clear the list
    while(listContainerEl.firstChild){
        listContainerEl.firstChild.remove();
    }

    codeInList.forEach((code)=>{
        // Add everytime without adding it to the list again
        addToList(code, false);
    })
}

function canAddToList(code){
    return !codeInList.includes(code);
}

// Delete List
function deleteThis(btn){
    const parentEl = btn.parentElement;
    let text = parentEl.querySelector(".code").textContent;
    let number = parseInt(text);

    // Remove the element from list
    codeInList = codeInList.filter(num => num != number);

    saveData();
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


 function toggleUsePrefix(el){
    el.classList.toggle('checked');
    prefixEl.disabled = !el.classList.contains('checked');
    usePrefixEl.checked = el.classList.contains('checked');

    limiter(prefixEl);
 }