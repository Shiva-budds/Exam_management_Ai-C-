export interface UserRegistration { // Renamed for clarity, or could be merged with existing 'User'
    Id?: number;
    FullName: string;
    PhoneNumber: string;
    Password?: string; // It's good practice to make password optional on the client-side model
    Role: string;
}