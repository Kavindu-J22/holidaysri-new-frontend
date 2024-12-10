import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await axios.get("https://holidaysri-backend-9xm4.onrender.com/earnings");
        setRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
        setLoading(false);
        alert("Error fetching records: " + error.message);
      }
    }

    fetchRecords();
  }, []);

  return (
    <div>
      <h1>All Records</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Adjust column headers based on your record structure */}
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                {/* Add more table headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  {/* Adjust cell values based on your record structure */}
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  {/* Add more table cells as needed */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default RecordsPage;
