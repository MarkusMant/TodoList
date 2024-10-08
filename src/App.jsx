import TodoList from './todolist'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Button

            sx={{ my: 2, color: 'white', display: 'block' }}>
            Home
          </Button>
          <Button

            sx={{ my: 2, color: 'white', display: 'block' }}>
            My Todos
          </Button>

        </Toolbar>
      </AppBar>
      <TodoList />
    </Container>
  )
}
export default App
