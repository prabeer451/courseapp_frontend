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
  IconButton
} from '@mui/material'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'

const ProductProfile = ({ productId }) => {
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const token = getToken()

  useEffect(() => {
    fetchProduct()
  }, [productId])

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
        ]
      }

      setProduct(dummyData)
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
    <MainCard title="Product Profile">
      <Box display="flex" flexDirection="column" alignItems="center" mb={2} border={1} borderColor="grey.400" p={2}>
        <Typography variant="h3">{product.PRODUCTNAME}</Typography>
        <Typography variant="h5">{product.CATEGORY}</Typography>
        <Typography variant="h5">{product.ProductType}</Typography>
        <Typography variant="body1">{product.description}</Typography>
        <Typography variant="body1">Pricing: {product.pricing}</Typography>
        <Button onClick={() => navigate(`/edit-product/${product.id}`)}>
          Edit
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h2">Warranty</Typography>
              {product.warranty.map((w, index) => (
                <Box key={index} mb={1}>
                  <Typography>{w.plan}: {w.policy}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
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
    </MainCard>
  )
}

export default ProductProfile
