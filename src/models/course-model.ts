import { v4 as uuidv4 } from 'uuid';

export interface CourseProps {
  id?: string;
  title: string;
  category: string;
  imageUrl: string;
  courseUrl: string;
  description: string;
  isFree: boolean;
  createdAt?: Date;
}

export class Course {
  public readonly id: string;
  public title: string;
  public category: string;
  public imageUrl: string;
  public courseUrl: string;
  public description: string;
  public isFree: boolean;
  public createdAt: Date;

  constructor(props: CourseProps) {
    this.id = props.id || uuidv4();
    this.title = props.title;
    this.category = props.category;
    this.imageUrl = props.imageUrl;
    this.courseUrl = props.courseUrl;
    this.description = props.description;
    this.isFree = props.isFree;
    this.createdAt = props.createdAt || new Date();
  }
}