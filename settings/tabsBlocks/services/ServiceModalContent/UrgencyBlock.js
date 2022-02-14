import SelectInput from "../../../../../common/blocks/SelectInput";
import ModalFormInput from "../../../../../common/blocks/ModalFormInput";
import React from "react";
import AddMoreBtn from "./AddMoreBtn";
import DeleteRowBtn from "./DeleteRowBtn";
import {useTranslation} from "react-i18next";

const UrgencyBlock = ({timeFrames, urgency, handleChange, parentState, setParentState,deleteRow}) => {


    const handleAddRow = (e) => {
        e.preventDefault();
        parentState['AccountServicesUrgencies'].push({urgency: urgency[0].value, timeframe: timeFrames[0].value, fee: ''});
        setParentState(parentState);
    };

    let rows = parentState['AccountServicesUrgencies'];


    return <React.Fragment>
        {rows && rows.length > 0 && rows.map((item, index) => {
            return <UrgencyRow rows={rows} deleteRow={deleteRow} value={item} key={index} timeFrames={timeFrames} urgencies={urgency} index={index} handleChange={handleChange}/>
        })}
        <AddMoreBtn handleClick={handleAddRow}/>
    </React.Fragment>
};

export default UrgencyBlock;

const UrgencyRow = ({timeFrames, urgencies,value, index, handleChange,deleteRow,rows}) => {
    const {t} = useTranslation();

    return <div className="row__form row__form--group col_4">
        <div className="form-group">
            <div className="form-group__header">
                <p>{t('Urgency')}</p>
            </div>
            {urgencies && urgencies.length > 0 &&
            <SelectInput value={value.urgency} options={urgencies} name={'urgency'} arrayIndex={index} arrayName={'AccountServicesUrgencies'} changeHandler={handleChange}/>}
        </div>
        <div className="form-group">
            <div className="form-group__header">
                <p>{t('Time frame')}</p>
            </div>
            {timeFrames && timeFrames.length > 0 &&
            <SelectInput value={value.timeframe} options={timeFrames} name={'timeframe'} arrayIndex={index}
                         arrayName={'AccountServicesUrgencies'} changeHandler={handleChange}

            />}
        </div>
        <div className="float__span">
            <span>=</span>
        </div>
        <div className="form-group fee__group">
            <div className="form-group__header">
                <p>+ fee / - %</p>
            </div>
            <ModalFormInput required={false} value={value.fee} name={'fee'} className={'fee__input'} styles={{minWidth: "70px"}}
                            arrayIndex={index} arrayName={'AccountServicesUrgencies'} handlerChange={handleChange}/>
        </div>
        {index>0 &&
        <div className={'form-group'}>
            <div className="float__span">
                <div className="select js-select ">
                    <DeleteRowBtn handleClick={deleteRow} index={index} type={'AccountServicesUrgencies'}/>
                </div>
            </div>
        </div>
        }
    </div>;
}
