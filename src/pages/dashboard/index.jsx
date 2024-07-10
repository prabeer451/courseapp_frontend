import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

// project import
import MainCard from 'components/MainCard';
import { getToken } from 'utils/auth';
// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

export default function DashboardDefault() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/courses/', {
          headers: {
             Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Function to group products into rows of 4
  const groupProductsIntoRows = (products, productsPerRow = 4) => {
    return products.reduce((rows, product, index) => {
      if (index % productsPerRow === 0) rows.push([]);
      rows[rows.length - 1].push(product);
      return rows;
    }, []);
  };

  const productRows = groupProductsIntoRows(products);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12}>
        <Typography variant="h5" sx={{ mb: 2 }}>Featured Products</Typography>
        <Box>
          {productRows.map((row, rowIndex) => (
            <Grid container spacing={3} key={rowIndex} sx={{ mb: 3 }}>
              {row.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <MainCard>
                    <img
                      src={product.image_link}
                      alt={product.title}
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                    />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Button component={RouterLink} to={`/course/${product.id}/study`} variant="contained" color="primary" sx={{ mr: 2 }}>
                      Study Course
                    </Button>
                    <Button
                      component={RouterLink}
                      to={`/course/${product.id}`}
                      variant="contained"
                      color="primary"
                    >
                      Take Test
                    </Button>
                  </MainCard>
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
