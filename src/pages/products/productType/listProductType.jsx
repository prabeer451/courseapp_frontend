import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'
import CreateProductType from './createProductType'
import EditProductType from './editProductType'

const ListProductType = () => {
  const navigate = useNavigate()
  const [productTypes, setProductTypes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedProductType, setSelectedProductType] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const token = getToken()

  useEffect(() => {
    fetchProductTypes()
  }, [page, rowsPerPage, searchQuery])

  const fetchProductTypes = async () => {
    setIsLoading(true)
    try {
      const dummyData = {
        results: [
          { id: 1, ProductType_SNO: '001', PRODUCTTYPENAME: 'Type 1', DESCRIPTION: 'Description 1' },
          { id: 2, ProductType_SNO: '002', PRODUCTTYPENAME: 'Type 2', DESCRIPTION: 'Description 2' },
          { id: 3, ProductType_SNO: '003', PRODUCTTYPENAME: 'Type 3', DESCRIPTION: 'Description 3' }
        ]
      }

      // Filter product types based on search query across all columns
      const filteredProductTypes = dummyData.results.filter(productType =>
        Object.values(productType).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

      setProductTypes(filteredProductTypes)
    } catch (error) {
      console.error('Error fetching product types:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOpenCreate = () => {
    setOpenCreate(true)
  }

  const handleCloseCreate = () => {
    setOpenCreate(false)
  }

  const handleOpenEdit = (productType) => {
    setSelectedProductType(productType)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setSelectedProductType(null)
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
    <MainCard title="Product Type List">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create Product Type
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Type SNO</TableCell>
              <TableCell>Product Type Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((productType) => (
              <TableRow key={productType.id}>
                <TableCell>{productType.ProductType_SNO}</TableCell>
                <TableCell>{productType.PRODUCTTYPENAME}</TableCell>
                <TableCell>{productType.DESCRIPTION}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenEdit(productType)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={productTypes.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CreateProductType open={openCreate} onClose={handleCloseCreate} />
      <EditProductType open={openEdit} onClose={handleCloseEdit} productType={selectedProductType} />
    </MainCard>
  )
}

export default ListProductType

