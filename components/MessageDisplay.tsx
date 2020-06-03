import { Paper, TextareaAutosize } from '@material-ui/core'

const MessageDisplay = () => {
    return (
        <Paper>
            <TextareaAutosize
                rowsMax={4}
                aria-label="AAAB log"
                placeholder="..."
            />
        </Paper>
    )
}

export default MessageDisplay
