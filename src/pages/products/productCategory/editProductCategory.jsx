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

const EditProductCategory = ({ open, onClose, product }) => {
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    Product_SNO: '',
    SAGECODE: '',
    PRODUCTNAME: '',
    CATEGORY: '',
    ProductType: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const token = getToken()

  useEffect(() => {
    if (product) {
      setProductData(product)
    }
  }, [product])

  useEffect(() => {
    const fetchCategoriesAndTypes = async () => {
      try {
        const categoriesData = [
          { id: 1, name: 'Category 1' },
          { id: 2, name: 'Category 2' }
        ]
        const typesData = [
          { id: 1, name: 'Type 1' },
          { id: 2, name: 'Type 2' }
        ]

        setCategories(categoriesData)
        setProductTypes(typesData)
      } catch (error) {
        console.error('Error fetching categories or product types:', error)
      }
    }

    fetchCategoriesAndTypes()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${product.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      const result = await response.json()
      console.log('Product updated successfully:', result)
      navigate(`/products`)
      onClose()
    } catch (error) {
      console.error('Error updating product:', error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Product SNO"
              name="Product_SNO"
              value={productData.Product_SNO}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SAGECODE"
              name="SAGECODE"
              value={productData.SAGECODE}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Product Name"
              name="PRODUCTNAME"
              value={productData.PRODUCTNAME}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="CATEGORY"
                value={productData.CATEGORY}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Product Type</InputLabel>
              <Select
                name="ProductType"
                value={productData.ProductType}
                onChange={handleChange}
              >
                {productTypes.map(type => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
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

export default EditProductCategory

