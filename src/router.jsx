import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
} from "react-router-dom";
import Root from "./Login/Root";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todo" element={<Todo />} />
    </Route>
  )
);
