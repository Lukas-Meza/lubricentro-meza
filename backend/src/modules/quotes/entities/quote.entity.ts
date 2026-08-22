export class QuoteEntity {
  id!: string;
  name!: string;
  phone!: string;
  email!: string | null;
  vehicleMake!: string | null;
  vehicleModel!: string | null;
  vehicleYear!: number | null;
  message!: string | null;
  status!: string;
  createdAt!: Date;
}
