import { useEffect, useState } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import PropTypes from 'prop-types'

const MessageDisplay = (props:any) => {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if (props.newMsg) {
            setMsg(props.newMsg + '\n\n' + msg)
        }
    }, [props.newMsg])

    return (
        <TextareaAutosize
            rowsMax={6}
            aria-label='AAAB log'
            placeholder='Test log'
            value={msg}
        />
    )
}

MessageDisplay.propTypes = {
    newMsg: PropTypes.string
}



export default MessageDisplay
