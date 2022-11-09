import { ACTIONS } from '../calculator/Calculator'

export default function DigitOperation({operations, dispatch}) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operations} })}>
            {operations}
        </button>
    )
}