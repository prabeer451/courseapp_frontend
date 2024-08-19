import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { getToken } from 'utils/auth';
import CreateCustomer from '../customers/createCustomer';
import CreateProduct from '../products/createProduct';
import ExpandableTable from 'components/ExpandableTable';
import ViewComplaintDetails from './viewComplaintDetails';

const ListComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = [
          { id: 1, customerName: 'Amit Kumar', complaint: 'Product not working', details: 'The product stopped working after a week.', productId: 1 },
          { id: 2, customerName: 'Ravi Sharma', complaint: 'Late delivery', details: 'The product was delivered 3 days late.', productId: 2 },
          // Add more dummy data as needed
        ];
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, [token]);

  const columns = [
    { field: 'customerName', headerName: 'Customer Name' },
    { field: 'complaint', headerName: 'Complaint' }
  ];

  const detailsRenderer = (complaint) => (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Complaint Details
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        {complaint.details}
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => navigate(`/products/${complaint.productId}`)}>
        View Product
      </Button>
    </>
  );

  const actionsRenderer = (complaint) => (
    <Button variant="contained" color="primary" onClick={() => setSelectedComplaint(complaint)}>
      View Details
    </Button>
  );

  if (isLoading) {
    return (
      <MainCard title="Loading...">
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard title={<h1>Customer Complaints</h1>}>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Create Complaint
        </Button>
      </Box>
      <ExpandableTable data={complaints} columns={columns} detailsRenderer={detailsRenderer} actionsRenderer={actionsRenderer} />
      <CreateCustomer
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCustomerCreated={(newCustomer) => {
          // Handle new customer creation if needed
          setDialogOpen(false);
        }}
      />
      <CreateProduct
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onProductCreated={(newProduct) => {
          // Handle new product creation if needed
          setDialogOpen(false);
        }}
      />
      {selectedComplaint && (
        <ViewComplaintDetails
          open={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          complaintId={selectedComplaint.id}
        />
      )}
    </MainCard>
  );
};

export default ListComplaints;
