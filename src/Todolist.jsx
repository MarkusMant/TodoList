import { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
    const [desc, setDesc] = useState({
        description: "",
        date: ""
    });
    const [todos, setTodos] = useState([]);

    const handleAdd = () => {
        if (!desc.description.trim() & !desc.date.trim()) {
            alert("Type description first!");
        } else {
            setTodos([...todos, desc]);
            setDesc({ description: "", date: "" });
        }
    }
    const handleDelete = (row) => {
        setTodos(todos.filter((desc, index) => index != row));

    }

    return (
        <>
            <h3>My Todos</h3>
            <input
                label="Description"
                placeholder="Description"
                value={desc.description}
                onChange={e => setDesc({ ...desc, description: e.target.value })}
            />
            <input
                label="Date"
                type="date"
                value={desc.date}
                onChange={e => setDesc({ ...desc, date: e.target.value })}
            />
            <button onClick={handleAdd}>Add Todo</button>
            <TodoTable handleDelete={handleDelete} todos={todos} />
        </>
    );
}

export default TodoList;