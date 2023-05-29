import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todoList, setTodoList] = useState([]);
  const todoTextRef = useRef(null);

  const loadTodo = useCallback(async (ft) => {
    const type = "LOAD_TODO";
    try {
      let url = "http://localhost:3000/todoList";

      if (ft !== "all") {
        url += `?isDone=${ft === "completed"}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json);
      }

      setTodoList(json);
    } catch (error) {
      console.log("error load todo", error);
    }
  }, []);

  const addTodo = useCallback(async (event) => {
    const type = "ADD_TODO";
    try {
      event.preventDefault();
      const todoText = todoTextRef.current.value;
      const res = await fetch("http://localhost:3000/todoList", {
        method: "POST",
        body: JSON.stringify({
          text: todoText,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json);
      }

      setTodoList((val) => [...val, json]);
      todoTextRef.current.value = "";
    } catch (error) {
      console.log("add todo error", error);
    }
  }, []);

  const updateTodo = useCallback(async (item) => {
    const type = "UPDATE_TODO";
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json);
      }

      setTodoList((val) => {
        const index = val.findIndex((x) => x.id === item.id);
        return [...val.slice(0, index), json, ...val.slice(index + 1)];
      });
    } catch (error) {
      console.log("add todo error", error);
    }
  }, []);

  const deleteTodo = useCallback(async (item) => {
    const type = "DELETE_TODO";
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json);
      }

      setTodoList((val) => {
        const index = val.findIndex((x) => x.id === item.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
    } catch (error) {
      console.log("error delete", error);
    }
  }, []);

  useEffect(() => {
    loadTodo("all");
  }, [loadTodo]);

  const value = useMemo(
    () => ({
      todoList,
      todoTextRef,
      loadTodo,
      addTodo,
      updateTodo,
      deleteTodo,
    }),
    [todoList, loadTodo, addTodo, deleteTodo, updateTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodo = () => useContext(TodoContext);

TodoProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
