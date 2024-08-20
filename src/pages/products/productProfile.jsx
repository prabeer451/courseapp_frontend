import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Tabs,
  Tab
} from '@mui/material'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'
import EditIcon from '@mui/icons-material/Edit'
import WarrantyDetails from './profileComponents.jsx/warrantyDetails'
import ServiceDetails from './profileComponents.jsx/ServiceDetails'

const ProductProfile = ({ productId }) => {
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [productData, setProductData] = useState({
    Product_SNO: '',
    SAGECODE: '',
    PRODUCTNAME: '',
    CATEGORY: '',
    ProductType: ''
  })
  const [categories, setCategories] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const token = getToken()

  useEffect(() => {
    fetchProduct()
  }, [productId])

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

  const fetchProduct = async () => {
    setIsLoading(true)
    try {
      const dummyData = {
        id: 1,
        Product_SNO: '001',
        SAGECODE: 'SC001',
        PRODUCTNAME: 'Product 1',
        CATEGORY: 'Category 1',
        ProductType: 'Type 1',
        description: 'This is a sample product description.',
        pricing: '$100',
        images: [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150'
        ],
        parts: ['Part 1', 'Part 2'],
        customers: ['Customer 1', 'Customer 2'],
        warranty: [
          { plan: 'Plan A', policy: '2 years' },
          { plan: 'Plan B', policy: '3 years' }
        ],
        amc: [
          { plan: 'AMC Plan 1', policy: '1 year' },
          { plan: 'AMC Plan 2', policy: '2 years' }
        ],
        serviceCost: '200',
        serviceDetails: 'Service details here'
      }

      setProduct(dummyData)
      setProductData({
        Product_SNO: dummyData.Product_SNO,
        SAGECODE: dummyData.SAGECODE,
        PRODUCTNAME: dummyData.PRODUCTNAME,
        CATEGORY: dummyData.CATEGORY,
        ProductType: dummyData.ProductType
      })
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleEditClick = () => {
    setIsEditDialogOpen(true)
  }

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false)
  }

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
      setProduct(result)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Error updating product:', error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
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

  if (!product) {
    return (
      <MainCard title="Product Profile">
        <Typography>No product found</Typography>
      </MainCard>
    )
  }

  return (
    <MainCard title={<Typography variant="h1">Product Profile</Typography>}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={4}
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-5px)'
          }
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 10,
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Box p={3} width="100%">
          <Typography variant="h4" gutterBottom>{product.PRODUCTNAME}</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>{product.CATEGORY} | {product.ProductType}</Typography>
          <Typography variant="body2" paragraph>{product.description}</Typography>
          <Typography variant="h6" gutterBottom>Pricing: ${product.pricing}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            startIcon={<EditIcon />}
            fullWidth
          >
            Edit Product
          </Button>
        </Box>
      </Box>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="product details tabs">
        <Tab label="Images" />
        <Tab label="Parts" />
        <Tab label="Customers" />
        <Tab label="Warranty" />
        <Tab label="Service Details" />
        <Tab label="AMC" />
      </Tabs>
      {tabIndex === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2">Images</Typography>
                <Grid container spacing={2}>
                  {product.images.map((image, index) => (
                    <Grid item key={index} xs={6}>
                      <CardMedia component="img" image={image} alt={`Product Image ${index + 1}`} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2">Parts</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Part Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.parts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((part, index) => (
                        <TableRow key={index}>
                          <TableCell>{part}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={product.parts.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {tabIndex === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2">Customers</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {product.customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                        <TableRow key={index}>
                          <TableCell>{customer}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={product.customers.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {tabIndex === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <WarrantyDetails warranty={product.warranty} />
          </Grid>
        </Grid>
      )}
      {tabIndex === 4 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ServiceDetails product={product} />
          </Grid>
        </Grid>
      )}
      {tabIndex === 5 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h2">AMC</Typography>
                {product.amc.map((a, index) => (
                  <Box key={index} mb={1}>
                    <Typography>{a.plan}: {a.policy}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose} fullWidth maxWidth="sm">
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
                <Button variant="outlined" color="secondary" onClick={handleEditDialogClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </MainCard>
  )
}

export default ProductProfile
