export interface user{
    id?: number;
    fullName: string;
    phoneNumber: string;
    password?: string; // It's good practice to make password optional on the client-side model
    role: string;
}