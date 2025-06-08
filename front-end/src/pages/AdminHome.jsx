import React from 'react'
import { Box } from '@mui/material'
import ViewAllStudents from './AdminComponenet/ViewAllStudents'
import LogoutFunction from '../components/LogoutFunction'

function AdminHome() {
  return (
   <>
      <LogoutFunction/>
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