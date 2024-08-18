import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'

const WarrantyDetails = ({ warranty }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Warranty</Typography>
        {warranty.map((w, index) => (
          <Box key={index} mb={1}>
            <Typography>{w.plan}: {w.policy}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default WarrantyDetails

