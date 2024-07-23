import { useContext } from "react";
import { AuthContext } from "./constants";

export const useStateContext = () => useContext(AuthContext);