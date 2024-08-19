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
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'
import EditComplaintType from './editComplaintType'
import CreateComplaintType from './createComplaintType'

const ListComplaintType = () => {
  const navigate = useNavigate()
  const [complaintTypes, setComplaintTypes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [selectedComplaintType, setSelectedComplaintType] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const token = getToken()

  useEffect(() => {
    fetchComplaintTypes()
  }, [page, rowsPerPage, searchQuery])

  const fetchComplaintTypes = async () => {
    setIsLoading(true)
    try {
      const dummyData = {
        results: [
          { id: 1, TYPE_CODE: 'TC001', TYPE_DESCRIPTION: 'Type 1 Description' },
          { id: 2, TYPE_CODE: 'TC002', TYPE_DESCRIPTION: 'Type 2 Description' },
          { id: 3, TYPE_CODE: 'TC003', TYPE_DESCRIPTION: 'Type 3 Description' }
        ]
      }

      const filteredComplaintTypes = dummyData.results.filter(type =>
        Object.values(type).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

      setComplaintTypes(filteredComplaintTypes)
    } catch (error) {
      console.error('Error fetching complaint types:', error)
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

  const handleOpenEdit = (type) => {
    setSelectedComplaintType(type)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setSelectedComplaintType(null)
  }

  const handleOpenCreate = () => {
    setOpenCreate(true)
  }

  const handleCloseCreate = () => {
    setOpenCreate(false)
  }

  const handleOpenDeleteConfirm = (type) => {
    setSelectedComplaintType(type)
    setOpenDeleteConfirm(true)
  }

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false)
    setSelectedComplaintType(null)
  }

  const handleDelete = () => {
    // Add delete logic here
    setOpenDeleteConfirm(false)
    setSelectedComplaintType(null)
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
    <MainCard title="Complaint Types List">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Add Complaint Type
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TYPE_CODE</TableCell>
              <TableCell>TYPE_DESCRIPTION</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaintTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.TYPE_CODE}</TableCell>
                <TableCell>{type.TYPE_DESCRIPTION}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleOpenDeleteConfirm(type)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={complaintTypes.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditComplaintType complaintType={selectedComplaintType} open={openEdit} onClose={handleCloseEdit} />
      <CreateComplaintType open={openCreate} onClose={handleCloseCreate} />
      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      >
        <DialogTitle>Delete Complaint Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this complaint type?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  )
}

export default ListComplaintType
