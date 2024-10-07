import { useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


function TodoList() {
    const [desc, setDesc] = useState({
        description: "",
        dayjs,
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
        if (!desc.description.trim() || !desc.date) {
            alert("Type description and pick a date first!");
        } else {
            setTodos([...todos, desc]);
            setDesc({ description: "", date: null, priority: "" });
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
            <Stack mt={2} direction="row" spacing={1} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    value={desc.description}
                    onChange={e => setDesc({ ...desc, description: e.target.value })}
                />
                <TextField
                    label="Priority"
                    value={desc.priority}
                    onChange={e => setDesc({ ...desc, priority: e.target.value })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        defaultValue={dayjs(Date.now)}
                        value={dayjs(desc.date)}
                        onChange={newValue => setDesc({ ...desc, date: newValue })}
                    />
                </LocalizationProvider>
                <Button variant="contained" color="success" onClick={handleAdd}>Add Todo</Button>
                <Button variant="contained" color="error" endIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
            </Stack>
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