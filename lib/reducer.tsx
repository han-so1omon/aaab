export default function (state, { type, payload }) {
    switch (type) {
        case 'SET_TEST_ID':
            return {
                ...state,
                testID: payload
            }
        case 'SET_TEST_STATUS':
            return {
                ...state,
                testStatus: payload
            }
        default:
            return state
    }
}
