import React, { memo } from "react";
import { TodoContext } from "../context/todoContext";

function TodoForm() {
  return (
    <TodoContext.Consumer>
      {({ addTodo, todoTextRef }) => {
        return (
          <div>
            <form className="todo__form todo_form" onSubmit={addTodo}>
              <input
                ref={todoTextRef}
                type="text"
                className="todo_form__input"
              />
              <button type="submit" className="todo_form__btn">
                Add Todo
              </button>
            </form>
          </div>
        );
      }}
    </TodoContext.Consumer>
  );
}

export default memo(TodoForm);
