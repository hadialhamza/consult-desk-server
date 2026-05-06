import { Schema, model } from 'mongoose';
import { ICmsContentDocument } from './cms.interface';

const cmsContentSchema = new Schema<ICmsContentDocument>(
  {
    type: {
      type: String,
      enum: ['blog', 'faq', 'page'],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    image: { type: String },
    category: { type: String, trim: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const CmsContent = model<ICmsContentDocument>('CmsContent', cmsContentSchema);
export default CmsContent;
