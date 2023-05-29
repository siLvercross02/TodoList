import React, { memo, useRef, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTodo } from "../context/todoContext";

function TodoListItem({ item }) {
  const [isEdit, setIsEdit] = useState(false);
  const editInputRef = useRef(null);
  const { updateTodo, deleteTodo } = useTodo();

  return (
    <div key={item.id} className="flex items-center m-4">
      <input
        type="checkbox"
        checked={item.isDone}
        className="disabled:accent-slate-400 disabled:cursor-wait"
        onChange={() => updateTodo({ ...item, isDone: !item.isDone })}
      />

      {isEdit ? (
        <form
          className={clsx("flex-1 px-4 flex", {
            "line-through": item.isDone,
          })}
          onSubmit={async () => {
            await updateTodo({
              ...item,
              text: editInputRef.current.value,
            });
            setIsEdit((val) => !val);
          }}
        >
          <input type="text" ref={editInputRef} className="flex-1" />
          <div>
            <button type="submit" className="btn">
              Edit
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                setIsEdit((val) => !val);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div
          onClick={() => setIsEdit((val) => !val)}
          role="button"
          className={clsx("flex-1 px-4", {
            "line-through": item.isDone,
          })}
          tabIndex={0}
        >
          {item.text}
        </div>
      )}

      <button type="button" className="btn" onClick={() => deleteTodo(item)}>
        Delete
      </button>
    </div>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    text: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
};

export default memo(TodoListItem);
