import { Topic } from './Topic.model';

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
  createdAt?: string;
  updatedAt?: string;
}

export class ChapterModel implements Chapter {
  id: string;
  name: string;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;

  constructor(data: Chapter) {
    this.id = data.id;
    this.name = data.name;
    this.topics = data.topics;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  static fromJSON(json: any): ChapterModel {
    return new ChapterModel({
      id: json.id,
      name: json.name,
      topics: json.topics,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON(): Chapter {
    return {
      id: this.id,
      name: this.name,
      topics: this.topics,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}