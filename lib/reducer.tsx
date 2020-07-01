interface InState {
    type: any
    payload: any
}

export default function (state:any, inState:InState) {
    switch (inState.type) {
        case 'SET_LOG_MSG':
            return {
                ...state,
                logMsg: inState.payload
            }
        case 'SET_TEST_ID':
            return {
                ...state,
                testID: inState.payload
            }
        case 'SET_TEST_STATUS':
            return {
                ...state,
                testStatus: inState.payload
            }
        default:
            return state
    }
}
