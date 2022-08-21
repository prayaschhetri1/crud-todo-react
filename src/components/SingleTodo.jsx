import React, { useState } from "react";

const SingleTodo = ({
  item,
  handleDelete,
  handleUpdate,
  handleEdit,
  setValue,
  handleStatus,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      {isClicked ? (
        <input
          className="editInput"
          onKeyPress={(e) => handleUpdate(item.id, e)}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
      ) : (
        <>
          <input type="checkbox" onClick={() => handleStatus(item)} />
          <p
            style={{
              textDecoration: item.status ? "line-through" : "none",
              color: item.status ? "grey" : "black",
            }}
          >
            {item.title}
          </p>
        </>
      )}

      <div className="btn">
        <button
          className="edit-btn"
          onClick={() => {
            handleEdit(item);
            setIsClicked(!isClicked);
          }}
        >
          Edit
        </button>
        <button className="delete-btn" onClick={() => handleDelete(item.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
