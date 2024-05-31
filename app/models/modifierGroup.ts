import { Document, Schema, model } from 'mongoose';

interface IModifierGroup extends Document {
  posId: string;
  name: string;
  modIds: string[];
  maxMods?: number;
  minMods?: number;
}

const modifierGroupSchema = new Schema<IModifierGroup>({
  posId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  modIds: [{ type: String, required: true }],
  maxMods: { type: Number },
  minMods: { type: Number },
});

const ModifierGroup = model<IModifierGroup>(
  'ModifierGroup',
  modifierGroupSchema,
);

export { ModifierGroup };
export type { IModifierGroup };
