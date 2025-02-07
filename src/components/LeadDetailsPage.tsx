import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { Order } from "../type";

interface LeadDetailsPageProps {
  selectedLead: Order | null;
  setSelectedLead: (val: Order | null) => void;
}

export const LeadDetailsPage: FC<LeadDetailsPageProps> = ({
  selectedLead,
  setSelectedLead,
}) => {
  return (
    <Dialog open={!!selectedLead} onClose={() => setSelectedLead(null)}>
      <DialogTitle>Lead Information</DialogTitle>
      <DialogContent>
        {selectedLead && (
          <Box>
            <Typography p={1}>Name: {selectedLead?.lead?.name}</Typography>
            <Typography p={1}>Email: {selectedLead?.lead?.email}</Typography>
            <Typography p={1}>Phone: {selectedLead?.lead?.phone}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={() => setSelectedLead(null)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
