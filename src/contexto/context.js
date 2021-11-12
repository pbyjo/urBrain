import React, {createContext, useState, useEffect} from 'react';
import useLocalStorage from "../hooks/useLocalStorage.js";


const MyContext = createContext();
function TasksProvider(props) {

    /* --- Estado de los datos */
    const {
        item: tasks,
        saveItem: saveTasks,
        loading,
        error
    } = useLocalStorage('TASKS_V1', []);

    /* --- Estado del buscador */
    const [state, setState] = useState('')

    /* --- Estado del modal */
    const [openModal, setOpenModal] = useState(false);

    // -- . --
    const taskCompleted = tasks.filter(task => !!task.completed).length;
    const totalTasks = tasks.length;

    // -- . --
    let TasksSearched = [];
    // -- . --

    if(!state.length >= 1) {
        TasksSearched = tasks
    } else {
            TasksSearched = tasks.filter(task => {
            const taskText = task.text.toLowerCase()
            const searchText = state.toLowerCase()
            return taskText.includes(searchText);
        })
    }

    /* Método para marcar TODOs */
    const checkTask = (text) => {
        const taskIndex = tasks.findIndex(task => task.text === text);

        const newTaskList = [...tasks]

        newTaskList[taskIndex].completed = !newTaskList[taskIndex].completed

        /* Actualizar el estado */
        /* setTasks(newTaskList); */
        saveTasks(newTaskList);
    }

    /* Método para eliminar TODOs */
    const deleteTask = (text) => {
        const taskIndex = tasks.findIndex(task => task.text === text);

        const newTaskList = [...tasks]
        newTaskList.splice(taskIndex, 1)

        /* Actualizar el estado */
        /* setTasks(newTaskList); */
        saveTasks(newTaskList);
    }

    /* Método para añaidr TODOs */
    const addTask = (text) => {
        const newTaskList = [...tasks]

        newTaskList.push({
            completed: false,
            text,
        });

        /* Actualizar el estado */
        /* setTasks(newTaskList); */
        saveTasks(newTaskList);
    }
    return (
        <MyContext.Provider value= {
            {
                loading,
                error,
                totalTasks,
                taskCompleted,

                state,
                setState,

                TasksSearched,
                checkTask,
                deleteTask,
                addTask,

                openModal,
                setOpenModal
            }
        }> 
            {props.children}
        </MyContext.Provider >
        )
    }

export {TasksProvider, MyContext};