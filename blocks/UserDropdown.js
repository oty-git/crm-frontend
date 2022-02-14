import React, {useState} from "react";
import store from "../../../store/store";
import {logoutUser} from "../../../store/actions/authentication";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const UserDropdown = () => {

    const user = useSelector(state => state.auth.user);
    const userType = (user && user.Employee ? 'Employee' : (user && user.Freelancer ? 'Freelancer' : ''));
    const [isOpen, setIsOpen] = useState(false);

    return <div className={"dropdown user-dropdown js-dropdown" + (isOpen ? ' is-active' : '')} data-dropdown="user">
        <div className="dropdown__toggle user-dropdown__toggle" data-dropdown-toggle="user" onClick={e => setIsOpen(!isOpen)}>
            <div className="user-dropdown__toggle-avatar">
                <div className="avatar">
                    <figure style={{backgroundImage: `url("${user[userType]?.avatar?.disk_name}")`}}></figure>
                </div>
            </div>
            <div className="user-dropdown__toggle-name">{user && user[userType] && user[userType].name}</div>
            <div className="user-dropdown__toggle-chevron">
                <svg className="svg-icon svg-icon--surfie-green" width="9" height="5">
                    <use href="/images/svg/svg-sprite/symbol/sprite.svg#chevron-down" x="0"
                         y="0"></use>
                </svg>
            </div>
        </div>
        <div className="dropdown__box user-dropdown__box" style={{display: (isOpen ? 'block' : 'none')}}>
            <UserDropdownMenu setIsOpen={setIsOpen}/>
        </div>
    </div>;
}

const UserDropdownMenu = ({setIsOpen}) => {

    const logout = () => {
        store.dispatch(logoutUser());
    };

    const {t} = useTranslation();

    return <div className="user-dropdown-menu">
        <div className="user-dropdown-menu__items">
            <div className="user-dropdown-menu__item">
                <Link className="user-dropdown-menu__link " to={'/settings'} onClick={()=>setIsOpen(false)}>
                    <div className="user-dropdown-menu__icon">
                        <svg className="svg-icon svg-icon--surfie-green" width="18" height="18">
                            <use href="/images/svg/svg-sprite/symbol/sprite.svg#cog" x="0"
                                 y="0"></use>
                        </svg>
                    </div>
                    <div className="user-dropdown-menu__title">{t("Settings")}</div>
                </Link>
            </div>
            <div className="user-dropdown-menu__item">
                <a className="user-dropdown-menu__link" href="#" onClick={e => logout()}>
                    <div className="user-dropdown-menu__icon">
                        <svg className="svg-icon svg-icon--surfie-green" width="18" height="14">
                            <use href="/images/svg/svg-sprite/symbol/sprite.svg#log-out" x="0"
                                 y="0"></use>
                        </svg>
                    </div>
                    <div className="user-dropdown-menu__title">{t("Log Out")}</div>
                </a>
            </div>
        </div>
    </div>
};

export default UserDropdown;
