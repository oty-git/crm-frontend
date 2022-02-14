import {useState} from "react";

const Dropdown = ({headerTitle, items}) => {

    const [isOpen, setIsOpen] = useState(false);

    return <div className={"dropdown notifications-dropdown js-dropdown" + (isOpen ? ' is-active' : '')} data-dropdown="notifications">
        <DropdownButton count={items.length} setIsOpen={setIsOpen} isOpen={isOpen}/>
        <div className="dropdown__box notifications-dropdown__box" style={{display: (isOpen ? 'block' : 'none')}}>
            <div className="notifications-dropdown__wrap">
                <DropdownHeader title={headerTitle}/>
                <div className="custom-scroll notifications-dropdown__scroll"
                     data-simplebar="data-simplebar">
                    {items.map((item, index) => {
                        return <p key={index}>{item.value}</p>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default Dropdown;

const DropdownButton = ({count, setIsOpen, isOpen}) => {
    return <div className="dropdown__toggle notifications-dropdown__toggle"
                data-dropdown-toggle="notifications" onClick={e => setIsOpen(!isOpen)}>
        <div className="notifications-dropdown__toggle-icon">
            <svg className="svg-icon svg-icon--surfie-green" width="24" height="25">
                <use href="/images/svg/svg-sprite/symbol/sprite.svg#bell" x="0" y="0"></use>
            </svg>
        </div>
        <div className="notifications-dropdown__toggle-title">{count}</div>
    </div>;
}

const DropdownHeader = ({title}) => {
    return <div className="notifications-dropdown__header">
        <div className="content-header">
            <div className="content-header__title">
                <h3>{title}</h3>
            </div>
            <div className="content-header__close">
                <div className="close" data-dropdown-close="notifications">
                    <svg className="svg-icon svg-icon--alto" width="15" height="15">
                        <use href="/images/svg/svg-sprite/symbol/sprite.svg#close" x="0"
                             y="0"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>;
}