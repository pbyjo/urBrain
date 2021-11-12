import { useContext } from 'react';
import { MyContext } from '../contexto/context';
import logo from '../assets/logos/urBrain_logo.jpg';
function Tcounter(/* props */) {

    /* const {total, completed} = props */
    const {totalTasks, taskCompleted} = useContext(MyContext);

    return (
        <section className="container2">
            <img src={logo} alt="Logo de Notion" />
            {totalTasks < 1 
            ? <h2 className="color-empty">No has creado tareas aún</h2> 
            : <h2 className="color-length"> Has completado {taskCompleted} de {totalTasks} TODOs </h2>}
        </section>
    )
}

export default Tcounter;