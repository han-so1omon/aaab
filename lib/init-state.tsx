var state: {
    logMsg: string | undefined,
    testID: {
        id: string,
        name: string
    } | undefined
    testStatus: {
        id: string,
        aName: string,
        bName: string,
        thresh: number,
        d: number,
        same: boolean,
        msg: string
    } | undefined
} = {
    logMsg: undefined,
    testID: undefined,
    testStatus: undefined
}
export default state
