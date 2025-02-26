// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({ variant, children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
