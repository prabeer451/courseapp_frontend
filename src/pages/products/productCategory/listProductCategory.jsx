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
import CreateProductCategory from './createProductCategory'
import EditProductCategory from './editProductCategory'

const ListProductCategory = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const token = getToken()

  useEffect(() => {
    fetchCategories()
  }, [page, rowsPerPage, searchQuery])

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const dummyData = {
        results: [
          { id: 1, Category_SNO: '001', CATEGORYNAME: 'Category 1', DESCRIPTION: 'Description 1' },
          { id: 2, Category_SNO: '002', CATEGORYNAME: 'Category 2', DESCRIPTION: 'Description 2' },
          { id: 3, Category_SNO: '003', CATEGORYNAME: 'Category 3', DESCRIPTION: 'Description 3' }
        ]
      }

      // Filter categories based on search query across all columns
      const filteredCategories = dummyData.results.filter(category =>
        Object.values(category).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

      setCategories(filteredCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
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

  const handleOpenEdit = (category) => {
    setSelectedCategory(category)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setSelectedCategory(null)
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
    <MainCard title="Product Category List">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category SNO</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.Category_SNO}</TableCell>
                <TableCell>{category.CATEGORYNAME}</TableCell>
                <TableCell>{category.DESCRIPTION}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenEdit(category)}>
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
        count={categories.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CreateProductCategory open={openCreate} onClose={handleCloseCreate} />
      <EditProductCategory open={openEdit} onClose={handleCloseEdit} category={selectedCategory} />
    </MainCard>
  )
}

export default ListProductCategory