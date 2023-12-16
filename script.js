sum=(a,b)=>a+b;
subtract=(a,b)=>a-b;
multiply=(a,b)=>a*b;
divide=(a,b)=>a/b;

operator =""
firstValue =""
secondValue =""
screen = document.querySelector('.current')
prevScreen = document.querySelector('.previous')
operators=document.querySelectorAll('.operator')


const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', clearAll);

function clearAll() {
    screen.textContent = "";
    prevScreen.textContent = "";
    operator = "";
    firstValue = "";
    secondValue = "";
}



operators.forEach(uniqueOperator =>{
    uniqueOperator.addEventListener('click',getOperator)
})

function getOperator(event){
    operator= event.target.textContent
    if(screen.textContent!==""){
        operate()
    }
   
}


numbers=document.querySelectorAll(".calc-buttons .number")
let lastInput = ''; // Add this variable to track the last input

numbers.forEach(number => {
    number.addEventListener('click', getValues);
});

function getValues(event){
    const inputValue = event.target.innerHTML;
    
    if (inputValue === '.' && lastInput === '.') {
        // Prevent entering '.' twice in a row
        return;
    }

    if(screen.textContent.length <= 5){
        screen.textContent = screen.textContent + inputValue;
    }
    
    lastInput = inputValue; // Update lastInput
}

function operate() {
        prevScreen.textContent = screen.textContent + operator;
        screen.textContent = "";
    }
equal=document.querySelector(".equal")

function operationCheck(a, b, operator) {
    let result;
    switch (operator) {
        case "\u002B": 
            result = sum(a, b);
            break;
        case "\u2212": 
            result = subtract(a, b);
            break;
        case '\u00D7': 
            result = multiply(a, b);
            break;
        case '\u00F7': 
            result = divide(a, b);
            break;
        default:
            break;
    }
    return result;
}


function afterPoint(num){
    let toString = String(num);
    let point = toString.indexOf('.');
    let afterPoint = toString.substring(point);
    return afterPoint.length-1;
}

function calculation(){
    let finalResult=""
    if (prevScreen.textContent !=="" && screen.textContent !==""){
        firstValue= prevScreen.textContent.substring(0,prevScreen.textContent.length-1)
        secondValue= screen.textContent
        operator=prevScreen.textContent.slice(-1)
        let operation = operationCheck(parseFloat(firstValue),parseFloat(secondValue),operator)
        if (operation % 1 !== 0 && operation.toFixed(1) !== '0.0') {
            lengthOperation= afterPoint(operation)
            finalResult = operation.toFixed(lengthOperation); // Display with one decimal place if non-zero fraction
        } else {
            finalResult = operation.toString(); // Display as a whole number otherwise
        }
        prevScreen.textContent=prevScreen.textContent+secondValue + "="
        screen.textContent=finalResult
        secondValue=""
        firstValue=""
        

    }
}






equal.addEventListener('click',calculation)

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener('click', deleteLastDigit);

function deleteLastDigit() {
    let currentResult = screen.textContent;
    if (currentResult.length > 0) {
        screen.textContent = currentResult.substring(0, currentResult.length - 1); // Removes the last digit
    }
}

