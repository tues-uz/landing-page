export type UserRole = "superadmin" | "admin" | "reviewer" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions?: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
