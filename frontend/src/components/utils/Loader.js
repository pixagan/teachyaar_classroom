// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'react-bootstrap'

const Loader = props => {
    return (
        <Spinner animation='border' role='status' style={{ width: '100px', height: '100px', margin: 'auto', display: 'block'}}>
            
            <span className='sr-only'> Loading ...</span>
        </Spinner>
    )
}

Loader.propTypes = {

}

export default Loader
