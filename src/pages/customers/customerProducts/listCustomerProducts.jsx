import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'
import ViewAMC from 'src/pages/AMC/viewAmc'

const listCustomerProducts = () => {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [expandedProductId, setExpandedProductId] = useState(null)
  const [amcDialogOpen, setAmcDialogOpen] = useState(false)
  const [selectedAmcId, setSelectedAmcId] = useState(null)
  const token = getToken()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = [
          { id: 1, name: 'Product 1', category: 'Category 1', type: 'Type 1', description: 'Description 1', pricing: '$100', amcDetails: 'AMC Details 1', amcId: 1 },
          { id: 2, name: 'Product 2', category: 'Category 2', type: 'Type 2', description: 'Description 2', pricing: '$200', amcDetails: 'AMC Details 2', amcId: 2 }
        ]
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [token])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleAccordionChange = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId)
  }

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`)
  }

  const handleOpenAmcDialog = (amcId) => {
    setSelectedAmcId(amcId)
    setAmcDialogOpen(true)
  }

  const handleCloseAmcDialog = () => {
    setAmcDialogOpen(false)
    setSelectedAmcId(null)
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
    <MainCard title={<h1>Customer Products</h1>}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Pricing</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
  <React.Fragment key={product.id}>
    <TableRow>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => handleAccordionChange(product.id)}
        >
          {expandedProductId === product.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{product.type}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.pricing}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={() => handleViewProduct(product.id)}>
          View Product
        </Button>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={expandedProductId === product.id} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h3" gutterBottom component="div">
              AMC Details
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => handleOpenAmcDialog(product.amcId)}>
              View AMC Details
            </Button>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </React.Fragment>
))}

          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={products.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={amcDialogOpen} onClose={handleCloseAmcDialog} fullWidth maxWidth="sm">
        <DialogTitle>AMC Details</DialogTitle>
        <DialogContent>
          {selectedAmcId && <ViewAMC open={amcDialogOpen} onClose={handleCloseAmcDialog} amcId={selectedAmcId} />}
        </DialogContent>
      </Dialog>
    </MainCard>
  )
}

export default listCustomerProducts
