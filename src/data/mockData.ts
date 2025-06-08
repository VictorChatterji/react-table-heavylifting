export interface DataRow {
  id: number;
  name: string;
  email: string;
  role: string;
  salary: number;
  dateJoined: Date;
  status: "active" | "inactive";
}

export const mockData: DataRow[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Software Engineer",
    salary: 85000,
    dateJoined: new Date("2022-01-13"),
    status: "active",
  },
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "IT Engineer",
    salary: 65000,
    dateJoined: new Date("2022-01-14"),
    status: "active",
  },
  {
    id: 1,
    name: "Mary Doe",
    email: "mary@example.com",
    role: "Marketing Engineer",
    salary: 55000,
    dateJoined: new Date("2021-03-1"),
    status: "active",
  },
  {
    id: 1,
    name: "Issac Doe",
    email: "issac@example.com",
    role: "Sales Engineer",
    salary: 35000,
    dateJoined: new Date("2020-05-30"),
    status: "active",
  },
  // Add more mock data entries as needed
];
