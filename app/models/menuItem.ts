import { Document, Schema, model } from 'mongoose';

interface IMenuItem extends Document {
  posId: string;
  name: string;
  price: number;
  modGroupIds: string[];
  magicCopyKey?: string;
  imageUrl?: string;
}

const menuItemSchema = new Schema<IMenuItem>({
  posId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  modGroupIds: [{ type: String, required: true }],
  magicCopyKey: { type: String },
  imageUrl: { type: String },
});

const MenuItem = model<IMenuItem>('MenuItem', menuItemSchema);

export { MenuItem };
export type { IMenuItem };
