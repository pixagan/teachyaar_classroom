// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited

import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan'
import connectDB from './config/db.js'

import adminRoutes from './routes/adminRoutes.js'

import userRoutes from './routes/userRoutes.js'

import channelRoutes from './routes/channelRoutes.js'
import cardRoutes from './routes/cardRoutes.js'
import qandaRoutes from './routes/qandaRoutes.js'
import examRoutes from './routes/examRoutes.js'


//import supportRoutes from './routes/supportRoutes.js'
//import notificationRoutes from './routes/notificationRoutes.js'

import uploadRoutes from './routes/uploadRoutes.js'
import downloadRoutes from './routes/downloadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//Configure env variables
dotenv.config()

connectDB()


const app =  express();


const __dirname = path.resolve()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 6300



app.use(express.json())



app.use('/api/users', userRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/tycards', cardRoutes);
app.use('/api/qanda', qandaRoutes);
app.use('/api/exams', examRoutes);

//app.use('/api/support', supportRoutes);
//app.use('/api/notification', notificationRoutes);


app.use('/api/uploads', uploadRoutes);
app.use('/api/downloads', downloadRoutes);




if(process.env.NODE_ENV === 'production'){

    console.log("In production")
    const frontend = './build' 

  
    app.use(express.static(path.join(__dirname, frontend)))

    //console.log('Path : ', path.join(__dirname, frontend))



    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, frontend, 'index.html')))


    
    //console.log('Path resolved ', path.resolve(__dirname, frontend, 'index.html'))


}else{
    app.get('/', (req, res) => res.send('API Running'));

}



app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



app.use(errorHandler )

export default app