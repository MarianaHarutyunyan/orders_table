import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OrderForm } from "./OrderTypes/OrderForm.tsx";
import { Order } from "../type";

interface NewOrderDialogProps {
  dialogVisible: boolean;
  setDialogVisible: (val: boolean) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  darkMode: boolean;
}

const orderTypes = [
  { label: "Overland", value: "overland" },
  { label: "Aerial", value: "aerial" },
  { label: "Sea", value: "sea" },
];

export const NewOrderDialog: FC<NewOrderDialogProps> = ({
  dialogVisible,
  setDialogVisible,
  orders,
  setOrders,
  darkMode,
}) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, reset, control, watch } = useForm<Order>();
  const [selectedType, setSelectedType] = useState("overland");

  const onSubmit = (data: Order) => {
    if (step === 1) {
      setStep(2);
    } else {
      const newOrder = { ...data, id: Date.now() };
      const updatedOrders = [...orders, newOrder];

      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setDialogVisible(false);
      setStep(1);
      reset();
    }
  };

  const handleCloseModal = () => {
    setDialogVisible(false);
    reset();
    setStep(1);
  };

  return (
    <Dialog open={dialogVisible} onClose={handleCloseModal}>
      <DialogTitle>
        New Order
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            <>
              <TextField
                fullWidth
                size="small"
                label="Name"
                {...register("lead.name", { required: true })}
                margin="dense"
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                type="email"
                {...register("lead.email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format (example: name@example.com)",
                  },
                })}
                helperText="Invalid email format (example: name@example.com)"
                margin="dense"
              />

              <TextField
                fullWidth
                size="small"
                label="Phone"
                type="tel"
                {...register("lead.phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Phone number must be between 10 to 15 digits",
                  },
                })}
                helperText="Phone number must be between 10 to 15 digits"
                margin="dense"
              />
            </>
          ) : (
            <>
              <FormControl
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Controller
                  name="type"
                  control={control}
                  defaultValue="overland"
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      sx={{
                        gap: "50px",
                      }}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        setSelectedType(event.target.value);
                      }}
                    >
                      {orderTypes.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </FormControl>

              <OrderForm
                selectedType={selectedType}
                register={register}
                control={control}
                watch={watch}
                darkMode={darkMode}
              />
            </>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        {step === 2 && (
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => setStep(1)}
          >
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleSubmit(onSubmit)}
        >
          {step === 1 ? "Next" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
