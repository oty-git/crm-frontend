import React, {useState} from "react";
import FormInput from "../../../../common/form/FormInput";
import FormErrors from "../../../../common/blocks/FormErrors";
import {useTranslation} from "react-i18next";

const TaxModalContent = ({setModal,sendForm}) => {

    const [errors, setErrors] = useState(false);
    const {t} = useTranslation();


    return <React.Fragment>
        <a href="#" onClick={e => setModal(false)}>
            <img src="/images/svg/svg-sprite/symbol/closemodal.svg" alt="closemodal"/>
        </a>
        <div className="tax__inner--modal"
             onSubmit={e => {
                setModal(false)
                sendForm(e,'taxInfo',false)
            }}
        >
            <h2>{t('Tax information:')}</h2>
            <form action="">
                <div className="tax__form">
                    <div className="double__tax">
                        <div className="group__tax">
                            <div className="form-group">
                                <FormInput label={t('Issuing invoice:')} type={'text'} id={'invoice'} name={'invoice'} isRequired={true}/>
                            </div>
                        </div>
                        <div className="group__tax">
                            <div className="form-group">
                                <FormInput label={t('Tax Category')} type={'text'} id={'category'} name={'category'} isRequired={true} />
                            </div>
                        </div>
                    </div>
                    <FormErrors errors={errors}/>
                    <div className="tax__buttons">
                        <button className="add__tax button button--surfie-green" type={'submit'}>{t('Add information')}</button>
                        <a href="#" className="cancel__tax button button--border-surfie-green" onClick={e => setModal(false)}>{t('Cancel')}</a>
                    </div>
                </div>
            </form>
        </div>
    </React.Fragment>
}

export default TaxModalContent;
