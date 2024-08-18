import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ViewAMC = ({ open, onClose, amcId }) => {
  const navigate = useNavigate()
  const [amcData, setAMCData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  useEffect(() => {
    const fetchAMCData = async () => {
      setIsLoading(true)
      try {
        // const response = await fetch(`http://127.0.0.1:8000/api/amc/${amcId}/`, {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        //   }
        // })

        // if (!response.ok) {
        //   throw new Error('Failed to fetch AMC details')
        // }

        // const result = await response.json()
        const result = {
          AMC_NAME: "Dummy AMC",
          CHARGES: "1000",
          DURATION: "12 months",
          LINKED_SERVICES: [
            { id: 1, SERVICE_NAME: "Service 1", FREQUENCY: "Monthly" },
            { id: 2, SERVICE_NAME: "Service 2", FREQUENCY: "Quarterly" }
          ],
          LINKED_PARTS: [
            { id: 1, PART_CODE: "Part 1" },
            { id: 2, PART_CODE: "Part 2" }
          ]
        }
        setAMCData(result)
      } catch (error) {
        console.error('Error fetching AMC details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAMCData()
  }, [amcId, token])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>View AMC Plan</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          amcData && (
            <Box>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>AMC Name</TableCell>
                      <TableCell>{amcData.AMC_NAME}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Charges</TableCell>
                      <TableCell>{amcData.CHARGES}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Duration</TableCell>
                      <TableCell>{amcData.DURATION}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Linked Services</TableCell>
                      <TableCell>
                        {amcData.LINKED_SERVICES.map(service => (
                          <div key={service.id}>{service.SERVICE_NAME} - {service.FREQUENCY}</div>
                        ))}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Linked Parts</TableCell>
                      <TableCell>
                        {amcData.LINKED_PARTS.map(part => (
                          <div key={part.id}>{part.PART_CODE}</div>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                  Close
                </Button>
              </Box>
            </Box>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ViewAMC
