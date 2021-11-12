function Titem({text, completed, onComplete, onDelete}) {

    if(completed === true) {
        completed = '🏅'
    } else {
        completed = '❌'
    }

    /* 
    const onComplete = () => {
        alert();
    };

    const onDelete = () => {
        alert();
    } 
    */

    return (
        <li>
            <input 
                type="checkbox" 
                id="checkbox" 
                className="checkbox" 
                onClick={onComplete}
            />
            {
                completed === '🏅'
                ? <p className="completed"> {text} </p>
                : <p className="uncompleted"> {text} </p>
            }
            <h3>Status: {completed}</h3>
            <span 
                className= "Icon Icon-delete"
                onClick={onDelete}
            > 
            x 
            </span>
        </li>
    )
}

export default Titem;