import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

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
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React development",
      imageUrl: "https://example.com/react-course.jpg"
    },
    {
      id: 2,
      title: "Advanced JavaScript Techniques",
      description: "Master advanced concepts in JavaScript",
      imageUrl: "https://example.com/javascript-course.jpg"
    },
    {
      id: 3,
      title: "Web Design Fundamentals",
      description: "Explore the principles of effective web design",
      imageUrl: "https://example.com/web-design-course.jpg"
    },
    {
      id: 4,
      title: "Python for Data Science",
      description: "Get started with Python for data analysis",
      imageUrl: "https://example.com/python-course.jpg"
    },
    // Add more products to create multiple rows
    {
      id: 5,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts",
      imageUrl: "https://example.com/ml-course.jpg"
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Learn to build mobile apps for iOS and Android",
      imageUrl: "https://example.com/mobile-dev-course.jpg"
    },
    {
      id: 7,
      title: "Database Management",
      description: "Master SQL and database design",
      imageUrl: "https://example.com/database-course.jpg"
    },
    {
      id: 8,
      title: "Cloud Computing",
      description: "Explore cloud technologies and services",
      imageUrl: "https://example.com/cloud-course.jpg"
    },
    {
      id: 9,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts",
      imageUrl: "https://example.com/ml-course.jpg"
    },
    {
      id: 10,
      title: "Mobile App Development",
      description: "Learn to build mobile apps for iOS and Android",
      imageUrl: "https://example.com/mobile-dev-course.jpg"
    },
    {
      id: 11,
      title: "Database Management",
      description: "Master SQL and database design",
      imageUrl: "https://example.com/database-course.jpg"
    },
    {
      id: 12,
      title: "Cloud Computing",
      description: "Explore cloud technologies and services",
      imageUrl: "https://example.com/cloud-course.jpg"
    }
  ]);

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
                      src={product.imageUrl}
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
