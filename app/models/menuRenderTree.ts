import { Document, Schema, model } from 'mongoose';

interface IModifier extends Document {
  posId: string;
  name: string;
  price: number;
}

interface IModifierGroup extends Document {
  posId: string;
  name: string;
  modifiers: IModifier[];
  maxMods?: number;
  minMods?: number;
}

interface IMenuItem extends Document {
  posId: string;
  name: string;
  price: number;
  modGroups: IModifierGroup[];
  magicCopyKey?: string;
  imageUrl?: string;
}

interface IMenuRenderTree extends Document {
  posId: string;
  name: string;
  items: IMenuItem[];
  magicCopyKey?: string;
  imageUrl?: string;
}

const menuRenderTreeSchema = new Schema<IMenuRenderTree>({
  posId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // Store full MenuItem objects
  items: [{ type: Schema.Types.Mixed, required: true }],
  magicCopyKey: { type: String },
  imageUrl: { type: String },
});

const MenuRenderTree = model<IMenuRenderTree>(
  'MenuRenderTree',
  menuRenderTreeSchema,
);

export { MenuRenderTree };
export type { IMenuRenderTree };
