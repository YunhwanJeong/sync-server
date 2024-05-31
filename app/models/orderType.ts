import { Document, Schema, model } from 'mongoose';

interface IOrderType extends Document {
  posId: string;
  name: string;
}

const orderTypeSchema = new Schema<IOrderType>({
  posId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const OrderType = model<IOrderType>('OrderType', orderTypeSchema);

export { OrderType };
