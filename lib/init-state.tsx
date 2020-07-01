var state: {
    testID: number | undefined,
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
    testID: undefined,
    testStatus: undefined
}
export default state
