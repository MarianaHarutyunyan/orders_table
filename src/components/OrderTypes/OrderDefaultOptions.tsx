import React, { FC } from "react";
import { Control, UseFormRegister } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Grid,
  styled,
  InputAdornment,
} from "@mui/material";
import { CountryController } from "./CountryController.tsx";
import { Order } from "../../type.ts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface OrderDefaultOptionsProps {
  register: UseFormRegister<Order>;
  control: Control<Order, any>;
  darkMode: boolean;
}

const StyledTextField = styled(TextField)({
  "& input::-webkit-calendar-picker-indicator": {
    display: "none",
  },
  "& input": {
    appearance: "none",
    MozAppearance: "textfield",
    WebkitAppearance: "none",
  },
});

export const OrderDefaultOptions: FC<OrderDefaultOptionsProps> = ({
  register,
  control,
  darkMode,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CountryController control={control} name="pickupCountry" />

          <TextField
            fullWidth
            size="small"
            label="Pickup Address"
            {...register("pickupAddress", { required: true })}
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="Postal Code"
            {...register("pickupPostalCode", { required: true })}
            variant="standard"
            sx={{ mt: 0.3 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CountryController control={control} name="shippingCountry" />

          <TextField
            fullWidth
            size="small"
            label="Shipping Address"
            {...register("shippingAddress", { required: true })}
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="Postal Code"
            {...register("shippingPostalCode", { required: true })}
            variant="standard"
            sx={{ mt: 0.3 }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" mt={1}>
        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            type="time"
            size="small"
            label="From"
            margin="dense"
            {...register("timeFrom", { required: true })}
            variant="standard"
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTimeIcon
                      sx={{
                        color: darkMode ? "#fff" : "#000",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            type="time"
            size="small"
            label="To"
            margin="dense"
            {...register("timeTo", { required: true })}
            variant="standard"
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTimeIcon
                      sx={{
                        color: darkMode ? "#fff" : "#000",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            size="small"
            label="Shipping Cost"
            type="number"
            {...register("shippingCost", { required: true })}
            margin="dense"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            size="small"
            label="Currency"
            {...register("currency", { required: true })}
            margin="dense"
            variant="standard"
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <TextField
        fullWidth
        size="small"
        label="Order Details"
        {...register("orderDetails", { required: false })}
        margin="dense"
        variant="standard"
      />
    </>
  );
};
