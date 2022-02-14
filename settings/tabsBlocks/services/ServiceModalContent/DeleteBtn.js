const DeleteBtn = ({handleClick}) => {
    return <a href="#" className="add__more" onClick={e => handleClick(e)}>
        <span>
            <img src="/images/deleteicon.svg" alt=""/>
        </span>
    </a>
}

export default DeleteBtn;
