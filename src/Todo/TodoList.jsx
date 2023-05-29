import React, { memo } from "react";
import TodoListItem from "./TodoListItem";
import { TodoContext } from "../context/todoContext";

function TodoList() {
  return (
    <TodoContext.Consumer>
      {({ todoList }) => (
        <>
          {todoList.map((item) => (
            <TodoListItem key={item.id} item={item} />
          ))}
        </>
      )}
    </TodoContext.Consumer>
  );
}

export default memo(TodoList);
