const PreferredItem = ({label, type, itemId, removeItem,removeIcon}) => {
    return <div className="preffered-list__item">
        <div className="chip chip--border-silver-chalice">
            <div className="chip__title">{label}</div>
            {!!removeIcon &&
                <div className="chip__icon">
                    <div className="close" onClick={e => removeItem(e, type, itemId)}>
                        <svg className="svg-icon svg-icon--brick-red" width="10" height="10">
                            <use href="/images/svg/svg-sprite/symbol/sprite.svg#close" x="0" y="0"></use>
                        </svg>
                    </div>
                </div>
            }

        </div>
    </div>
}

export default PreferredItem;
