import {useContext} from 'react';
import { MyContext } from '../contexto/context';

function CreateTask() {

    const { openModal, setOpenModal } = useContext(MyContext);

    const click = () => {
        setOpenModal(!openModal);
    }

    return(
        <button className="buttonMain"
            onClick={click}
        > 
        
        {/* ➕ */} 
        +
        
        </button>
    )
}

export default CreateTask;