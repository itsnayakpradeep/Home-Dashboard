import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { fetchCategories, fetchProducts } from './api';
import PieChart from './charts/PieChart';
import ColumnBarChart from './charts/ColumnBarChart';
import { Category, Product } from './types';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isRunReportDisabled, setIsRunReportDisabled] = useState(true);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory).then((data) => setSelectedProducts(data));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedProducts([]);
    setIsRunReportDisabled(true);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productName = event.target.value;
    const selectedProduct = selectedProducts.find((product) => product.title === productName);
    if (selectedProduct) {
      setSelectedProducts([selectedProduct]);
      setIsRunReportDisabled(selectedProducts.length < 4);
    }
  };

  const handleRunReportClick = () => {
    setIsRunReportDisabled(true);
  };

  const handleClear = () => {
    setSelectedProducts([]);
    setSelectedCategory(null);
    setSelectedProducts([]);
  };
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography align="center" variant="h4" component="h1" gutterBottom>
          Product Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <Typography align='left' variant="h5">Filter</Typography>
          
            <FormControl fullWidth>
              <FormLabel>Category</FormLabel>
              <Select
                defaultValue={selectedCategory || ''}
                onChange={handleCategoryChange as any}
                disabled={!categories.length}
              >
                <MenuItem value="">Select a category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.title} value={category.title}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button 
              color="primary"
              onClick={handleClear}
            >
              Clear
            </Button>
            <FormControl fullWidth>
              <FormLabel>Product</FormLabel>
              <Select
                defaultValue={selectedProducts.length ? selectedProducts[0].title : ''}
                onChange={handleProductChange as any}
                disabled={!selectedCategory}
              >
                <MenuItem value="">Select a product</MenuItem>
                {selectedProducts.map((product) => (
                  <MenuItem key={product.id} value={product.title}>
                    {product.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={isRunReportDisabled}
              onClick={handleRunReportClick}
            >
              Run Report
            </Button>
            
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' variant="h5">Product Sales</Typography>
          </Grid>
          <Grid item xs={12}>
            {selectedProducts.length > 0 && (
              <Box mt={4}>
                {/* {isRunReportDisabled && selectedProducts.length === 1 ? (
                  <ColumnBarChart products={[selectedProducts[0]]} />
                ) : (
                  <PieChart categories={categories} />
                )} */}

                {isRunReportDisabled && selectedProducts.length === 1 ? (
                    <ColumnBarChart products={[selectedProducts[0]]} />
                  ) : isRunReportDisabled && selectedProducts.length === 4 ? (
                    <ColumnBarChart products={[selectedProducts[4]]} />
                  ) : (
                    <PieChart categories={categories} />
                  )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;