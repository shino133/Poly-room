import { createContext, } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

const ProviderContext = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;