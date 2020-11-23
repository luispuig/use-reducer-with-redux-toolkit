import { useReducer, useMemo } from "react";
import { Slice, SliceCaseReducers, CaseReducerActions } from "@reduxjs/toolkit";

export const useReducerFromReduxToolKit = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string
>(
  slice: Slice<State, CaseReducers, Name>
): [State, CaseReducerActions<CaseReducers>] => {
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
        {} as CaseReducerActions<CaseReducers>
      ),
    [slice.actions]
  );
  return [state, actions];
};
