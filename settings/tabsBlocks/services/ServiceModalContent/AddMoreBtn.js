import {useTranslation} from "react-i18next";

const AddMoreBtn = ({handleClick}) => {
    const {t} = useTranslation();
    return <a href="#" className="add__more" onClick={e => handleClick(e)}>
        <span>
            <img src="/images/svg/svg-sprite/symbol/plus.svg" alt=""/>
        </span>
        {t("Create one more")}
    </a>
}

export default AddMoreBtn;
