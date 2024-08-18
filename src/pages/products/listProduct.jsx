import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Link,
  Card,
  CardContent,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import MainCard from 'components/MainCard';
import { getToken } from 'utils/auth';
import CreateProduct from './createProduct';
import EditProduct from 'src/pages/products/productCategory/editProductCategory';
import CreateProductType from 'src/pages/products/productType/createProductType';
import CreateProductCategory from 'src/pages/products/productCategory/createProductCategory';
import ProductAmcMapping from 'src/pages/products/productAmcMapping';
import WarrantyMapping from 'src/pages/products/productWarrantyMapping'; // Import WarrantyMapping

const ListProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openCreateType, setOpenCreateType] = useState(false);
  const [openAmcMapping, setOpenAmcMapping] = useState(false);
  const [openWarrantyMapping, setOpenWarrantyMapping] = useState(false); // Add state for Warranty Mapping
  const token = getToken();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAmc, setAnchorElAmc] = useState(null);
  const [anchorElWarranty, setAnchorElWarranty] = useState(null); // Add state for Warranty menu

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage, searchQuery]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const dummyData = {
        results: [
          { id: 1, Product_SNO: '001', SAGECODE: 'SC001', PRODUCTNAME: 'Product 1', CATEGORY: 'Category 1', ProductType: 'Type 1' },
          { id: 2, Product_SNO: '002', SAGECODE: 'SC002', PRODUCTNAME: 'Product 2', CATEGORY: 'Category 2', ProductType: 'Type 2' },
          { id: 3, Product_SNO: '003', SAGECODE: 'SC003', PRODUCTNAME: 'Product 3', CATEGORY: 'Category 3', ProductType: 'Type 3' }
        ]
      };

      const filteredProducts = dummyData.results.filter(product =>
        Object.values(product).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedProduct(null);
  };

  const handleOpenCreateCategory = () => {
    setOpenCreateCategory(true);
    handleCloseMenu();
  };

  const handleCloseCreateCategory = () => {
    setOpenCreateCategory(false);
  };

  const handleOpenCreateType = () => {
    setOpenCreateType(true);
    handleCloseMenu();
  };

  const handleCloseCreateType = () => {
    setOpenCreateType(false);
  };

  const handleOpenAmcMapping = () => {
    setOpenAmcMapping(true);
    handleCloseAmcMenu();
  };

  const handleCloseAmcMapping = () => {
    setOpenAmcMapping(false);
  };

  const handleOpenWarrantyMapping = () => {
    setOpenWarrantyMapping(true);
    handleCloseWarrantyMenu();
  };

  const handleCloseWarrantyMapping = () => {
    setOpenWarrantyMapping(false);
  };

  const handleViewProfile = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenAmcMenu = (event) => {
    setAnchorElAmc(event.currentTarget);
  };

  const handleCloseAmcMenu = () => {
    setAnchorElAmc(null);
  };

  const handleOpenWarrantyMenu = (event) => {
    setAnchorElWarranty(event.currentTarget);
  };

  const handleCloseWarrantyMenu = () => {
    setAnchorElWarranty(null);
  };

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
    <MainCard title="Product List">
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Link
                component="button"
                variant="body2"
                onClick={handleOpenMenu}
              >
                Product Management
              </Link>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleOpenCreateCategory}>Create Product Category</MenuItem>
                <MenuItem onClick={handleOpenCreateType}>Create Product Type</MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Link
                component="button"
                variant="body2"
                onClick={handleOpenAmcMenu}
              >
                AMC/ARC/Warranty Management
              </Link>
              <Menu
                anchorEl={anchorElAmc}
                open={Boolean(anchorElAmc)}
                onClose={handleCloseAmcMenu}
              >
                <MenuItem onClick={handleOpenAmcMapping}>Map AMC with Product</MenuItem>
                <MenuItem onClick={handleOpenWarrantyMapping}>Map Warranty with Product</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product SNO</TableCell>
              <TableCell>SAGECODE</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Product Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.Product_SNO}</TableCell>
                <TableCell>{product.SAGECODE}</TableCell>
                <TableCell>
                  <Link href="#" onClick={() => handleViewProfile(product.id)}>
                    {product.PRODUCTNAME}
                  </Link>
                </TableCell>
                <TableCell>{product.CATEGORY}</TableCell>
                <TableCell>{product.ProductType}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenEdit(product)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleViewProfile(product.id)}>
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CreateProduct open={openCreate} onClose={handleCloseCreate} />
      <EditProduct open={openEdit} product={selectedProduct} onClose={handleCloseEdit} />
      <CreateProductCategory open={openCreateCategory} onClose={handleCloseCreateCategory} />
      <CreateProductType open={openCreateType} onClose={handleCloseCreateType} onSave={(newType) => {
        console.log('New Product Type:', newType);
        handleCloseCreateType();
      }} />
      <ProductAmcMapping open={openAmcMapping} onClose={handleCloseAmcMapping} />
      <WarrantyMapping open={openWarrantyMapping} onClose={handleCloseWarrantyMapping} />
    </MainCard>
  );
};

export default ListProduct;
