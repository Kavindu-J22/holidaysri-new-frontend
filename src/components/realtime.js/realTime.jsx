import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import axios from "axios";

const FilterableCardView = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial component mount

  useEffect(() => {
    filterData();
  }, [filter, data]); // Re-filter data when filter or data changes

  const fetchData = async () => {
    try {
      const response = await axios.get("your_api_endpoint_here");
      setData(response.data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = () => {
    if (filter === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.status === filter);
      setFilteredData(filtered);
    }
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Filterable Card View
      </Typography>
      <TextField
        select
        label="Filter by Status"
        value={filter}
        onChange={handleChangeFilter}
        fullWidth
        margin="normal"
        variant="outlined"
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </TextField>
      <Grid container spacing={2}>
        {filteredData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Box
              sx={{
                border: 1,
                borderRadius: 2,
                padding: 2,
                borderColor: "primary.main"
              }}
            >
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1" color="textSecondary">
                Status: {item.status}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilterableCardView;
