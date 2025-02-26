// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import Moment from 'react-moment';
import React , { Fragment } from 'react'
import { useDispatch} from 'react-redux'

export const DateFormatted = ({ date_in})  => {
    

    const dispatch = useDispatch()


    return(

        <Fragment>
            <Moment format="DD/MM/YYYY" className='datetime'>{date_in}</Moment> |  
            <Moment format="hh:mm A" className='datetime'>{date_in}</Moment>
        </Fragment>


    )

}


export default DateFormatted;