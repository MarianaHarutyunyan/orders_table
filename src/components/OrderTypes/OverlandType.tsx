import React, { FC } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { Order } from "../../type.ts";

interface OverlandTypeProps {
  register: UseFormRegister<Order>;
  watch: UseFormWatch<Order>;
}

export const OverlandType: FC<OverlandTypeProps> = ({ register, watch }) => {
  const adrEnabled = watch("adr");
  const temperatureEnabled = watch("temperature");

  return (
    <>
      <TextField
        fullWidth
        size="small"
        label="Car Type"
        {...register("carType", { required: true })}
        margin="dense"
        variant="standard"
      />
      <FormControlLabel
        control={<Checkbox {...register("temperature")} />}
        label="Temperature"
        sx={{ mt: 1 }}
      />
      {temperatureEnabled && (
        <TextField
          fullWidth
          size="small"
          label="Temperature (°C)"
          type="number"
          {...register("temperatureValue", { required: true })}
          variant="standard"
        />
      )}
      <TextField
        fullWidth
        size="small"
        label="Freight Transportation Conditions"
        {...register("transportationDetails")}
        variant="standard"
        sx={{ mb: 1 }}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField
            select
            fullWidth
            size="small"
            label="Package Size"
            {...register("packageSize", { required: true })}
            variant="standard"
          >
            <MenuItem value="120x80">120x80</MenuItem>
            <MenuItem value="100x60">100x60</MenuItem>
            <MenuItem value="140x90">140x90</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            size="small"
            label="Quantity"
            type="number"
            {...register("quantity", { required: true })}
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            size="small"
            label="Height (m)"
            type="number"
            {...register("height", { required: true })}
            variant="standard"
          />
        </Grid>
      </Grid>
      <TextField
        fullWidth
        size="small"
        label="Weight (kg)"
        type="number"
        margin="dense"
        {...register("weight", { required: true })}
        variant="standard"
      />
      <FormControlLabel
        control={<Checkbox {...register("adr")} />}
        label="ADR"
        sx={{ mt: 1 }}
      />
      {adrEnabled && (
        <TextField
          fullWidth
          size="small"
          label="ADR Value"
          type="number"
          {...register("adrValue", { required: true })}
          variant="standard"
          margin="dense"
          sx={{ mt: 0, mb: 2 }}
        />
      )}
    </>
  );
};
