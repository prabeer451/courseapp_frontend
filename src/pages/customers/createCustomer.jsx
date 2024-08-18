import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress
} from '@mui/material'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'

const CreateCustomer = () => {
  const navigate = useNavigate()
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
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
      const response = await fetch('http://127.0.0.1:8000/api/customers/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      })

      if (!response.ok) {
        throw new Error('Failed to create customer')
      }

      const result = await response.json()
      console.log('Customer created successfully:', result)
      navigate(`/customers`)
    } catch (error) {
      console.error('Error creating customer:', error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <MainCard title="Loading...">
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      </MainCard>
    )
  }

  return (
    <MainCard title="Create Customer">
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
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate(`/customers`)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </MainCard>
  )
}

export default CreateCustomer

