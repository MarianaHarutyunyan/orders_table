import React, { FC } from "react";
import { Control, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TextField } from "@mui/material";
import { OrderDefaultOptions } from "./OrderDefaultOptions.tsx";
import { OverlandType } from "./OverlandType.tsx";
import { AerialType } from "./AerialType.tsx";
import { SeaType } from "./SeaType.tsx";
import { Order } from "../../type.ts";

interface OrderFormProps {
  selectedType: string;
  register: UseFormRegister<Order>;
  control: Control<Order, any>;
  watch: UseFormWatch<Order>;
  darkMode: boolean;
}

export const OrderForm: FC<OrderFormProps> = ({
  selectedType,
  register,
  control,
  watch,
  darkMode,
}) => {
  return (
    <>
      <TextField
        fullWidth
        size="small"
        label="Order Name"
        {...register("name", { required: true })}
        margin="dense"
        variant="standard"
      />
      {selectedType === "overland" && (
        <OverlandType register={register} watch={watch} />
      )}
      {selectedType === "aerial" && (
        <AerialType register={register} watch={watch} />
      )}
      {selectedType === "sea" && <SeaType register={register} watch={watch} />}
      <OrderDefaultOptions
        register={register}
        control={control}
        darkMode={darkMode}
      />
    </>
  );
};
