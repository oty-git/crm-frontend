import {useSelector} from "react-redux";
import user_statuses from "../../../constants/user_statuses";
import SettingsTabs from "./SettingsTabs";
import {useParams,useHistory} from "react-router";
import React, {useEffect, useState} from "react";
import apiUsers from "../../../api/users";
import GeneralTab from "./tabs/GeneralTab";
import EducationAndFilesTab from "./tabs/EducationAndFilesTab";
import ServicesAndPricesTab from "./tabs/ServicesAndPricesTab";
import NotificationsTab from "./tabs/NotificationsTab";
import RolesTab from "./tabs/RolesTab";
import {useTranslation} from "react-i18next";

const SettingsPageWrap = () => {
    const {type, id} = useParams();
    const [modalService, setModalService] = useState(false);

    const currentUser = useSelector(state => state.auth.user);
    const [user, setUser] = useState(false);
    const [userType, setUserType] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const {t} = useTranslation();




    useEffect(() => {
        getUser();
    }, [type, id,currentUser]);

    const getUser = () => {
        if (id && type) {

            apiUsers.getSingle(id).then(res => {
                setUser(res);
                setUserType(res && res.Employee ? 'Employee' : (res && res.Freelancer ? 'Freelancer' : false));
            }).catch(err => {console.log('err', err)})
        } else {
            if (currentUser) {
                setUser(currentUser)
                setUserType(currentUser && currentUser.Employee ? 'Employee' : (currentUser && currentUser.Freelancer ? 'Freelancer' : false))
            }
        }

    };


    const props ={
        modalService,
        setModalService,
        user,
        userType,
        getUser,
    };

    let tabsList = [
        {label: t('General'), slug:'general',  tab: <GeneralTab {...props} />},
        {label: t('Education & Files'), slug:'education',  tab: <EducationAndFilesTab  {...props}  />},
        {label: t('Services & prices'), slug:'services', tab: <ServicesAndPricesTab  {...props} />},
        {label: t('Notifications'), slug:'notifications',  tab: <NotificationsTab  {...props}  />},
        {label: t('Roles'),  slug:'roles',  tab: <RolesTab  {...props}  />},
    ];


    return <div className="settings-page__wrap">
        <div className="container">
            <SettingsHeading setModalService={setModalService} modalService={modalService} user={user} userType={userType} tabsList={tabsList} activeTab={activeTab} />
            <SettingsTabs tabsList={tabsList} setActiveTab={setActiveTab}/>
        </div>
    </div>
};

export default SettingsPageWrap;

const SettingsHeading = ({user, userType, setModalService,tabsList,activeTab}) => {

    const {type, id} = useParams()
    const history  = useHistory();
    const userName = (user && user[userType] ? user[userType].name : '');


    let status = (user && user.status) ? user_statuses[user.status] : {};

    let currentTab = tabsList[activeTab];
    const {t} = useTranslation();

    return <div className="settings-page__heading">
        <div className="settings-page__heading-title">
            {type && id ?
                <React.Fragment>
                <a href="#" onClick={(e)=>{
                    e.preventDefault();
                    history.goBack()
                }}>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-0.000112319 6L6.46143 0L6.46143 12L-0.000112319 6Z" fill="#0E7D7D"/>
                    </svg>
                </a><h2 className="text-surfie-green">{userName}<span>#{id}</span></h2>
                </React.Fragment>
                :
                <h2 className="text-surfie-green">{t('Settings')}</h2>
            }

        </div>
        {(currentTab && currentTab.slug && currentTab.slug==='services')
        ?
            <React.Fragment>
                {type && id &&
                <div className="upload__block service__creation" style={{display: 'block'}}>
                    <div className="create__service" onClick={e => setModalService(true)}>
                        <div className="btn-add">
                            <div className="btn-add__header">
                                <div className="btn-add__input btn-add__input_add">
                                    <label className="btn-add__input-label">{t("Create")}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment>
            :
            <div className="settings-page__heading-status">
                <h3>{t("Account status:")}&nbsp;</h3>
                <div className="waiting__block">
                    <span className={"font-semibold " + status['class']}>{status['label']}</span>
                </div>
            </div>
        }



    </div>
};
