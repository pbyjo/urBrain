import React, {Fragment, useContext} from 'react';
import {MyContext} from '../contexto/context.js';

/* Components */
import Tcounter from '../Components/Tcounter.jsx';
import Tsearch from '../Components/Tsearch.jsx';
import Tlist from '../Components/Tlist.jsx';
import Titem from '../Components/Titem.jsx';
import Tform from '../Components/TForm.jsx';
import CreateTask from '../Components/CreateTask.jsx';
import Modal from '../Components/Modal';
import Loading from '../Components/Loading';
/* import '../Components/Favicon' */

import addTaskImage from '../assets/logos/addTask_image.jpg';

const AppUI = () => {
    const {
        error, 
        loading, 
        TasksSearched, 
        checkTask,
        deleteTask,
        openModal,
        setOpenModal
    } = useContext(MyContext);

    return(
        <Fragment>
            <Tcounter/>         
            <Tsearch/>
            <Tlist>
                {error && <p>tenemos un error...vuelve en minutos.</p>}
                {
                    loading && 
                    <Loading />
                }
                {
                    (!loading && !TasksSearched.length) 
                        && 
                    <div className="skeletons_container">
                        <p>Crea tu primer tarea!</p> 
                        <img className="images" src={addTaskImage} alt="imagen add Task" />
                    </div>
                }

                {TasksSearched.map(task => (
                    <Titem 
                        key={task.index}
                        text={task.text} 
                        completed={task.completed}
                        /* -- .-- */
                        onComplete={() => checkTask(task.text)}
                        onDelete={() => deleteTask(task.text)}
                    />
                ))}
            </Tlist>
            <CreateTask
                setOpenModal= {setOpenModal}
            />

            {
                openModal && (
                    <Modal>
                        <Tform />
                    </Modal>
                )
            }
        </Fragment>
    )
}

export default AppUI;

