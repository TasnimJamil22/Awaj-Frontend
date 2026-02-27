//  import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

// export type Role = "CITIZEN" | "AUTHORITY" | "ADMIN";

// export type TUser = {
//   id: string;
//   name: string;
//   email?: string;
//   role: Role;
//   profilePhoto?: string;
// };

// export interface IUserProviderValues {
//   user: TUser | null;
//   setUser: Dispatch<SetStateAction<TUser | null>>;
//   isLoading: boolean;
//   setIsLoading: Dispatch<SetStateAction<boolean>>;
//   logout: () => void;
// }

// export const UserContext = createContext<IUserProviderValues | undefined>(undefined);

// export function useUser() {
//   const ctx = useContext(UserContext);
//   if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
//   return ctx;
// }