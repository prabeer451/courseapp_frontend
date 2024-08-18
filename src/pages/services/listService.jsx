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
import EditService from './editService'
import CreateService from './createService'

const ListServices = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const token = getToken()

  useEffect(() => {
    fetchServices()
  }, [page, rowsPerPage, searchQuery])

  const fetchServices = async () => {
    setIsLoading(true)
    try {
      const dummyData = {
        results: [
          { id: 1, SERVICE_NAME: 'Service 1', TERMS_OF_SERVICE: 'Terms 1', CHARGES: '100' },
          { id: 2, SERVICE_NAME: 'Service 2', TERMS_OF_SERVICE: 'Terms 2', CHARGES: '200' },
          { id: 3, SERVICE_NAME: 'Service 3', TERMS_OF_SERVICE: 'Terms 3', CHARGES: '300' }
        ]
      }

      const filteredServices = dummyData.results.filter(service =>
        Object.values(service).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

      setServices(filteredServices)
    } catch (error) {
      console.error('Error fetching services:', error)
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

  const handleOpenEdit = (service) => {
    setSelectedService(service)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setSelectedService(null)
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
    <MainCard title="Services List">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Add Service
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SERVICE_NAME</TableCell>
              <TableCell>TERMS_OF_SERVICE</TableCell>
              <TableCell>CHARGES</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.SERVICE_NAME}</TableCell>
                <TableCell>{service.TERMS_OF_SERVICE}</TableCell>
                <TableCell>{service.CHARGES}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenEdit(service)}>
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
        count={services.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditService service={selectedService} open={openEdit} onClose={handleCloseEdit} />
      <CreateService open={openCreate} onClose={handleCloseCreate} />
    </MainCard>
  )
}

export default ListServices
