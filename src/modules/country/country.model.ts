import { Schema, model } from 'mongoose';
import { ICountryDocument } from './country.interface';

const countrySchema = new Schema<ICountryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    flag: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Country = model<ICountryDocument>('Country', countrySchema);
export default Country;
