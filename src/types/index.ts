export interface Bento {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  employeeId: string;
  department: string;
  bento: Bento;
}

export interface DepartmentTotal {
  department: string;
  total: number;
}