import { Chapter } from './Chapter.model';

export interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
  progress: number;
  createdAt?: string;
  updatedAt?: string;
}

export class SubjectModel implements Subject {
  id: string;
  name: string;
  chapters: Chapter[];
  progress: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: Subject) {
    this.id = data.id;
    this.name = data.name;
    this.chapters = data.chapters;
    this.progress = data.progress;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  static fromJSON(json: any): SubjectModel {
    return new SubjectModel({
      id: json.id,
      name: json.name,
      chapters: json.chapters,
      progress: json.progress,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON(): Subject {
    return {
      id: this.id,
      name: this.name,
      chapters: this.chapters,
      progress: this.progress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}