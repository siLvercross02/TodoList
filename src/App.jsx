import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Todo from "./Todo";
import { TodoProvider } from "./context/todoContext";

function App() {
  return (
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  );
}

export default App;
