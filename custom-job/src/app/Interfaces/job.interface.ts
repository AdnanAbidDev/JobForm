import { Section } from './section.interface';

export interface Job {
  jobId: number;
  jobTitle: string;
  startDate: Date;
  expiryDate: Date;
  duration: number;
  sections: Section[];
}
