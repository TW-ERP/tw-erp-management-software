//import actions from action store
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  //populate with states
  test: 'test',
};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(action.login, (state, action) => {

    // })

    .addDefaultCase((state) => {
      return state;
    });
});

export default loginReducer;
