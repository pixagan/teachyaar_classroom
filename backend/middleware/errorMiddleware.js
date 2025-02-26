// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalURl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}


export { notFound, errorHandler }