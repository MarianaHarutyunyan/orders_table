import React, { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Tooltip,
  TablePagination,
  TextField,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Order } from "../type";

interface OrdersTableProps {
  orders: Order[] | null;
  setSelectedLead: (val: Order | null) => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  darkMode: boolean;
}

export const OrderTable: FC<OrdersTableProps> = ({
  orders,
  setSelectedLead,
  setOrders,
  darkMode,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleDeleteOrder = (orderId: number) => {
    const updatedOrders =
      orders?.filter((order: Order) => order.id !== orderId) || [];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const filteredOrders = orders?.filter(
    (order: Order) =>
      order?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.pickupCountry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.shippingCountry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedOrders =
    filteredOrders?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ) || [];

  return (
    <Paper sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
      <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "300px" }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Direction</strong>
              </TableCell>
              <TableCell>
                <strong>Lead Info</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>
                  {order?.pickupCountry} - {order?.shippingCountry}
                </TableCell>
                <TableCell>
                  <Tooltip title="View Lead Info">
                    <Button
                      aria-label="Details"
                      onClick={() => setSelectedLead(order)}
                      startIcon={<AccountCircleIcon />}
                      sx={{
                        minWidth: "auto",
                        color: darkMode ? "white" : "GrayText",
                      }}
                    >
                      <Typography
                        variant="body2"
                        textTransform="none"
                        sx={{ color: darkMode ? "white" : "GrayText" }}
                      >
                        Details
                      </Typography>
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete Order">
                    <Button
                      aria-label="Delete"
                      onClick={() => handleDeleteOrder(order?.id)}
                      startIcon={<DeleteIcon />}
                      sx={{
                        minWidth: "auto",
                        color: darkMode ? "white" : "GrayText",
                      }}
                    ></Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
