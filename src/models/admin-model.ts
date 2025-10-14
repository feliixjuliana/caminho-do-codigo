import { v4 as uuidv4 } from 'uuid';

export interface AdminProps {
  id?: string;
  username: string;
  password: string;
  createdAt?: Date;
}

export class Admin {
  public readonly id: string;
  public username: string;
  public password: string;
  public createdAt: Date;

  constructor(props: AdminProps) {
    this.id = props.id || uuidv4();
    this.username = props.username;
    this.password = props.password;
    this.createdAt = props.createdAt || new Date();
  }
}