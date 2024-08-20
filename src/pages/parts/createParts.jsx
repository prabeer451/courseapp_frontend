import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl
} from '@mui/material'
import { getToken } from 'utils/auth'

const CreatePart = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [partData, setPartData] = useState({
    S_NO: '',
    PART_CODE: '',
    ITEM_DESCRIPTION: '',
    WARRANTY_PERIOD: '',
    MRP: '',
    DP: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  const handleChange = (e) => {
    const { name, value } = e.target
    setPartData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/parts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(partData)
      })

      if (!response.ok) {
        throw new Error('Failed to create part')
      }

      const result = await response.json()
      console.log('Part created successfully:', result)
      navigate(`/parts`)
      onClose()
    } catch (error) {
      console.error('Error creating part:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Part</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="S_NO"
              name="S_NO"
              value={partData.S_NO}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="PART_CODE"
              name="PART_CODE"
              value={partData.PART_CODE}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="ITEM_DESCRIPTION"
              name="ITEM_DESCRIPTION"
              value={partData.ITEM_DESCRIPTION}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="WARRANTY_PERIOD"
              name="WARRANTY_PERIOD"
              value={partData.WARRANTY_PERIOD}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="MRP"
              name="MRP"
              value={partData.MRP}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="DP"
              name="DP"
              value={partData.DP}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePart
