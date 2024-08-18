import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField
} from '@mui/material'

const ServiceFrequencyModal = ({ open, onClose, services, serviceFrequencies, onSave }) => {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedFrequency, setSelectedFrequency] = useState(null)

  const handleSave = () => {
    if (selectedService && selectedFrequency) {
      onSave(selectedService, selectedFrequency)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Select Service and Frequency</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={services}
            getOptionLabel={(option) => option.SERVICE_NAME}
            renderInput={(params) => <TextField {...params} label="Service" />}
            onChange={(event, newValue) => setSelectedService(newValue)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={serviceFrequencies}
            getOptionLabel={(option) => `${option.DESCRIPTION} (Every ${option.INTERVAL_MONTHS} months)`}
            renderInput={(params) => <TextField {...params} label="Frequency" />}
            onChange={(event, newValue) => setSelectedFrequency(newValue)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ServiceFrequencyModal
