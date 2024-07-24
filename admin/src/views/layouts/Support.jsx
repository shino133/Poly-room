import { useContext } from "react";
import { AuthContext } from "../../contexts/index";

export const useStateContext = () => useContext(AuthContext);