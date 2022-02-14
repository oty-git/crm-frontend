import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import apiDirectory from "../../../../../api/directory";
import SelectInput from "../../../../common/blocks/SelectInput";
import LanguagesBlock from "./ServiceModalContent/LanguagesBlock";
import UrgencyBlock from "./ServiceModalContent/UrgencyBlock";
import RepetitionsBlock from "./ServiceModalContent/RepetitionsBlock";
import isEmpty from "../../../../../functions/is-empty";
import apiAccountServices from "../../../../../api/accountServices";
import {lowerCaseFirstLetter} from "../../../../../functions/functions";
import Form from "../../../../common/blocks/Form";
import priceTypes from "../../../../../constants/priceTypes";
import timeFrames from "../../../../../constants/timeFrames";
import urgency from "../../../../../constants/urgency";
import {useTranslation} from "react-i18next";
import ModalFormInput from "../../../../common/blocks/ModalFormInput";

const ServiceFormModalContent = ({setModal, user, userType, getUser,modalService}) => {
    const {t} = useTranslation();

    const [services, setServices] = useState(false);
    const languages = useSelector(state => state.init.languages);
    const currencies = useSelector(state => state.init.currencies);

    let defaultServiceState = (modalService && modalService.id) ? modalService : {};

    if(!defaultServiceState.AccountServicesDiscounts?.length){
        defaultServiceState.AccountServicesDiscounts = [{repetitions: '', discount: ''}]
    }
    if(!defaultServiceState.AccountServicesLanguages?.length){
        defaultServiceState.AccountServicesLanguages = [{languages_from_id: languages[0].id, languages_to_id: languages[0].id, price: '', currencies_id:currencies[0].id}]
    }
    if(!defaultServiceState.AccountServicesUrgencies?.length){
        defaultServiceState.AccountServicesUrgencies =  [{urgency: urgency[0].value, timeframe: timeFrames[0].value, fee: ''}]
    }

    const [state, setState] = useState({...defaultServiceState});

    useEffect(() => {

        apiDirectory.getAll('/services').then(res => {
            setServices(res);
            if(defaultServiceState && defaultServiceState.id){
                return;
            }

            let tmpState = {...state};
            tmpState.account_id = user[userType].id;
            tmpState.account_type = lowerCaseFirstLetter(userType) + 's';
            tmpState.account_services_id = res[0].id;
            tmpState.price_calculation_type = priceTypes[0].value;

            if(!state.Service?.length){
                tmpState.Service = res[0];
            }

            setState(tmpState);


        }).catch(err => console.log('err', err));
    }, []);


    const handleChange = (value, name, arrayName, index) => {
        let tmpState = {...state};
        if (arrayName && !isEmpty(index)) {
            tmpState[arrayName][index][name] = value;
        } else {
            tmpState[name] = value;
        }
        setState(tmpState);
    };

    const submit = (e) => {
        e.preventDefault();

        const url = (modalService && modalService.id) ? `/${modalService.id}` : '';

        apiAccountServices.put(state,url).then(res => {
            if(res){
                getUser();
                setModal(false);
            }
        }).catch(err => {
            console.log('err', err)
        });
    };

    const deleteRow=(e,type,index)=>{
        e.preventDefault();
        let newState = {...state}

        if(newState[type].length===1){
            return;
        }
        // newState[type] = newState[type].filter((item,itemIndex)=>itemIndex!==index);

        delete newState[type][index];
        setState(newState);
    };

    return <React.Fragment>
            <a href="#" onClick={e => setModal(false)}>
                <img src="/images/svg/svg-sprite/symbol/closemodal.svg" alt="closemodal"/>
            </a>
            <div className="inner__modal">
                <Form action="" onSubmit={e => {submit(e);}}>
                    <h2>{modalService?.id ? t('Update price') : t('Create price')}</h2>
                    <div className="row__form">
                        <div className="form-group">
                            <div className="form-group__header">
                                <p>{t('Service')}</p>
                            </div>
                            {services && services.length >0 &&
                            <SelectInput
                                options={services}
                                name={'account_services_id'}
                                changeHandler={handleChange}
                                value={(state && state.Service) ? state.Service.id : ''}
                            />}
                        </div>
                    </div>
                    <div className="row__form">
                        <div className="form-group">
                            <div className="form-group__header">
                                <p>{t('Matt name')}</p>
                            </div>
                            {priceTypes && priceTypes.length > 0 &&
                            <SelectInput
                                options={priceTypes}
                                name={'price_calculation_type'}
                                changeHandler={handleChange}
                                value={state?.price_calculation_type}
                            />}
                        </div>
                        <div className="form-group">
                            <div className="form-group__header">
                                <p>{t('Unit count:')}</p>
                            </div>
                            {priceTypes && priceTypes.length > 0 &&
                            <ModalFormInput
                                required={true}
                                name={'price_calculation_units'}
                                placeholder={'Unit count'}
                                value={modalService.Service?.price_calculation_units}
                                styles={{minWidth:"70px"}}
                                disabled={true}
                                handlerChange={handleChange}/>

                            }
                        </div>
                    </div>
                    <div className="wrapper__row">
                        <div className={'row__form no-margin-bottom'}>
                            <div className={'form-group'}>
                                <div className="form-group__header">
                                    <p>{t('Languages')}</p>
                                </div>
                            </div>
                        </div>
                        <LanguagesBlock modalService={modalService} deleteRow={deleteRow} currencies={currencies} languages={languages} handleChange={handleChange} parentState={{...state}} setParentState={setState}/>
                    </div>
                    <div className="wrapper__row">
                        <UrgencyBlock deleteRow={deleteRow} timeFrames={timeFrames} urgency={urgency} handleChange={handleChange} parentState={{...state}} setParentState={setState}/>
                    </div>
                    <div className="wrapper__row wrapper__smaller">
                        <RepetitionsBlock deleteRow={deleteRow} handleChange={handleChange} parentState={{...state}} setParentState={setState}/>
                    </div>
                    <div className="controls__create">
                        <input type="submit" value={modalService?.id ? t('Update') : t('Create')} className="button button--fluid button--surfie-green"/>
                        <button className="button button--border-surfie-green" onClick={e => setModal(false)}>{t('Cancel')}</button>
                    </div>
                </Form>
            </div>
    </React.Fragment>
}

export default ServiceFormModalContent;






