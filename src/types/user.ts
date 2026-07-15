export interface TUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "reporter" | "admin";
  verifiedReporter?: boolean;
  status?: "active" | "banned";
  image?: string;
}
