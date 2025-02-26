// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title> {title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'TeachYaar Classroom',
    description: 'An OpenSource Classroom Environment',
    keywords: 'teachyaar, classroom'
}

export default Meta
