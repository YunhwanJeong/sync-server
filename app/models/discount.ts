import { Document, Schema, model } from 'mongoose';

interface IDiscount extends Document {
  posId: string;
  name: string;
  amount?: number;
  rate?: number;
  couponCode?: string;
}

const discountSchema = new Schema<IDiscount>({
  posId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  amount: { type: Number },
  rate: { type: Number },
  couponCode: { type: String },
});

const Discount = model<IDiscount>('Discount', discountSchema);

export { Discount };
export type { IDiscount };
