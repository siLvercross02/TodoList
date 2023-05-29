import React from "react";
import "./todo.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
// import TodoFilter from "./todoFilter";

export default function Todo() {
  return (
    <div className="todo">
      <h1 className="todo__title">Todo App</h1>
      <TodoForm />
      <div className="w-full flex-1 overflow-y-auto">
        <TodoList />
      </div>
      {/* <TodoFilter /> */}
    </div>
  );
}
