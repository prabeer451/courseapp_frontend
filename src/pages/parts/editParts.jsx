import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl
} from '@mui/material'
import { getToken } from 'utils/auth'

const EditPart = ({ part }) => {
  const navigate = useNavigate()
  const [partData, setPartData] = useState({
    S_NO: '',
    PART_CODE: '',
    ITEM_DESCRIPTION: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const token = getToken()

  useEffect(() => {
    if (part) {
      setPartData({
        S_NO: part.S_NO,
        PART_CODE: part.PART_CODE,
        ITEM_DESCRIPTION: part.ITEM_DESCRIPTION
      })
    }
  }, [part])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPartData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/parts/${part.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(partData)
      })

      if (!response.ok) {
        throw new Error('Failed to update part')
      }

      const result = await response.json()
      console.log('Part updated successfully:', result)
      navigate(`/parts`)
    } catch (error) {
      console.error('Error updating part:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={Boolean(part)} onClose={() => navigate(`/parts`)} fullWidth maxWidth="sm">
      <DialogTitle>Edit Part</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="S_NO"
              name="S_NO"
              value={partData.S_NO}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="PART_CODE"
              name="PART_CODE"
              value={partData.PART_CODE}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="ITEM_DESCRIPTION"
              name="ITEM_DESCRIPTION"
              value={partData.ITEM_DESCRIPTION}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate(`/parts`)}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EditPart
