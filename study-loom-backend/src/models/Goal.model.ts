export interface Goal {
  id: string;
  title: string;
  deadline: string;
  isCompleted: boolean;
  type: 'chapter' | 'topic' | 'custom';
  relatedId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class GoalModel implements Goal {
  id: string;
  title: string;
  deadline: string;
  isCompleted: boolean;
  type: 'chapter' | 'topic' | 'custom';
  relatedId?: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: Goal) {
    this.id = data.id;
    this.title = data.title;
    this.deadline = data.deadline;
    this.isCompleted = data.isCompleted;
    this.type = data.type;
    this.relatedId = data.relatedId;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  static fromJSON(json: any): GoalModel {
    return new GoalModel({
      id: json.id,
      title: json.title,
      deadline: json.deadline,
      isCompleted: json.isCompleted,
      type: json.type,
      relatedId: json.relatedId,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON(): Goal {
    return {
      id: this.id,
      title: this.title,
      deadline: this.deadline,
      isCompleted: this.isCompleted,
      type: this.type,
      relatedId: this.relatedId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}