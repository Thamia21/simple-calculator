document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;

    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (button.classList.contains('number')) {
                appendNumber(value);
                updateDisplay();
            } else if (button.classList.contains('decimal')) {
                inputDecimal();
                updateDisplay();
            } else if (button.classList.contains('operator')) {
                setOperation(value);
            } else if (button.classList.contains('equals')) {
                calculate();
                updateDisplay();
            } else if (button.classList.contains('clear')) {
                clear();
                updateDisplay();
            } else if (button.classList.contains('backspace')) {
                backspace();
                updateDisplay();
            }
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            if (e.key === '.') {
                inputDecimal();
            } else {
                appendNumber(e.key);
            }
            updateDisplay();
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            setOperation(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            calculate();
            updateDisplay();
        } else if (e.key === 'Escape') {
            clear();
            updateDisplay();
        } else if (e.key === 'Backspace') {
            backspace();
            updateDisplay();
        }
    });

    function appendNumber(number) {
        if (currentInput === '0' && number === '0') return;
        if (shouldResetScreen) {
            currentInput = '';
            shouldResetScreen = false;
        }
        currentInput = currentInput.toString() + number.toString();
    }

    function inputDecimal() {
        if (shouldResetScreen) {
            currentInput = '0.';
            shouldResetScreen = false;
            return;
        }
        if (currentInput === '') {
            currentInput = '0.';
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function setOperation(operator) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = operator;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Can't divide by 0!");
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = computation.toString();
        operation = null;
        previousInput = '';
        shouldResetScreen = true;
    }

    function clear() {
        currentInput = '0';
        previousInput = '';
        operation = null;
    }

    function backspace() {
        if (currentInput.length <= 1) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
    }

    function updateDisplay() {
        display.value = currentInput === '' ? '0' : currentInput;
    }

    // Initialize display
    updateDisplay();
});
