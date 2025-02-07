import React, { FC } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { Order } from "../../type.ts";

interface SeaTypeProps {
  register: UseFormRegister<Order>;
  watch: UseFormWatch<Order>;
}

export const SeaType: FC<SeaTypeProps> = ({ register, watch }) => {
  const adrEnabled = watch("adr");
  const temperatureEnabled = watch("temperature");

  return (
    <>
      <TextField
        fullWidth
        select
        size="small"
        label="FOB"
        margin="dense"
        {...register("fob", { required: true })}
        variant="standard"
        sx={{ mb: 1 }}
      >
        <MenuItem value="fob_origin">FOB Origin</MenuItem>
        <MenuItem value="fob_destination">FOB Destination</MenuItem>
        <MenuItem value="fob_port">FOB Port</MenuItem>
      </TextField>
      <TextField
        fullWidth
        size="small"
        label="Weight (kg)"
        type="number"
        margin="dense"
        {...register("weight", { required: true })}
        variant="standard"
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        select
        size="small"
        label="Container Type"
        margin="dense"
        {...register("containerType", { required: true })}
        variant="standard"
      >
        <MenuItem value="20">20'ft</MenuItem>
        <MenuItem value="40">40'ft</MenuItem>
        <MenuItem value="50">50'ft</MenuItem>
      </TextField>
      <TextField
        fullWidth
        size="small"
        label="Container Quantity"
        type="number"
        margin="dense"
        {...register("containerQuantity", { required: true })}
        variant="standard"
      />
      <Stack mb={1}>
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
            sx={{ mb: 1 }}
          />
        )}
      </Stack>
    </>
  );
};
