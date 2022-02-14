import SelectInput from "../../../../../common/blocks/SelectInput";
import React from "react";
import AddMoreBtn from "./AddMoreBtn";
import ModalFormInput from "../../../../../common/blocks/ModalFormInput";
import DeleteRowBtn from "./DeleteRowBtn";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const LanguagesBlock = ({languages, currencies,handleChange, parentState, setParentState,deleteRow,modalService}) => {

    const handleAddRow = (e) => {
        e.preventDefault();
        parentState['AccountServicesLanguages'].push({languages_from_id: languages[0].id, languages_to_id: languages[0].id, price: '',currencies_id:currencies[0].id});
        setParentState(parentState);
    };

    let rows = parentState['AccountServicesLanguages'];

    return <React.Fragment>
        {rows && rows.length > 0 && rows.map((item, index) => {
            return <LanguagesRow modalService={modalService} rows={rows} deleteRow={deleteRow} value={item} key={index} languages={languages} currencies={currencies} index={index} handleChange={handleChange}/>
        })}
        <AddMoreBtn handleClick={handleAddRow} />
    </React.Fragment>
};

export default LanguagesBlock;

const LanguagesRow = ({value,languages,currencies,deleteRow, handleChange, index,rows,modalService}) => {
    const {t} = useTranslation();

    return <div className="row__form col_4">
        <div className="form-group">
            <div className="row-group__item row-group__item--flex-1">
                <div className="form-group__header">
                    <p>{t('From')}</p>
                </div>
                {languages && languages.length > 0 &&
                    <SelectInput
                        options={languages}
                        arrayIndex={index}
                        arrayName={'AccountServicesLanguages'}
                        name={'languages_from_id'}
                        changeHandler={handleChange}
                        value={value?.language_from?.id || value?.languages_from_id}

                    />
                }
            </div>
        </div>
        <div className="form-group">
            <div className="row-group__item row-group__item--flex-1">
                <div className="form-group__header">
                    <p>{t('To')}</p>
                </div>
                {languages && languages.length > 0 &&
                    <SelectInput
                        options={languages}
                        arrayIndex={index}
                        arrayName={'AccountServicesLanguages'}
                        name={'languages_to_id'} changeHandler={handleChange}
                        value={value?.language_to?.id  || value?.languages_to_id}
                    />
                }
            </div>
        </div>
        <div className="form-group">
            <div className="row-group row-group--align-center row-group--0">
                {!!modalService.Service?.price_calculation_units &&
                    <div className="form-group__header">
                        <p>{t('Price per:')} {modalService.Service.price_calculation_units}</p>
                    </div>
                }
                <div className=" price__item--form">
                    <ModalFormInput value={value.price} required={true} name={'price'} placeholder={'PRICE'} styles={{minWidth:"70px"}} arrayIndex={index} arrayName={'AccountServicesLanguages'} handlerChange={handleChange}/>
                    {/*<SelectInput options={currencies} name={"currencies_id"} className={'select--transparent'} changeHandler={handleChange}/>*/}
                </div>
            </div>
        </div>

        <div className="form-group">
            <div className="row-group__item row-group__item--flex-1">
                <SelectInput arrayIndex={index}
                             arrayName={'AccountServicesLanguages'}
                             value={value.currencies_id || currencies[0]}
                             options={currencies}
                             name={"currencies_id"}
                             className={'select--transparent'}
                             changeHandler={handleChange}
                />
            </div>
        </div>
        {index>0 &&
        <div className={'form-group'}>
            <div className="row-group__item row-group__item--flex-1">
                <div className="select js-select ">
                    <DeleteRowBtn handleClick={deleteRow} index={index} type={'AccountServicesLanguages'}/>
                </div>
            </div>
        </div>
        }
    </div>
}
