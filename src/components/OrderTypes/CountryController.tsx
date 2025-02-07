import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";
import { Order } from "../../type";

const countries = [
  { label: "Russia", value: "RU", flag: "🇷🇺" },
  { label: "Armenia", value: "AM", flag: "🇦🇲" },
  { label: "Georgia", value: "GE", flag: "🇬🇪" },
];

interface CountryControllerProps {
  control: Control<Order, any>;
  name: "pickupCountry" | "shippingCountry";
}

export const CountryController: FC<CountryControllerProps> = ({
  control,
  name,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue="Armenia"
      rules={{ required: true }}
      render={({ field }) => (
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.label}
          disableClearable
          value={countries.find((c) => c.label === field.value) || countries[1]}
          onChange={(_, newValue) =>
            field.onChange(newValue ? newValue.label : "")
          }
          renderOption={(props, option) => (
            <li {...props}>
              <img
                src={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png`}
                alt={option.label}
                width="20"
                height="15"
                style={{ marginRight: 8 }}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              variant="standard"
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: field.value ? (
                    <img
                      src={`https://flagcdn.com/w40/${countries
                        .find((c) => c.label === field.value)
                        ?.value.toLowerCase()}.png`}
                      alt="flag"
                      width="20"
                      height="15"
                      style={{ marginRight: 8 }}
                    />
                  ) : null,
                },
              }}
            />
          )}
        />
      )}
    />
  );
};
