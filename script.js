/* varaibles are named for readibility they named in a way that when you first see what the variable name is you instantly know what it does*/

//delcaration of class along with constructor method and two arguments
class Calculator {
  constructor(previousOperandTextElement/*before*/, currentOperandTextElement/*after*/) {
    
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
//function for clearing entire input on calculator if mistake is made by user
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
//deletes individual input on calculator
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
// adds a number
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
//decides the operation
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    //declared with let since it will be changing based on the opertion in switch function
    let computation
    
    const prev = parseFloat(this.previousOperand) 
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
//display the input
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
//updates the isplayed input as it is being changed
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

//these variables are declared const, since if these variables were to be changed it would completely break the entire program which is not cool
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
//event listener that when clicked displays input at the top
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
//event listner for when clicked does operation
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
//event listner for clear button that clears ALL input when clicked on
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
//event listener for delet button that if clicked deletes the input by one
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
