export interface Topic {
  id: string;
  name: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class TopicModel implements Topic {
  id: string;
  name: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(data: Topic) {
    this.id = data.id;
    this.name = data.name;
    this.isCompleted = data.isCompleted;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  static fromJSON(json: any): TopicModel {
    return new TopicModel({
      id: json.id,
      name: json.name,
      isCompleted: json.isCompleted,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON(): Topic {
    return {
      id: this.id,
      name: this.name,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}