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

const CreateProductCategory = ({ open, onClose, onSave }) => {
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')

    const handleSave = () => {
        const newCategory = {
            name: categoryName,
            description: description,
        }
        onSave(newCategory)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create Product Category</DialogTitle>
            <DialogContent>
                <Box component="form">
                    <TextField
                        label="Category Name"
                        name="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
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

export default CreateProductCategory
