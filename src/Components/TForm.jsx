import { useContext, useState } from "react"
import { MyContext } from "../contexto/context"
import Modal from './Modal';

function Tform() {

    const [newTaskValue, setNewTaskValue] = useState('')
    const {addTask, openModal, setOpenModal} = useContext(MyContext)

    /*  */
    const onChangee = (event) => {
        setNewTaskValue(event.target.value);
    }

    const onCancel = () => {
        setOpenModal(!openModal);
    }

    const onAdd = () => {

    }

    const onSubmit = (event) => {
        event.preventDefault()

        !newTaskValue
        ? setOpenModal(setOpenModal)
        : addTask(newTaskValue)
        setOpenModal(!openModal)
    }

    return(
        <form onSubmit= {onSubmit} className="form">
            <h2> Guarda una tarea </h2>
            <textarea 
                /* name="" 
                id="" 
                cols="30" 
                rows="10" */
                value={newTaskValue}
                onChange={onChangee}
                placeholder="Escribe una tarea..."
            >
            </textarea>
            <div className="form__buttons">
                    <button
                        type= "button"
                        onClick={onCancel}
                    >

                        Cancelar
                    </button>
                    <button
                        type="submit"
                        /* onClick={onAdd} */
                    >

                        Añadir
                    </button>
            </div>
        </form>
    )
}

export default Tform;