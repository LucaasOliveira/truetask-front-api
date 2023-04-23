import { combineReducers } from "@reduxjs/toolkit";

import tasks from "./TasksSlice";
import login from "./LoginSlice";

export default combineReducers({
  tasks,
  login
});
