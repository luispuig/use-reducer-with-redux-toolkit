import React, { useReducer, useMemo } from "react";
import "./App.css";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) =>
      state + (action.payload ?? 1),
    decrement: (state, action: PayloadAction<number | undefined>) =>
      state - (action.payload ?? 1),
  },
});

const useReducerFromReduxToolKit = <T extends Slice>(slice: T) => {
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
function App() {
  const [state, actions] = useReducerFromReduxToolKit(slice);

  return (
    <div className="App">
      <header className="App-header">
        <p>{state}</p>
        <button onClick={() => actions.increment(1)}>Increment 1</button>
        <button onClick={() => actions.increment(3)}>Increment 3</button>
        <button onClick={() => actions.decrement(1)}>Decrement 1</button>
        <button onClick={() => actions.decrement(3)}>Decrement 3</button>
      </header>
    </div>
  );
}

export default App;
