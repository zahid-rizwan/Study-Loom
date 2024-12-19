import { Subject } from './Subject.model';

export interface Course {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  subjects: Subject[];
  createdAt?: string;
  updatedAt?: string;
}

export class CourseModel implements Course {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  subjects: Subject[];
  createdAt: string;
  updatedAt: string;

  constructor(data: Course) {
    this.id = data.id;
    this.name = data.name;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.subjects = data.subjects;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  static fromJSON(json: any): CourseModel {
    return new CourseModel({
      id: json.id,
      name: json.name,
      startDate: json.startDate,
      endDate: json.endDate,
      subjects: json.subjects,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON(): Course {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      subjects: this.subjects,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}