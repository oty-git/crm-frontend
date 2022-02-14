import React, {useState} from "react";
import FormInput from "../../../../common/form/FormInput";
import FormErrors from "../../../../common/blocks/FormErrors";
import {useTranslation} from "react-i18next";

const DiplomaModalContent = ({setModal, sendForm}) => {

    const [errors, setErrors] = useState(false);

    const {t} = useTranslation();

    return <React.Fragment>
        <a href="#" onClick={e => setModal(false)}>
            <img src="/images/svg/svg-sprite/symbol/closemodal.svg" alt="closemodal"/>
        </a>
        <div className="education__inner--modal">
            <h2>{t('New diploma')}</h2>
            <form action="" onSubmit={e => {setModal(false);sendForm(e,'diploma',false)}}>
                <div className="education__form">
                    <div className="double__education">
                        <div className="group__education">
                            <div className="form-group">
                                <FormInput label={t('Diploma type')} type={'text'} id={'name'} name={'name'} isRequired={true}/>
                            </div>
                        </div>
                        <div className="group__education">
                            <div className="form-group">
                                <FormInput label={t('Diploma Category')} type={'text'} id={'category'} name={'category'} isRequired={true}/>
                            </div>
                        </div>
                    </div>
                    <div className="double__education">
                        <div className="group__education">
                            <div className="form-group">
                                <FormInput label={t('Year of admission')} type={'number'} id={'year'} name={'year'} isRequired={true}/>
                            </div>
                        </div>
                    </div>
                    <FormErrors errors={errors}/>
                    <div className="education__buttons">
                        <button className="add__education button button--fluid button--surfie-green" type={'submit'}>
                            {t("Add diploma")}
                        </button>
                        <a href="#" className="cancel__education button button--border-surfie-green" onClick={e => setModal(false)}>{t('Cancel')}</a>
                    </div>
                </div>
            </form>
        </div>
    </React.Fragment>
}

export default DiplomaModalContent;
