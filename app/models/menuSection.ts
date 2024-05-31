import { Document, Schema, model } from 'mongoose';

interface IMenuSection extends Document {
  posId: string;
  name: string;
  itemIds: string[];
  magicCopyKey?: string;
  imageUrl?: string;
}

const menuSectionSchema = new Schema<IMenuSection>({
  posId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  itemIds: [{ type: String, required: true }],
  magicCopyKey: { type: String },
  imageUrl: { type: String },
});

const MenuSection = model<IMenuSection>('MenuSection', menuSectionSchema);

export { MenuSection };
export type { IMenuSection };
