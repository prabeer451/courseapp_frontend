import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

const EditCustomer = ({ open, onClose, onCustomerUpdated }) => {
  const { id } = useParams()
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
  const [isLoading, setIsLoading] = useState(true)
  const token = getToken()

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Simulating API call with dummy data
        const dummyCustomer = {
          id: 1,
          name: 'Amit Kumar',
          email: 'amit@example.com',
          phone: '1234567890',
          address: '123 Main St',
          pincode: '12345',
          city: 'Mumbai',
          state: 'MH',
          country: 'India'
        }
        setCustomerData(dummyCustomer)
      } catch (error) {
        console.error('Error fetching customer:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomer()
  }, [id, token])

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
      // Simulating API call
      const updatedCustomer = { ...customerData }
      console.log('Customer updated successfully:', updatedCustomer)
      onCustomerUpdated(updatedCustomer)
      onClose()
    } catch (error) {
      console.error('Error updating customer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Customer</DialogTitle>
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

export default EditCustomer
