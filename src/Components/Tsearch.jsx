
import React, {useState, useContext} from 'react';
import { MyContext } from '../contexto/context';

function Tsearch(/* props */) {

    /* const {state, setState} = props; */
    const {state, setState} = useContext(MyContext);
    
    const atributos = {
        text: 'Busca una tarea...',
        value: state,
        id: 'inputSearch',
        type: 'text'
    }

    const onSearchValueChange = (e) => {
        setState(e.target.value);
    }

    return(
        <input 
            id= {atributos.id}
            type={atributos.type}
            placeholder={atributos.text}
            value= {atributos.value}
            onChange={onSearchValueChange/* () => setState('Curso de Intro al DOM') */}
        >
        </input>
    )
}

export default Tsearch;