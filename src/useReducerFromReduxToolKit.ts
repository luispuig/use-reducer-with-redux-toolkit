import { useReducer, useMemo } from "react";
import { Slice } from "@reduxjs/toolkit";

export const useReducerFromReduxToolKit = <T extends Slice>(slice: T) => {
  const [state, dispatch] = useReducer(
    slice.reducer,
    slice.reducer(undefined, { type: "INIT" })
  );
  const actions = useMemo(
    () =>
      Object.entries(slice.actions).reduce(
        (acc, [actionName, action]) => ({
          ...acc,
          [actionName]: (payload: any) => dispatch(action(payload)),
        }),
        {}
      ),
    [slice.actions]
  );

  return [state, actions];
};
