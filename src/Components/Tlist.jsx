
const Tlist = (props) => {
    return (
        <section className="task-container">
            <ul>
                {props.children}
            </ul>
        </section>
    )
}

export default Tlist;