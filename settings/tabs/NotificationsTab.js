import Checkbox from "../../../common/blocks/Checkbox";
import {useTranslation} from "react-i18next";

const NotificationsTab = ({user, userType}) => {
    const {t} = useTranslation();

    return <div className="catalog__content-wrap">
        <div className="row">
            <div className="col-12 col-xxl-11 offset-0">
                <div className="notifications-list">
                    <div className="notifications-list__heading">
                        <h4>{t('Send email notification to ')}<a href="#" className="text-boston-blue">{user[userType].email}</a> {t("when...")}
                        </h4>
                    </div>
                </div>
                <div className="notifications-list__wrap">
                    <NotificationItem label={t('A job is posted or modified')}/>
                    <NotificationItem label={t('When deadline expiring soon')}/>
                </div>
            </div>
        </div>
    </div>
}

export default NotificationsTab;

const NotificationItem = ({label}) => {
    return <div className="notifications-list__item">
        <Checkbox label={label} value={1} defaultChecked={true}/>
    </div>
}
