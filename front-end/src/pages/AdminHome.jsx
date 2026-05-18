import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import ViewAllStudents from './AdminComponenet/ViewAllStudents'
import AdminSidebartab from '../components/AdminSidebartab'

function AdminHome() {
  useEffect(() => {
    const token = sessionStorage.getItem("studyBuddy");
    console.log(token);
  }, []);

  return (
    <Box className="page-enter" sx={{ px: { xs: 2, md: 4 } }}>
      <AdminSidebartab />
      <Box sx={{ mt: 4, mb: 4 }}>
        <ViewAllStudents />
      </Box>
    </Box>
  );
}

export default AdminHome;