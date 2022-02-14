import ColumnHeader from "../ColumnHeader";
import React, {useState} from "react";
import InfoListItem from "../tabsBlocks/InfoListItem";
import PreferredItem from "../tabsBlocks/PreferredItem";
import UploadBlock from "../tabsBlocks/upload/UploadBlock";
import SideModalWrapper from "../../../common/modals/SideModalWrapper";
import DiplomaModalContent from "../tabsBlocks/Modals/DiplomaModalContent";
import TaxModalContent from "../tabsBlocks/Modals/TaxModalContent";
import ItemsModalContent from "../tabsBlocks/Modals/ItemsModalContent";
import apiAccountDiplomas from "../../../../api/accountDiplomas";
import apiAccountTaxInformation from "../../../../api/accountTaxInformation";
import apiAccountExpertises from "../../../../api/accountExpertises";
import apiAccountDigitalTools from "../../../../api/accountDigitalTools";
import {useParams} from "react-router";
import {lowerCaseFirstLetter} from "../../../../functions/functions";
import {useTranslation} from "react-i18next";

const EducationAndFilesTab = ({user, userType,getUser}) => {
    const {t} = useTranslation();

    const {type, id} = useParams();

    const [modalDiploma, setModalDiploma] = useState(false);
    const [modalTax, setModalTax] = useState(false);
    const [modalSkills, setModalSkills] = useState(false);
    const [modalExpertise, setModalExpertise] = useState(false);


    if (!user)
        return null;


    const diplomas = user[userType]['AccountDiplomas'];
    const expertises = user[userType]['AccountExpertises'];
    const taxInformation = user[userType]['AccountTaxInformations'];
    const skills = user[userType]['AccountDigitalTools'];


    const getApiType=(apiType)=>{
        let api = false;
        switch (apiType) {
            case 'diploma':
                api = apiAccountDiplomas;
                break;
            case 'expertises':
                api = apiAccountExpertises;
                break;
            case 'taxInfo':
                api = apiAccountTaxInformation;
                break;
            case 'skills':
                api = apiAccountDigitalTools;
                break;
        }
        return api;
    };

    const removeItem = (e, apiType, itemId) => {
        e.preventDefault();
        let api = getApiType(apiType);
        if (api) {
            api.remove(itemId).then(res => {
                getUser();
            }).catch(err => console.log('err', err));
        }
    };


    const cancelForm = (apiType) => {
        let api = getApiType(apiType);
        if(!api)
            return;


        let formData = new FormData();
        formData.append('account_id', user[userType].id);
        formData.append('account_type', lowerCaseFirstLetter(userType) + 's');


        api.put(formData,'/deleteAll').then(res => {
            if (res && res.success){
                getUser();
            }
        })

    };
    const sendForm = (e, apiType,formData) => {
        if(e)
            e.preventDefault();

        let api = getApiType(apiType);
        if(!api)
            return;
        if(e){
            formData = new FormData(e.target);

        }
        if(formData){
            formData.append('account_id', user[userType].id);
            formData.append('account_type', lowerCaseFirstLetter(userType) + 's');
        }


        api.put(formData).then(res => {
            if (res && res.success){
                getUser();
            }
        })
    };


    const searchItem=(query,apiType,setVariants)=>{
        let api = getApiType(apiType);
        if(!api)
            return;

        api.getSingle(`search/${query}`).then(res => {
            setVariants(res||[])
        }).catch(err => {console.log('err', err)});

    };


    return <div className="catalog__content-wrap">
        <div className="row">
            <div className="col-12 col-md-6 col-xl-4 offset-0  mb-40">
                <ColumnHeader title={t("Education:")} button={type && id} setModalShow={setModalDiploma}/>
                <div className="column-group">
                    {diplomas && diplomas.map((item, index) => {
                        return <GroupItem key={index} item={item} index={index} removeItem={removeItem}/>
                    })}
                </div>
                <SideModalWrapper
                    showModal={modalDiploma}
                    setShowModal={setModalDiploma}
                    modalClass={'education__modal'}
                >
                    <DiplomaModalContent sendForm={sendForm} getUser={getUser} setModal={setModalDiploma} />
                </SideModalWrapper>
            </div>
            <div className="col-12 col-md-6 col-xl-3 mb-40">
                <ColumnHeader title={t('Tax information:')} button={type && id} setModalShow={setModalTax}/>
                <div className="info-list">
                    {
                        taxInformation && taxInformation.map((item, index) => {
                            return <TaxItem key={index} item={item} removeItem={removeItem}/>
                        })
                    }
                </div>
                <SideModalWrapper
                    showModal={modalTax}
                    setShowModal={setModalTax}
                    modalClass={'tax__modal'}
                >
                    <TaxModalContent getUser={getUser} setModal={setModalTax} sendForm={sendForm}/>
                </SideModalWrapper>
            </div>
            <div className="col-12 col-md-6 col-xl-3 col-xxl-2 mb-40">
                <ColumnHeader title={t('Skills:')} button={type && id} setModalShow={setModalSkills}/>
                <div className="preffered-list">
                    <div className="custom-scroll preffered-list__scroll">
                        {
                            skills && skills.map((item, index) => {
                                if (item.DigitalTool)
                                return <PreferredItem removeIcon={type&&id} key={index} label={item.DigitalTool.name} type={'skills'} itemId={item.id} removeItem={removeItem}/>
                            })
                        }
                    </div>
                </div>
                <SideModalWrapper
                    showModal={modalSkills}
                    setShowModal={setModalSkills}
                    modalClass={'tag__modal skills__modal'}
                >
                    <ItemsModalContent getUser={getUser} setModal={setModalSkills} sendForm={sendForm} cancelForm={cancelForm} type={"skills"} keyType={'digital_tools_id'} removeItem={removeItem} searchItem={searchItem}/>
                </SideModalWrapper>
            </div>
            <div className="col-12 col-md-6 col-xl-3 col-xxl-2 mb-40">
                <ColumnHeader title={t('Expertise:')} button={type&&id} setModalShow={setModalExpertise}/>
                <div className="preffered-list">
                    <div className="custom-scroll preffered-list__scroll">
                        {expertises && expertises.length > 0 && expertises.map((item, index) => {
                            if (item.Expertise)
                                return <PreferredItem removeIcon={type&&id} key={index} label={item.Expertise.name} type={'expertises'} itemId={item.id} removeItem={removeItem}/>
                        })}
                    </div>
                </div>
                <SideModalWrapper
                    showModal={modalExpertise}
                    setShowModal={setModalExpertise}
                    modalClass={'tag__modal expertise__modal'}
                >
                    <ItemsModalContent getUser={getUser} setModal={setModalExpertise} sendForm={sendForm} cancelForm={cancelForm} type={"expertises"} keyType={'expertises_id'}  removeItem={removeItem} searchItem={searchItem}/>
                </SideModalWrapper>
            </div>
            <div className="col-12 col-xl-6 offset-0">
                <UploadBlock user={user} userType={userType} getUser={getUser} showUpload={type&&id}/>
            </div>
        </div>
    </div>;
};

export default EducationAndFilesTab;

const GroupItem = ({item, index, removeItem}) => {
    const {type, id} = useParams();
    const {t} = useTranslation();

    return <div className="column-group__item">
        <div className="info-list">
            <InfoListItem label={'#' + (++index)} value={item.year} removeIcon={type&&id} type={'diploma'} itemId={item.id} removeItem={removeItem}/>
            <InfoListItem label={t('Diploma type:')} value={item.name}/>
            <InfoListItem label={t('Diploma category:')} value={item.category}/>
        </div>
    </div>
}

const TaxItem = ({item, removeItem}) => {
    const {type, id} = useParams();

    return <InfoListItem
        label={`${item.invoice}:`}
        value={item.category}
        removeIcon={type&&id}
        removeClass={'remove__invoice'}
        type={'taxInfo'}
        itemId={item.id}
        removeItem={removeItem}
    />
}
