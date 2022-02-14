import ModalFormInput from "../../../../../common/blocks/ModalFormInput";
import React from "react";
import AddMoreBtn from "./AddMoreBtn";
import DeleteRowBtn from "./DeleteRowBtn";
import {useTranslation} from "react-i18next";

const RepetitionsBlock = ({handleChange, parentState, setParentState,deleteRow}) => {

    const handleAddRow = (e) => {
        e.preventDefault();
        parentState['AccountServicesDiscounts'].push({repetitions: '', discount: ''});
        setParentState(parentState);
    };
    let rows = parentState['AccountServicesDiscounts'];

    return <React.Fragment>
        {rows && rows.length > 0 && rows.map((item, index) => {
            return <RepetitionsRow rows={rows} deleteRow={deleteRow} value={item} key={index} index={index} handleChange={handleChange}/>
        })}
        <AddMoreBtn handleClick={handleAddRow}/>
    </React.Fragment>

};

export default RepetitionsBlock;

const RepetitionsRow = ({index, handleChange,value,deleteRow,rows}) => {
    const {t} = useTranslation();

    return <div className="row__form row__form--group col_4">
        <div className="form-group">
            <div className="form-group__header">
                <p>{t("Repetitions %")}</p>
            </div>
            <ModalFormInput required={false} name={'repetitions'} value={value.repetitions} className={'repeatitions__field'} styles={{minWidth:"70px"}} arrayIndex={index} arrayName={'AccountServicesDiscounts'} handlerChange={handleChange}/>
        </div>
        <div className="float__span">
            <span>=</span>
        </div>
        <div className="form-group">
            <div className="form-group__header">
                <p>{t("Discount %")}</p>
            </div>
            <ModalFormInput required={false} name={'discount'} value={value.discount} className={'timeframe__field'} styles={{minWidth:"70px"}} arrayIndex={index} arrayName={'AccountServicesDiscounts'} handlerChange={handleChange}/>
        </div>
        {index>0 &&

        <div className={'form-group'}>
            <div className="float__span">
                <div className="select js-select ">
                    <DeleteRowBtn handleClick={deleteRow} index={index} type={'AccountServicesDiscounts'}/>
                </div>
            </div>
        </div>
        }
    </div>;
}
