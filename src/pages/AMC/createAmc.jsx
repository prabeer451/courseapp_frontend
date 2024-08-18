import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material'
import { getToken } from 'utils/auth'
import ServiceFrequencyModal from './ServiceFrequencyModal'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const CreateAMC = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [amcData, setAMCData] = useState({
    AMC_NAME: '',
    CHARGES: '',
    DURATION: '',
    LINKED_SERVICES: [],
    LINKED_PARTS: [],
    FREQUENCY_DETAILS: {}
  })
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState([])
  const [parts, setParts] = useState([])
  const [serviceFrequencies, setServiceFrequencies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const token = getToken()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated API calls
        const servicesData = [{ id: 1, SERVICE_NAME: 'Service 1' }, { id: 2, SERVICE_NAME: 'Service 2' }]
        const partsData = [{ id: 1, PART_CODE: 'Part 1' }, { id: 2, PART_CODE: 'Part 2' }]
        const frequenciesData = [
          { id: 1, DESCRIPTION: 'Monthly', INTERVAL_MONTHS: 1 },
          { id: 2, DESCRIPTION: 'Quarterly', INTERVAL_MONTHS: 3 },
          { id: 3, DESCRIPTION: 'Yearly', INTERVAL_MONTHS: 12 }
        ]
        
        setServices(servicesData)
        setParts(partsData)
        setServiceFrequencies(frequenciesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAMCData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/amc/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(amcData)
      })

      if (!response.ok) {
        throw new Error('Failed to create AMC')
      }

      const result = await response.json()
      console.log('AMC created successfully:', result)
      navigate(`/amc`)
      onClose()
    } catch (error) {
      console.error('Error creating AMC:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddService = () => {
    setEditingService(null)
    setIsModalOpen(true)
  }

  const handleSaveServiceFrequency = (service, frequency) => {
    setAMCData(prevData => {
      const newLinkedServices = editingService
        ? prevData.LINKED_SERVICES.map(s => (s === editingService.id ? service.id : s))
        : [...prevData.LINKED_SERVICES, service.id]
      const newFrequencyDetails = {
        ...prevData.FREQUENCY_DETAILS,
        [service.id]: frequency.id
      }
      if (editingService) {
        delete newFrequencyDetails[editingService.id]
      }
      return {
        ...prevData,
        LINKED_SERVICES: newLinkedServices,
        FREQUENCY_DETAILS: newFrequencyDetails
      }
    })
  }

  const handleEditService = (serviceId) => {
    const service = services.find(s => s.id === serviceId)
    setEditingService(service)
    setIsModalOpen(true)
  }

  const handleDeleteService = (serviceId) => {
    setAMCData(prevData => {
      const newLinkedServices = prevData.LINKED_SERVICES.filter(s => s !== serviceId)
      const newFrequencyDetails = { ...prevData.FREQUENCY_DETAILS }
      delete newFrequencyDetails[serviceId]
      return {
        ...prevData,
        LINKED_SERVICES: newLinkedServices,
        FREQUENCY_DETAILS: newFrequencyDetails
      }
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create AMC Plan</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="AMC Name"
              name="AMC_NAME"
              value={amcData.AMC_NAME}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Charges"
              name="CHARGES"
              value={amcData.CHARGES}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Duration"
              name="DURATION"
              value={amcData.DURATION}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddService}>
              Add Service with Frequency
            </Button>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Service</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amcData.LINKED_SERVICES.map(serviceId => {
                    const service = services.find(s => s.id === serviceId)
                    const frequencyId = amcData.FREQUENCY_DETAILS[serviceId]
                    const frequency = serviceFrequencies.find(f => f.id === frequencyId)
                    return (
                      <TableRow key={serviceId}>
                        <TableCell>{service?.SERVICE_NAME}</TableCell>
                        <TableCell>{frequency ? `${frequency.DESCRIPTION} (Every ${frequency.INTERVAL_MONTHS} months)` : ''}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditService(serviceId)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteService(serviceId)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                multiple
                options={parts}
                getOptionLabel={(option) => option.PART_CODE}
                renderInput={(params) => <TextField {...params} label="Linked Parts" />}
                onChange={(event, newValue) => {
                  setAMCData(prevData => ({
                    ...prevData,
                    LINKED_PARTS: newValue.map(part => part.id)
                  }))
                }}
              />
            </FormControl>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" type="submit">
                Create AMC
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      <ServiceFrequencyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
        serviceFrequencies={serviceFrequencies}
        onSave={handleSaveServiceFrequency}
      />
    </Dialog>
  )
}

export default CreateAMC
