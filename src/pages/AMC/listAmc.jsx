import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Collapse
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MainCard from 'components/MainCard';
import { getToken } from 'utils/auth';
import CreateAMC from './createAmc';

const ListAMC = () => {
  const [amcPlans, setAmcPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedAmcId, setExpandedAmcId] = useState(null);
  const token = getToken();

  useEffect(() => {
    fetchAMCPlans();
  }, [token]);

  const fetchAMCPlans = async () => {
    try {
      // Replace this with your actual API call
      const data = [
        { id: 1, AMC_NAME: 'Basic Plan', CHARGES: '1000', DURATION: '12 months', AMC_TYPE: 'Gold', LINKED_SERVICES: ['Service 1', 'Service 2'], LINKED_PARTS: ['Part 1', 'Part 2'], FREQUENCY_DETAILS: { 1: 'Monthly', 2: 'Quarterly' } },
        { id: 2, AMC_NAME: 'Premium Plan', CHARGES: '2000', DURATION: '24 months', AMC_TYPE: 'Platinum', LINKED_SERVICES: ['Service 3', 'Service 4'], LINKED_PARTS: ['Part 3', 'Part 4'], FREQUENCY_DETAILS: { 3: 'Yearly', 4: 'Bi-annually' } },
      ];
      setAmcPlans(data);
    } catch (error) {
      console.error('Error fetching AMC plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccordionChange = (amcId) => {
    setExpandedAmcId(expandedAmcId === amcId ? null : amcId);
  };

  return (
    <MainCard title={<h1>AMC Plans</h1>}>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Create AMC Plan
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>AMC Name</TableCell>
              <TableCell>Charges</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amcPlans.map((amc) => (
              <React.Fragment key={amc.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleAccordionChange(amc.id)}
                    >
                      {expandedAmcId === amc.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{amc.AMC_NAME}</TableCell>
                  <TableCell>{amc.CHARGES}</TableCell>
                  <TableCell>{amc.DURATION}</TableCell>
                  <TableCell>{amc.AMC_TYPE}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedAmcId === amc.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          AMC Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableBody>
                            <TableRow>
                              <TableCell>Linked Services:</TableCell>
                              <TableCell>{amc.LINKED_SERVICES.join(', ')}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Linked Parts:</TableCell>
                              <TableCell>{amc.LINKED_PARTS.join(', ')}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Frequency Details:</TableCell>
                              <TableCell>{JSON.stringify(amc.FREQUENCY_DETAILS)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateAMC
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          fetchAMCPlans(); // Refresh the list after creating a new AMC
        }}
      />
    </MainCard>
  );
};

export default ListAMC;
