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

const CreateService = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [serviceData, setServiceData] = useState({
    SERVICE_NAME: '',
    TERMS_OF_SERVICE: '',
    CHARGES: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  const handleChange = (e) => {
    const { name, value } = e.target
    setServiceData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Commented out API call
      // const response = await fetch('http://127.0.0.1:8000/api/services/', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(serviceData)
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to create service')
      // }

      // const result = await response.json()

      // Dummy data
      const result = {
        id: Math.floor(Math.random() * 1000),
        ...serviceData
      }

      console.log('Service created successfully:', result)
      navigate(`/services`)
      onClose()
    } catch (error) {
      console.error('Error creating service:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Service</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="SERVICE_NAME"
              name="SERVICE_NAME"
              value={serviceData.SERVICE_NAME}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="TERMS_OF_SERVICE"
              name="TERMS_OF_SERVICE"
              value={serviceData.TERMS_OF_SERVICE}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CHARGES"
              name="CHARGES"
              value={serviceData.CHARGES}
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

export default CreateService