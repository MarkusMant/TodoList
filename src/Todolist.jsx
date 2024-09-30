import { useRef, useState } from "react";
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
    const gridRef = useRef();
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
    const handleDelete = () => {
        gridRef.current.getSelectedNodes().length > 0 ?
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id))
            : alert('Select a row first!');
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
            <button onClick={handleDelete}>Delete</button>
            <div className="ag-theme-material"
                style={{
                    height: 500, width: 600
                }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={todos}
                    columnDefs={colDefs}
                    selection='singleRow'
                    onGridReady={params => gridRef.current = params.api}
                />
            </div >
        </>
    );
}

export default TodoList;