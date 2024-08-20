import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
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
import EditPart from './editParts'
import CreatePart from './createParts'

const ListParts = () => {
  const navigate = useNavigate()
  const [parts, setParts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [selectedPart, setSelectedPart] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const token = getToken()

  useEffect(() => {
    fetchParts()
  }, [page, rowsPerPage, searchQuery])

  const fetchParts = async () => {
    setIsLoading(true)
    try {
      const dummyData = {
        results: [
          { id: 1, S_NO: '001', PART_CODE: 'PC001', ITEM_DESCRIPTION: 'Part 1 Description', WARRANTY_PERIOD: '1 Month', DP: '100', MRP: '150' },
          { id: 2, S_NO: '002', PART_CODE: 'PC002', ITEM_DESCRIPTION: 'Part 2 Description', WARRANTY_PERIOD: '2 Months', DP: '200', MRP: '250' },
          { id: 3, S_NO: '003', PART_CODE: 'PC003', ITEM_DESCRIPTION: 'Part 3 Description', WARRANTY_PERIOD: '3 Months', DP: '300', MRP: '350' }
        ]
      }

      const filteredParts = dummyData.results.filter(part =>
        Object.values(part).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

      setParts(filteredParts)
    } catch (error) {
      console.error('Error fetching parts:', error)
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

  const handleOpenEdit = (part) => {
    setSelectedPart(part)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setSelectedPart(null)
  }

  const handleOpenCreate = () => {
    setOpenCreate(true)
  }

  const handleCloseCreate = () => {
    setOpenCreate(false)
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
    <MainCard title="Parts List">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Add Part
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S_NO</TableCell>
              <TableCell>PART SKU</TableCell>
              <TableCell>ITEM_DESCRIPTION</TableCell>
              <TableCell>WARRANTY_PERIOD</TableCell>
              <TableCell>DP</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((part) => (
              <TableRow key={part.id}>
                <TableCell>{part.S_NO}</TableCell>
                <TableCell>{part.PART_CODE}</TableCell>
                <TableCell>{part.ITEM_DESCRIPTION}</TableCell>
                <TableCell>{part.WARRANTY_PERIOD}</TableCell>
                <TableCell>{part.DP}</TableCell>
                <TableCell>{part.MRP}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenEdit(part)}>
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
        count={parts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditPart part={selectedPart} open={openEdit} onClose={handleCloseEdit} />
      <CreatePart open={openCreate} onClose={handleCloseCreate} />
    </MainCard>
  )
}

export default ListParts
