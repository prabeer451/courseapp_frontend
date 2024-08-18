import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'

const EditProductType = ({ open, onClose, productType }) => {
  const navigate = useNavigate()
  const [productTypeData, setProductTypeData] = useState({
    ProductType_SNO: '',
    SAGECODE: '',
    PRODUCTTYPENAME: '',
    CATEGORY: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const token = getToken()

  useEffect(() => {
    if (productType) {
      setProductTypeData(productType)
    }
  }, [productType])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = [
          { id: 1, name: 'Category 1' },
          { id: 2, name: 'Category 2' }
        ]

        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductTypeData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/productTypes/${productType.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productTypeData)
      })

      if (!response.ok) {
        throw new Error('Failed to update product type')
      }

      const result = await response.json()
      console.log('Product type updated successfully:', result)
      navigate(`/productTypes`)
      onClose()
    } catch (error) {
      console.error('Error updating product type:', error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product Type</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Product Type SNO"
              name="ProductType_SNO"
              value={productTypeData.ProductType_SNO}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SAGECODE"
              name="SAGECODE"
              value={productTypeData.SAGECODE}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Product Type Name"
              name="PRODUCTTYPENAME"
              value={productTypeData.PRODUCTTYPENAME}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="CATEGORY"
                value={productTypeData.CATEGORY}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default EditProductType
