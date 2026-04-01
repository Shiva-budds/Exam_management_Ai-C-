export interface User {
  Id?: number;
  FullName: string;
  PhoneNumber: string; // PascalCase, as expected by your backend controller
  Password?: string;    // PascalCase, as expected by your backend controller
  Role: string;
}