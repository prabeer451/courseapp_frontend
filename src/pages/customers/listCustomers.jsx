import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Collapse
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MainCard from 'components/MainCard'
import { getToken } from 'utils/auth'
import CreateCustomer from './createCustomer'
import EditCustomer from './editCustomer'

const ListCustomers = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [expandedCustomerId, setExpandedCustomerId] = useState(null)
  const token = getToken()

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = [
          { id: 1, name: 'Amit Kumar', email: 'amit@example.com', phone: '1234567890', address: '123 Main St', pincode: '12345', city: 'Mumbai', state: 'MH', country: 'India' },
          { id: 2, name: 'Ravi Sharma', email: 'ravi@example.com', phone: '1234567891', address: '456 Main St', pincode: '12346', city: 'Delhi', state: 'DL', country: 'India' },
          { id: 3, name: 'Suman Gupta', email: 'suman@example.com', phone: '1234567892', address: '789 Main St', pincode: '12347', city: 'Kolkata', state: 'WB', country: 'India' },
          { id: 4, name: 'Priya Singh', email: 'priya@example.com', phone: '1234567893', address: '101 Main St', pincode: '12348', city: 'Chennai', state: 'TN', country: 'India' },
          { id: 5, name: 'Vikas Patel', email: 'vikas@example.com', phone: '1234567894', address: '102 Main St', pincode: '12349', city: 'Ahmedabad', state: 'GJ', country: 'India' },
          { id: 6, name: 'Anjali Verma', email: 'anjali@example.com', phone: '1234567895', address: '103 Main St', pincode: '12350', city: 'Pune', state: 'MH', country: 'India' },
          { id: 7, name: 'Rajesh Mehta', email: 'rajesh@example.com', phone: '1234567896', address: '104 Main St', pincode: '12351', city: 'Jaipur', state: 'RJ', country: 'India' },
          { id: 8, name: 'Neha Agarwal', email: 'neha@example.com', phone: '1234567897', address: '105 Main St', pincode: '12352', city: 'Lucknow', state: 'UP', country: 'India' },
          { id: 9, name: 'Manish Joshi', email: 'manish@example.com', phone: '1234567898', address: '106 Main St', pincode: '12353', city: 'Bhopal', state: 'MP', country: 'India' },
          { id: 10, name: 'Kavita Rao', email: 'kavita@example.com', phone: '1234567899', address: '107 Main St', pincode: '12354', city: 'Hyderabad', state: 'TG', country: 'India' }
        ];
        setCustomers(data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [token])

  const handleAccordionChange = (customerId) => {
    setExpandedCustomerId(expandedCustomerId === customerId ? null : customerId)
  }

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer)
    setEditDialogOpen(true)
  }

  const handleCustomerUpdated = (updatedCustomer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c))
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
    <MainCard title={<h1>Customers</h1>}>      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Create Customer
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <React.Fragment key={customer.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleAccordionChange(customer.id)}
                    >
                      {expandedCustomerId === customer.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditCustomer(customer)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedCustomerId === customer.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Customer Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableBody>
                            <TableRow>
                              <TableCell>Address:</TableCell>
                              <TableCell>{customer.address}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>City:</TableCell>
                              <TableCell>{customer.city}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Pincode:</TableCell>
                              <TableCell>{customer.pincode}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>State:</TableCell>
                              <TableCell>{customer.state}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Country:</TableCell>
                              <TableCell>{customer.country}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <Button variant="contained" color="secondary" onClick={() => navigate(`/customers/${customer.id}/products`)}>
                          View Products
                        </Button>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateCustomer
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCustomerCreated={(newCustomer) => {
          setCustomers([...customers, newCustomer])
          setDialogOpen(false)
        }}
      />
      <EditCustomer
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onCustomerUpdated={handleCustomerUpdated}
      />
    </MainCard>
  )
}

export default ListCustomers