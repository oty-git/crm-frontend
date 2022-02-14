import {useTranslation} from "react-i18next";

const TableHeading = ({title}) => {
    const {t} = useTranslation();

    return <div className="employers-page__heading">
        <div className="employers-page__heading-title">
            <h2 className="text-surfie-green">{t(title)}</h2>
        </div>
    </div>;
}

export default TableHeading;
