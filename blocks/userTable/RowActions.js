import React, {useEffect, useRef, useState} from "react";
import apiUsers from "../../../../api/users";
import {useTranslation} from "react-i18next";

const RowActions = ({user,deleteItem}) => {
    const {t} = useTranslation();

    const [clicked, setClicked] = useState(false);

    const node = useRef(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);
    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setClicked(false);
    }

    const actions = [
        {label: t('Archive'), name: 'archive', action: 'status', param: 'archived'},
        {label: t('Temporary Approve'), name: 'clock-boston-blue', action: 'status', param: 'temporary_approve'},
        {label: t('Approve'), name: 'check-caribbean-green', action: 'status', param: 'approved'},
        {label: t('Reject'), name: 'close-brick-red', isReject: true, action: 'status', param: 'rejected'},
    ];

    return <div className="drop__wrapper" ref={node}>
        <div className="dropdown choose-actions-dropdown js-dropdown">
            <div className={"dropdown__toggle choose-actions-dropdown__toggle" + (clicked ? ' is-active' : '')} onClick={e => setClicked(!clicked)}>
                <div className="choose-actions-dropdown__toggle-icon button__action">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector 1" d="M5.34766 5.35059L0.847656 0.350586L9.84766 0.350586L5.34766 5.35059Z" fill="#0E7D7D"/>
                    </svg>
                </div>
            </div>
            <div className="dropdown__box choose-actions-dropdown__box" style={{display: (clicked ? 'block': 'none')}}>
                <div className="actions">
                    {actions && actions.map((item, index) => {
                        return <ActionItem key={index} action={item} user={user}/>
                    })}
                </div>
            </div>
        </div>
        <div className="action--buttons ml-5">
            <div className="remove__button">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        deleteItem(user.id);
                    }}
                >
                    <img src="/images/trashicon.svg" alt="trashicon" />
                </a>
            </div>
        </div>
    </div>;
}

export default RowActions;

const ActionItem = ({action, user}) => {

    const click = (e) => {
        e.preventDefault();
        apiUsers.put({status: action.param}, `/${user.users_id}`).then(res => {
            if (res && res.success)
                window.location.reload();
        }).catch(err => console.log('err'))
    }

    return <div className={"actions__action" + (action.isReject ? ' actions__reject' : '')} onClick={e => click(e)}>
        <div className="actions__action-icon">
            <img src={`/images/icons/${action.name}.svg`} alt={action.name}/>
        </div>
        <div className="actions__action-title">{action.label}</div>
    </div>
}
