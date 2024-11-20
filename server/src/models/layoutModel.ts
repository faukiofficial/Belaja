import mongoose, { Schema, Model, Document } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: Category[];
}

const faqSchema: Schema<FaqItem> = new Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const categorySchema: Schema<Category> = new Schema({
  title: {
    type: String,
  },
});

const layoutSchema: Schema<Layout> = new Schema({
  type: {
    type: String,
  },
  faq: [faqSchema],
  categories: [categorySchema],
}, {
  timestamps: true,
});

const LayoutModel: Model<Layout> = mongoose.model<Layout>("Layout", layoutSchema);
export default LayoutModel;
