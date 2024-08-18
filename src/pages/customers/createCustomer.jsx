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
  DialogTitle
} from '@mui/material'
import { getToken } from 'utils/auth'

const CreateCustomer = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // const response = await fetch('http://127.0.0.1:8000/api/customers/', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(customerData)
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to create customer')
      // }

      // const result = await response.json()
      const result = { id: 1, ...customerData } // Dummy data
      console.log('Customer created successfully:', result)
      navigate(`/customers`)
      onClose()
    } catch (error) {
      console.error('Error creating customer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Customer</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={customerData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Pincode"
              name="pincode"
              value={customerData.pincode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={customerData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="State"
              name="state"
              value={customerData.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={customerData.country}
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

export default CreateCustomer
