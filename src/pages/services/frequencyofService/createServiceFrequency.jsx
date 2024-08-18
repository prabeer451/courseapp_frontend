import React, { useState } from 'react'
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
} from '@mui/material'
import { getToken } from 'utils/auth'

const CreateServiceFrequency = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [serviceFrequencyData, setServiceFrequencyData] = useState({
    FREQUENCY_ID: '',
    DESCRIPTION: '',
    INTERVAL_MONTHS: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  const handleChange = (e) => {
    const { name, value } = e.target
    setServiceFrequencyData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Commented out API call
      // const response = await fetch('http://127.0.0.1:8000/api/service-frequencies/', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(serviceFrequencyData)
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to create service frequency')
      // }

      // const result = await response.json()

      // Dummy data
      const result = {
        id: Math.floor(Math.random() * 1000),
        ...serviceFrequencyData
      }

      console.log('Service frequency created successfully:', result)
      navigate(`/services/frequency`)
      onClose()
    } catch (error) {
      console.error('Error creating service frequency:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Service Frequency</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="FREQUENCY_ID"
              name="FREQUENCY_ID"
              value={serviceFrequencyData.FREQUENCY_ID}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="DESCRIPTION"
              name="DESCRIPTION"
              value={serviceFrequencyData.DESCRIPTION}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="INTERVAL_MONTHS"
              name="INTERVAL_MONTHS"
              value={serviceFrequencyData.INTERVAL_MONTHS}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
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

export default CreateServiceFrequency