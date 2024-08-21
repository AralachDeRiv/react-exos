import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TodoList.css";
import penImage from "../img/pen.png";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const penRef = useRef(null);
  const rulerRef = useRef(null);

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("todos");
    if (itemsFromStorage) {
      try {
        const parsedItems = JSON.parse(itemsFromStorage);
        setTodos(parsedItems);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
  }, []);

  // cela ne fonctionne pas directement avec setTimeOut
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Sauvegarder les todos dans localStorage à chaque mise à jour
  useEffect(() => {
    const saveTolocalStorage = async () => {
      // Pour faire en sorte qu'il se déclenche un peu plus tard que le premier useEffect
      await delay(200);
      localStorage.setItem("todos", JSON.stringify(todos));
    };
    saveTolocalStorage();
  }, [todos]);

  useEffect(() => {
    const setObjects = async () => {
      if (pageRef.current) {
        await setTimeout(() => {
          pageRef.current.style.transform = "rotate(5deg) translateX(0px)";
        }, 700);
      }
      if (penRef.current) {
        await setTimeout(() => {
          penRef.current.style.transform = "rotate(-49deg) translateX(0px)";
        }, 200);
      }
      if (rulerRef.current) {
        await setTimeout(() => {
          rulerRef.current.style.transform = "rotate(90deg) translateX(0px)";
        }, 300);
      }
    };
    setObjects();
  }, [pageRef, penRef, rulerRef]);

  const backHomeLink = async () => {
    if (pageRef.current) {
      pageRef.current.style.transform = "rotate(5deg) translateX(1000px)";
      await delay(400);
    }
    if (penRef.current) {
      penRef.current.style.transform = "rotate(-49deg)  translateY(-1000px)";
      await delay(300);
    }
    if (rulerRef.current) {
      rulerRef.current.style.transform = "rotate(90deg) translatex(1000px)";
      await delay(300);
    }
    await delay(500);
    navigate("/", {
      // Envoie le background pour la transition chez home Page
      state: {
        newBackground: "todo-new-background",
      },
    });
  };

  const handleTodos = (e) => {
    if (e.key === "Enter") {
      if (newTodo.trim()) {
        let newItem = {};
        newItem[newTodo] = true;
        setTodos([...todos, newItem]);
        setNewTodo("");
      }
    }
  };

  const deleteTodo = (idx) => () => {
    let updatedTodos = todos.slice();
    updatedTodos = updatedTodos.filter((_, i) => i !== idx);
    setTodos([...updatedTodos]);
  };

  const checkTodo = (idx) => () => {
    let updatedTodos = todos.slice();
    updatedTodos = updatedTodos.map((todo, i) => {
      if (i == idx) {
        const key = Object.keys(todo)[0];
        return { [key]: !todo[key] };
      }
      return todo;
    });
    setTodos([...updatedTodos]);
  };

  return (
    <div className="page-container todo-page-container">
      <div className="pen-container" ref={penRef}>
        <img src={penImage} alt="not-found" />
      </div>
      <div className="ruler-moustache" ref={rulerRef}>
        <div className="units"></div>
      </div>
      <div className="todos-container" ref={pageRef}>
        <h3 className="backHome-link" onClick={backHomeLink}>
          Back Home
        </h3>
        <div className="lines">
          <h2>My Todo List :</h2>
          <ul className="text">
            {todos.map((todo, idx) => (
              <li key={idx}>
                <p className={Object.values(todo)[0] ? "" : "crossed-out-text"}>
                  {Object.keys(todo)[0]}
                </p>
                <div className="btn-container">
                  <button className="check-btn" onClick={checkTodo(idx)}>
                    {Object.values(todo)[0] ? "Check" : "Uncheck"}
                  </button>
                  <button className="delete-btn" onClick={deleteTodo(idx)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
            <div className="add-todo">
              <label htmlFor="add-todo">Add todo :</label>
              <input
                id="add-to-do"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => handleTodos(e)}
              />
            </div>
          </ul>
        </div>
        <div className="holes hole-top"></div>
        <div className="holes hole-middle"></div>
        <div className="holes hole-bottom"></div>
      </div>
    </div>
  );
};

export default TodoList;
