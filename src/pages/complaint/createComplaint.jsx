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
import { Autocomplete } from '@mui/material'

const CreateComplaint = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [complaintData, setComplaintData] = useState({
    customer: '',
    product: '',
    complaintType: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [complaintTypes, setComplaintTypes] = useState([])
  const token = getToken()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = [
          { id: 1, name: 'Customer 1' },
          { id: 2, name: 'Customer 2' }
        ]
        const productsData = [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' }
        ]
        const complaintTypesData = [
          { id: 1, name: 'Type 1' },
          { id: 2, name: 'Type 2' }
        ]

        setCustomers(customersData)
        setProducts(productsData)
        setComplaintTypes(complaintTypesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setComplaintData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/complaints/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(complaintData)
      })

      if (!response.ok) {
        throw new Error('Failed to create complaint')
      }

      const result = await response.json()
      console.log('Complaint created successfully:', result)
      navigate(`/complaints`)
      onClose()
    } catch (error) {
      console.error('Error creating complaint:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Complaint</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={customers}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Customer" />}
                onChange={(event, newValue) => {
                  setComplaintData(prevData => ({
                    ...prevData,
                    customer: newValue ? newValue.name : ''
                  }))
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={products}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Product" />}
                onChange={(event, newValue) => {
                  setComplaintData(prevData => ({
                    ...prevData,
                    product: newValue ? newValue.name : ''
                  }))
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={complaintTypes}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Complaint Type" />}
                onChange={(event, newValue) => {
                  setComplaintData(prevData => ({
                    ...prevData,
                    complaintType: newValue ? newValue.name : ''
                  }))
                }}
              />
            </FormControl>
            <TextField
              label="Description"
              name="description"
              value={complaintData.description}
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

export default CreateComplaint

