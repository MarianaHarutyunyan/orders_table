import React, { FC } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Stack,
} from "@mui/material";
import { Order } from "../../type.ts";

interface AerialTypeProps {
  register: UseFormRegister<Order>;
  watch: UseFormWatch<Order>;
}

export const AerialType: FC<AerialTypeProps> = ({ register, watch }) => {
  const adrEnabled = watch("adr");
  const temperatureEnabled = watch("temperature");

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="Quantity"
            type="number"
            {...register("quantity", { required: true })}
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="L x W x H (cm)"
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
      <Stack>
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
            sx={{ mb: 1 }}
          />
        )}

        <FormControlLabel
          control={<Checkbox {...register("temperature")} />}
          label="Temperature"
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
      </Stack>

      <TextField
        select
        fullWidth
        size="small"
        label="Service Type"
        {...register("serviceType", { required: true })}
        variant="standard"
        sx={{ mb: 2 }}
      >
        <MenuItem value="airport">Airport to Airport</MenuItem>
        <MenuItem value="port">Port to Port</MenuItem>
        <MenuItem value="freight">Freight Consolidation</MenuItem>
      </TextField>
    </>
  );
};
