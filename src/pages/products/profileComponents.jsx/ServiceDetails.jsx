import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const ServiceDetails = () => {
    const products = [
        { description: 'Service 1', serviceCost: 100, serviceDetails: 'Details of Service 1' },
        { description: 'Service 2', serviceCost: 200, serviceDetails: 'Details of Service 2' },
        { description: 'Service 3', serviceCost: 300, serviceDetails: 'Details of Service 3' }
    ]

    return (
        <div className="service-details-card">
            <h2>Service Details</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>${product.serviceCost}</TableCell>
                                <TableCell>{product.serviceDetails}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ServiceDetails
