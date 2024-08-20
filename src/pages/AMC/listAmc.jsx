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
        { id: 1, AMC_NAME: 'Basic Plan', CHARGES: '1000', DURATION: '12 months', LINKED_SERVICES: [{ id: 1, SERVICE_NAME: 'Service 1' }, { id: 2, SERVICE_NAME: 'Service 2' }], LINKED_PARTS: ['Part 1', 'Part 2'], FREQUENCY_DETAILS: { 1: { DESCRIPTION: 'Monthly', INTERVAL_MONTHS: 1 }, 2: { DESCRIPTION: 'Quarterly', INTERVAL_MONTHS: 3 } } },
        { id: 2, AMC_NAME: 'Premium Plan', CHARGES: '2000', DURATION: '24 months', LINKED_SERVICES: [{ id: 3, SERVICE_NAME: 'Service 3' }, { id: 4, SERVICE_NAME: 'Service 4' }], LINKED_PARTS: ['Part 3', 'Part 4'], FREQUENCY_DETAILS: { 3: { DESCRIPTION: 'Yearly', INTERVAL_MONTHS: 12 }, 4: { DESCRIPTION: 'Bi-annually', INTERVAL_MONTHS: 6 } } },
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
    <MainCard title={<h1>Service Contracts</h1>}>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Create Service Contract
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Service Contract Name</TableCell>
              <TableCell>Charges</TableCell>
              <TableCell>Duration</TableCell>
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
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedAmcId === amc.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Service Contract Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Service</TableCell>
                              <TableCell>Frequency</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {amc.LINKED_SERVICES.map((service) => (
                              <TableRow key={service.id}>
                                <TableCell>{service.SERVICE_NAME}</TableCell>
                                <TableCell>{amc.FREQUENCY_DETAILS[service.id] ? `${amc.FREQUENCY_DETAILS[service.id].DESCRIPTION} (Every ${amc.FREQUENCY_DETAILS[service.id].INTERVAL_MONTHS} months)` : 'N/A'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Table size="small" aria-label="purchases" sx={{ mt: 2 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Linked Parts</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{amc.LINKED_PARTS.join(', ')}</TableCell>
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
