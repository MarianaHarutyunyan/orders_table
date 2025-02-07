import React, { useEffect, useState } from "react";
import {
  Button,
  Switch,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Typography,
  Box,
} from "@mui/material";
import { NewOrderDialog } from "./NewOrderDialog.tsx";
import { OrderTable } from "./OrderTable.tsx";
import { LeadDetailsPage } from "./LeadDetailsPage.tsx";
import { Order } from "../type";

export const Main = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
          setOrders(parsedOrders);
          return;
        }
      } catch (error) {
        console.error("Error parsing orders from localStorage:", error);
      }
    }

    fetch("/orders.json")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        localStorage.setItem("orders", JSON.stringify(data));
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h5">Orders</Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDialogVisible(true)}
              size="medium"
              sx={{ fontSize: "14px", textTransform: "none" }}
            >
              Add Order
            </Button>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Box>
        </Box>

        <OrderTable
          orders={orders}
          setSelectedLead={setSelectedLead}
          setOrders={setOrders}
          darkMode={darkMode}
        />

        <LeadDetailsPage
          selectedLead={selectedLead}
          setSelectedLead={setSelectedLead}
        />
      </Box>

      <NewOrderDialog
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        orders={orders}
        setOrders={setOrders}
        darkMode={darkMode}
      />
    </ThemeProvider>
  );
};
