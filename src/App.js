import AppUI from './Containers/AppUI.js';
import { TasksProvider } from './contexto/context.js';

function App() {
    return(
        <TasksProvider>
            <AppUI />   
        </TasksProvider>
    )
}

export default App;
