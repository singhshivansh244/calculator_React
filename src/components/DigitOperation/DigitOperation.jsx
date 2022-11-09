import {ACTIONS} from '../calculator/Calculator'

export default function DigitOperation({digit, dispatch}) {
  return (
    <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>
        {digit}
    </button>
  )
}
