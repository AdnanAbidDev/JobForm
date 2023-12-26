import { Field } from './field.interface';

export interface Section {
  sectionId: number;
  sectionName: string;
  fields: Field[];
}
