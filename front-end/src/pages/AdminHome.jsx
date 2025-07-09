import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import ViewAllStudents from './AdminComponenet/ViewAllStudents'
import AdminSidebartab from '../components/AdminSidebartab'


function AdminHome() {

  useEffect(()=>{
    const token = sessionStorage.getItem("studyBuddy");
    console.log(token);
  },[])
  return (
   <>
      <AdminSidebartab/>
      <Box sx={{
        mt:"40px",
        mb:"40px",
        mx:"20px"
      }}>
         <ViewAllStudents/>
      </Box>
   </>
  )
}

export default AdminHome