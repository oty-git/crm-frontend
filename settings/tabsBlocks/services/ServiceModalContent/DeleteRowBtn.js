import React from "react";

const DeleteRowBtn = ({handleClick,type,index}) => {


    return <a href=""  onClick={e=>handleClick(e,type,index)} className="button__label">
                <img src="/images/deleteicon.svg" alt=""/>
            </a>
};

export default DeleteRowBtn;
