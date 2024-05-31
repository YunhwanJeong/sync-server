import { Document, Schema, model } from 'mongoose';

interface IModifier extends Document {
  posId: string;
  name: string;
  modGroupIds: string[];
  price: number;
}

const modifierSchema = new Schema<IModifier>({
  posId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  modGroupIds: [{ type: String, required: true }],
  price: { type: Number, required: true },
});

const Modifier = model<IModifier>('Modifier', modifierSchema);

export { Modifier };
export type { IModifier };
