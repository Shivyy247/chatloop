import { Grid } from '@mui/material'
import React from 'react'

const Group = () => {
  return (
    <Grid container height={"100vh"} >
    <Grid item sx={{
      display: {
        xs: "none",
        sm: "block",
      },
    }}
      sm={4}
      bgcolor={"bisque"}
    >
      Group List
    </Grid>
    <Grid item xs={12} sm={8} sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      padding: "1rem 3rem",
    }} >
      Group Details
    </Grid>
    </Grid>
  )
}

export default Group
