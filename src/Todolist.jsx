import { useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid

function TodoList() {
    const [desc, setDesc] = useState({
        description: "",
        date: "",
        priority: ""
    });
    const [todos, setTodos] = useState([]);
    const [colDefs, setColDefs] = useState([
        {
            field: "description", filter: true, floatingFilter: true, animateRow: true,
            suppressMovable: true, lockPosition: "left"
        },
        {
            field: "priority",
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' },
            filter: true,
            floatingFilter: true,
            animateRow: true
        },
        { field: "date", filter: true, floatingFilter: true, animateRow: true }
    ]);

    const handleAdd = () => {
        if (!desc.description.trim() & !desc.date.trim()) {
            alert("Type description first!");
        } else {
            setTodos([...todos, desc]);
            setDesc({ description: "", date: "", priority: "" });
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
                placeholder="Priority"
                value={desc.priority}
                onChange={e => setDesc({ ...desc, priority: e.target.value })}
            />
            <input
                label="Date"
                type="date"
                value={desc.date}
                onChange={e => setDesc({ ...desc, date: e.target.value })}
            />
            <button onClick={handleAdd}>Add Todo</button>
            <div className="ag-theme-material" style={{ height: 500, width: "110%" }}>
                <AgGridReact
                    rowData={todos}
                    columnDefs={colDefs}
                />
            </div >
        </>
    );
}

export default TodoList;