import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";
import api from "../ApiConfig";

export const Authcontext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
      
    case "LOGOUT":
      
      return {  user: null };
    default:
      return state;
  }
};


const HandleAuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getCurrentUserData() {
      var token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        try {
          const response = await api.post("/get-current-user", { token });
        if (response.data.success) {
            dispatch({
                type: "LOGIN",
                payload: response.data.user
            })
        } else {
            dispatch({
                type: "LOGOUT"
            });
        }
        } catch (error) {
          console.log(error)
        }
    }
    }
    getCurrentUserData();
  }, []);

  return (
    <Authcontext.Provider value={{ state, dispatch }}>
      {children}
    </Authcontext.Provider>
  );
};

export default HandleAuthContext;