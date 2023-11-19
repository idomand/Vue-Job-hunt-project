export interface Job {
  id: number;
  title: string;
  organization: string;
  degree: string;
  jobType: string;
  locations: string[];
  minimumQualifications: string[];
  preferredQualifications: string[];
  description: string[];
  dateAdded: string;
}

export interface Spotlights {
  id: number;
  img: string;
  title: string;
  description: string;
}
