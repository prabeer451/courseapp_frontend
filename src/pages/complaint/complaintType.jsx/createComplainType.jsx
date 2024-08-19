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
  FormControl
} from '@mui/material'
import { getToken } from 'utils/auth'

const CreateComplaintType = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [complaintTypeData, setComplaintTypeData] = useState({
    TYPE_CODE: '',
    TYPE_DESCRIPTION: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  const handleChange = (e) => {
    const { name, value } = e.target
    setComplaintTypeData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/complaint-types/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(complaintTypeData)
      })

      if (!response.ok) {
        throw new Error('Failed to create complaint type')
      }

      const result = await response.json()
      console.log('Complaint type created successfully:', result)
      navigate(`/complaint-types`)
      onClose()
    } catch (error) {
      console.error('Error creating complaint type:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Complaint Type</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="TYPE_CODE"
              name="TYPE_CODE"
              value={complaintTypeData.TYPE_CODE}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="TYPE_DESCRIPTION"
              name="TYPE_DESCRIPTION"
              value={complaintTypeData.TYPE_DESCRIPTION}
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

export default CreateComplaintType

