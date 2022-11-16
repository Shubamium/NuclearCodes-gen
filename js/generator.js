// Get Component
let resultEl = document.querySelector('#generated');
let btnEl = document.querySelector('#btn-generate');
let btnVisitEl = document.querySelector('#btn-visit');

let nuclearCode = 177013; 

// Functionality / Events
btnEl.addEventListener("click", ()=>{
    nuclearCode = generateCode(4); //Set code
    resultEl.textContent = nuclearCode;
}) 

btnVisitEl.addEventListener("click", ()=>{
    window.open(`https://nhentai.net/g/${getNuclearCode()}`)
})

function getNuclearCode() {
    return nuclearCode;
}


// Main Generator Function
function generateCode(prefix = undefined){
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
    if(prefix != undefined){
        if(prefix > 4 || prefix <= 0) prefix = 0; //Limit the prefix
        num1 = prefix;
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