export interface Lead {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  lead: Lead;
  type: string;
  direction: string;
  packageSize: string;
  quantity: number;
  weight: number;
  adr: boolean;
  country: string;
  currency: string;
  orderName: string;
  carType: string;
  temperature?: string;
  transportationDetails?: string;
  height: number;
  pickupAddress: string;
  pickupPostalCode: string;
  shippingCountry: string;
  shippingAddress: string;
  shippingPostalCode: string;
  shippingCost: number;
  pickupCountry: string;
  orderDetails: string;
  serviceType: string;
  adrValue: number;
  temperatureValue: number;
  containerQuantity: number;
  containerType: number;
  fob: string;
  timeFrom: string;
  timeTo: string;
}
