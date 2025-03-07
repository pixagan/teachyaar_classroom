// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import './App.css';

import React from 'react'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import HomeScreen from './screens/HomeScreen'

import StudentLoginScreen from './screens/StudentScreens/StudentLoginScreen'
import StudentSignupScreen from './screens/StudentScreens/StudentSignupScreen'

import TeacherLoginScreen from './screens/TeacherScreens/TeacherLoginScreen'
import TeacherSignupScreen from './screens/TeacherScreens/TeacherSignupScreen'
import TeacherHomeScreen from './screens/TeacherScreens/TeacherHomeScreen'
import TeacherDashboardScreen from './screens/TeacherScreens/TeacherDashboardScreen'
import NotebookCreatorScreen from './screens/TeacherScreens/NotebookCreatorScreen'
import TeacherClassroomScreen from './screens/TeacherScreens/TeacherClassroomScreen'
import TeacherCourseScreen from './screens/TeacherScreens/TeacherCourseScreen'
import TeacherCourseNotesScreen from './screens/TeacherScreens/TeacherNotebooksScreen'
import TeacherTestsScreen from './screens/TeacherScreens/TeacherTestsScreen'
import TeacherNotebooksScreen from './screens/TeacherScreens/TeacherNotebooksScreen'

import AdminLoginScreen  from './screens/AdminScreens/AdminLoginScreen'


//Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
// import AlertComponent from './components/layout/AlertComponent'


const App = () => {

  return (

    <Router>

      <Header />


      <main className='py-3' style={{marginTop:'0px', paddingTop:'0px'}}>

        <Routes>

      
          <Route path='/' element={<HomeScreen />} exact />

          <Route path='/admin/login' element={<AdminLoginScreen />} exact />


          <Route path='/teacher/login' element={<TeacherLoginScreen />} exact />
          <Route path='/teacher/signup' element={<TeacherSignupScreen />} exact />
          <Route path='/teacher/home' element={<TeacherHomeScreen />} exact />
          <Route path='/teacher/course/:course_id' element={<TeacherCourseScreen />} exact />
          <Route path='/teacher/dashboard' element={<TeacherDashboardScreen />} exact />
          <Route path='/teacher/classroom/:course_id' element={<TeacherClassroomScreen />} exact />
          <Route path='/teacher/notebook/:notebook_id' element={<NotebookCreatorScreen />} exact />
          <Route path='/teacher/notebooks/:course_id' element={<TeacherNotebooksScreen />} exact />
          <Route path='/teacher/tests/:course_id' element={<TeacherTestsScreen />} exact />

          <Route path='/student/login' element={<StudentLoginScreen />} exact />
          <Route path='/student/signup' element={<StudentSignupScreen />} exact />

          <Route path='/teacher/dashboard' element={<TeacherDashboardScreen />} exact />

        </Routes>

      </main>

      <Footer />

    </Router>

  );
}

export default App;



