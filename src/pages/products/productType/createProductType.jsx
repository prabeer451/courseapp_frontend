import React, { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material'

const CreateProductType = ({ open, onClose, onSave }) => {
    const [typeName, setTypeName] = useState('')
    const [description, setDescription] = useState('')

    const handleSave = () => {
      const newType = {
        name: typeName,
        description: description,
      }
      onSave(newType)
      onClose()
    }

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Product Type</DialogTitle>
        <DialogContent>
          <Box component="form">
            <TextField
              label="Type Name"
              name="typeName"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    )
}

export default CreateProductType
