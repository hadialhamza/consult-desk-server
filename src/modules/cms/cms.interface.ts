import { Document, Types } from 'mongoose';

export interface ICmsContent {
  type: 'blog' | 'faq' | 'page';
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  category?: string;
  tags: string[];
  isPublished: boolean;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICmsContentDocument extends ICmsContent, Document {
  _id: Types.ObjectId;
}
