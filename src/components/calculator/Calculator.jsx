import './calculator.css'
import { useReducer } from 'react'
import DigitOperation from '../DigitOperation/DigitOperation'
import Operation from '../Operation/Operation'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    EVALUATE: 'evaluate',
    DELETE_DIGIT: 'delete-digit',
    CLEAR: 'clear',
}

const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if(state.overWrite){
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overWrite: false,
                }
            }
            if(state.currentOperand === '0' && payload.digit === '0') return state;
            if (payload.digit === '.' && state.currentOperand.includes('.')) return state;
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`,
            };
        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand == null && state.previousOperand == null) return state;
            if(state.previousOperand == null){
                return {
                    ...state,
                    operation: payload.operations,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            if(state.currentOperand == null){
                return {
                    ...state,
                    operation: payload.operations,
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operations,
                currentOperand: null,
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.DELETE_DIGIT: 
            if(state.overWrite){
                return {
                    ...state,
                    overWrite: false,
                    currentOperand: null,
                }
            }
            if(state.currentOperand == null) return state
            if(state.currentOperand.length === 1) return {
                ...state,
                currentOperand: null,
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }
        case ACTIONS.EVALUATE:
            if(state.previousOperand == null || state.currentOperand == null || state.operation == null) return state
            return {
                ...state,
                overWrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            }
        default:
            break;
    }
}

const evaluate = ({currentOperand, previousOperand, operation}, dispatch) => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return ""
    let computation = ''
    switch (operation) {
        case '+':
            computation = prev + current
            break;
        case '-':
            computation = prev - current
            break;
        case '*':
            computation = prev * current
            break;
        case '÷':
            computation = prev / current
            break;
        default:
            computation = null;
    }
    return computation.toString();
}

export default function Calculator() {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
        reducer,
        {}
    )
  return (
    <div className='calculator-grid'>
        <div className="output">
              <div className="previous-operand">{previousOperand}{operation}</div>
              <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
        <Operation dispatch={dispatch} operations='÷'/>
        <DigitOperation dispatch={dispatch} digit='1' />
        <DigitOperation dispatch={dispatch} digit='2' />
        <DigitOperation dispatch={dispatch} digit='3' />
        <Operation dispatch={dispatch} operations='*' />
        <DigitOperation dispatch={dispatch} digit='4' />
        <DigitOperation dispatch={dispatch} digit='5' />
        <DigitOperation dispatch={dispatch} digit='6' />
        <Operation dispatch={dispatch} operations='+'/>
        <DigitOperation dispatch={dispatch} digit='7' />
        <DigitOperation dispatch={dispatch} digit='8' />
        <DigitOperation dispatch={dispatch} digit='9' />
        <Operation dispatch={dispatch} operations='-' />
        <DigitOperation dispatch={dispatch} digit='.' />
        <DigitOperation dispatch={dispatch} digit='0' />
        <button className='span-two' onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  )
}
