import React from "react";
import EditableListItem from "./EditableListItem";

const InfoListItem = ({label, value, editable, removeIcon, removeClass, removeItem, type, itemId, inputName,...props}) => {
    return <div className="info-list__item">
        <div className="info-list__left">
            <div className="font-semibold text-silver-chalice">{label}</div>
        </div>
        <div className="info-list__right info__remove">
            {editable ?
                <EditableListItem  value={value} name={inputName} {...props}/>
                :
                <p className="font-semibold">{value}
                {removeIcon && <a href="#" className={removeClass} onClick={e => removeItem(e, type, itemId)}><img src="/images/closeicon.svg" alt=""/></a>}
                </p>
            }
        </div>
    </div>
}

export default InfoListItem;
