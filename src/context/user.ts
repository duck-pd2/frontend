import { createContext } from "react";
import User from "../schemas/user";

const userContext = createContext<User | undefined>(undefined);

export default userContext;
