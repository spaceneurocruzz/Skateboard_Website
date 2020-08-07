import React, { createContext, useReducer, useContext } from "react";
import { createPortal } from "react-dom";
import Notification from "./Components/Notification";

export const NotifyContext = createContext();

const initialState = [];

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const REMOVE_ALL = "REMOVE_ALL";

export const notifyReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date(),
          content: action.payload.content,
          type: action.payload.type
        }
      ];
    case REMOVE:
      return state.filter(t => t.id !== action.payload.id);
    case REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

export const NotifyProvider = props => {
  const [notify, notifyDispatch] = useReducer(notifyReducer, initialState);
  const notifyData = { notify, notifyDispatch };
  return (
    <NotifyContext.Provider value={notifyData}>
      {props.children}

      {/* {createPortal(<Notification notify={notify} />, document.body)} */}
    </NotifyContext.Provider>
  );
};

export const useNotifyContext = () => {
  return useContext(NotifyContext);
};
