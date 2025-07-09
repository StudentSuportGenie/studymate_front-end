import { Typography ,Box} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import LogoutFunction from './LogoutFunction'

function AdminSidebartab() {
  return (
   <>
     <Box>
        <Typography>
            <Link to="/AdminHome">Home</Link>
            {" > "}
            <Link to="/KnowdgleItemAdded">Knoedgle</Link> {" > "}
            <LogoutFunction/>
        </Typography>
     </Box>
   </>
  )
}

export default AdminSidebartab