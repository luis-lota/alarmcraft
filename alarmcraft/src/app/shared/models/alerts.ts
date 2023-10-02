export interface Alerts {
  content: string;
  due: DueDate;
  priority: number;
  completed?: boolean;
  added_at: string | Date;
  id?: string | number;
}

export interface DueDate {
  date: string;
}

export interface RestResponse<T> {
  items: Array<Alerts>;
}

export enum OPERATION {
  ADD = 'ADD',
  EDIT = 'EDIT',
  REMOVE = 'REMOVE',
}

export enum COLUMNS {
  TODO = '1',
  COMPLETED = '2',
}

export interface FormAlarms {
  content: string;
  due_date?: any;
  priority: number;
}
