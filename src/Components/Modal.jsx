import {useContext } from 'react';
import {MyContext} from '../contexto/context';
import ReactDOM from 'react-dom';

function Modal({children}) {
    const { openModal, setOpenModal } = useContext(MyContext);

    const click = () => {
        setOpenModal(!openModal);
    }

    return ReactDOM.createPortal(
        <div className="ModalContainer">
            {children}

            <button 
            className="ModalContainer__close buttonMain"
            onClick={click}
            > 
                X 
            </button>

        </div>,

        document.getElementById('modal')
    )
}

export default Modal;
