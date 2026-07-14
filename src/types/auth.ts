import { TUser } from "./user";

export interface TAuthContext {
  user: TUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  logout: () => Promise<void>;
}
