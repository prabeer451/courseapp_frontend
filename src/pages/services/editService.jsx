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
} from '@mui/material'
import { getToken } from 'utils/auth'

const EditService = ({ service, onClose }) => {
  const navigate = useNavigate()
  const [serviceData, setServiceData] = useState({
    SERVICE_NAME: '',
    TERMS_OF_SERVICE: '',
    CHARGES: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  useEffect(() => {
    if (service) {
      setServiceData({
        SERVICE_NAME: service.SERVICE_NAME,
        TERMS_OF_SERVICE: service.TERMS_OF_SERVICE,
        CHARGES: service.CHARGES
      })
    }
  }, [service])

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
      // Simulate a successful API response with dummy data
      const result = {
        id: service.id,
        ...serviceData
      }
      console.log('Service updated successfully:', result)
      navigate(`/services`)
      onClose()
    } catch (error) {
      console.error('Error updating service:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={Boolean(service)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Service</DialogTitle>
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
                Update
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

export default EditService
