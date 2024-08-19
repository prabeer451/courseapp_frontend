import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Grid,
  Paper
} from '@mui/material'
import { Autocomplete } from '@mui/material'
import { getToken } from 'utils/auth'

const ViewComplaintDetails = ({ open, onClose }) => {
  const { complaintId } = useParams()
  const [complaintDetails, setComplaintDetails] = useState(null)
  const [productDetails, setProductDetails] = useState(null)
  const [amcDetails, setAmcDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const token = getToken()

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const data = {
          description: "Sample complaint description",
          productId: "12345"
        }
        setComplaintDetails(data)
        fetchProductDetails(data.productId)
        fetchAmcDetails(data.productId)
      } catch (error) {
        console.error('Error fetching complaint details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchProductDetails = async (productId) => {
      try {
        const data = {
          Product_SNO: "P123456",
          SAGECODE: "SC123",
          PRODUCTNAME: "Sample Product",
          CATEGORY: "Sample Category",
          ProductType: "Sample Type"
        }
        setProductDetails(data)
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    const fetchAmcDetails = async (productId) => {
      try {
        const data = {
          service: { SERVICE_NAME: "Sample Service" },
          frequency: { DESCRIPTION: "Sample Frequency", INTERVAL_MONTHS: 6 }
        }
        setAmcDetails(data)
      } catch (error) {
        console.error('Error fetching AMC details:', error)
      }
    }

    fetchComplaintDetails()
  }, [complaintId, token])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Complaint Details</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {complaintDetails && (
              <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h3"><b>Complaint Description</b></Typography>
                <Typography><b>Description:</b> {complaintDetails.description}</Typography>
              </Paper>
            )}
            {productDetails && (
              <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h3"><b>Product Details</b></Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><b>Product SNO:</b> {productDetails.Product_SNO}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><b>SAGECODE:</b> {productDetails.SAGECODE}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><b>Product Name:</b> {productDetails.PRODUCTNAME}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><b>Category:</b> {productDetails.CATEGORY}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><b>Product Type:</b> {productDetails.ProductType}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
            {amcDetails && (
              <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h3"><b>AMC Details</b></Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><b>Service:</b> {amcDetails.service.SERVICE_NAME}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><b>Frequency:</b> {amcDetails.frequency.DESCRIPTION} (Every {amcDetails.frequency.INTERVAL_MONTHS} months)</Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ViewComplaintDetails
