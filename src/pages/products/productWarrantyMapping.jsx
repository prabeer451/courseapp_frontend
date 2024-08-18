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

const ProductWarrantyMapping = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [mappingData, setMappingData] = useState({
    Product_SNO: '',
    WARRANTY_CODES: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [warrantyOptions, setWarrantyOptions] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const token = getToken()

  useEffect(() => {
    const fetchWarrantyOptions = async () => {
      try {
        const warrantyData = [
          { id: 1, code: 'WARRANTY1' },
          { id: 2, code: 'WARRANTY2' }
        ]

        setWarrantyOptions(warrantyData)
      } catch (error) {
        console.error('Error fetching warranty options:', error)
      }
    }

    const fetchProductOptions = async () => {
      try {
        const productData = [
          { id: 1, sno: 'P001' },
          { id: 2, sno: 'P002' }
        ]

        setProductOptions(productData)
      } catch (error) {
        console.error('Error fetching product options:', error)
      }
    }

    fetchWarrantyOptions()
    fetchProductOptions()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMappingData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleWarrantyChange = (event, newValue) => {
    setMappingData(prevData => ({
      ...prevData,
      WARRANTY_CODES: newValue.map(option => option.code)
    }))
  }

  const handleProductChange = (event, newValue) => {
    setMappingData(prevData => ({
      ...prevData,
      Product_SNO: newValue ? newValue.sno : ''
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/product-warranty-mapping/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mappingData)
      })

      if (!response.ok) {
        throw new Error('Failed to map warranty with product')
      }

      const result = await response.json()
      console.log('Warranty mapped with product successfully:', result)
      navigate(`/products`)
      onClose()
    } catch (error) {
      console.error('Error mapping warranty with product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Map Warranty with Product</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={productOptions}
                getOptionLabel={(option) => option.sno}
                renderInput={(params) => <TextField {...params} label="Product SNO" />}
                onChange={handleProductChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                multiple
                options={warrantyOptions}
                getOptionLabel={(option) => option.code}
                renderInput={(params) => <TextField {...params} label="Warranty Codes" />}
                onChange={handleWarrantyChange}
              />
            </FormControl>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" type="submit">
                Map
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

export default ProductWarrantyMapping

