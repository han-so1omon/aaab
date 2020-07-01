import { useEffect, useState } from 'react'
import { Paper, TextareaAutosize } from '@material-ui/core'
import PropTypes from 'prop-types'

const MessageDisplay = (props) => {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if (props.newMsg) {
            setMsg(props.newMsg + '\n\n' + msg)
        }
    }, [props.newMsg])

    return (
        <Paper>
            <TextareaAutosize
                fontSize={1}
                rowsMax={6}
                aria-label='AAAB log'
                placeholder='...'
                defaultValue={msg}
            />
        </Paper>
    )
}

MessageDisplay.propTypes = {
    newMsg: PropTypes.string
}



export default MessageDisplay
