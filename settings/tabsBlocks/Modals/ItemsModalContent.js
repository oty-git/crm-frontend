import React, { useState} from "react";
import FormErrors from "../../../../common/blocks/FormErrors";
import SearchInput from "./searchInput";
import {serialize} from "../../../../../utils/objectToFormdata";
import {useTranslation} from "react-i18next";
import {capitalizeFirstLetter} from "../../../../../functions/functions";

const ItemsModalContent = ({setModal,searchItem,sendForm,type,keyType}) => {

    const {t} = useTranslation();

    const [items,setItems] = useState([]);

    const removeItem = (e, index)=>{
        e.preventDefault();
        let newItems = [...items].filter((item,indexItem)=>indexItem!==index);
        setItems(newItems);
    };
    const addItem = (data)=>{
        let newItems = [...items];
        newItems.push(data);
        setItems(newItems);
    };

    const onSubmit = (e)=>{
        e.preventDefault();
        let newItems = [...items];

        let form = new FormData(e.target);

        newItems.push({
            name:form.get('variantName') || form.get('name'),
            [keyType]:form.get(keyType),
        });
        e.target.reset();

        setItems(newItems);
    };
    const save = (e)=>{
        console.log('save');
        e.preventDefault();

        for (let item of items){
            console.log('item',item)
            let formData = serialize(item);
            sendForm(false,type,formData);
        }
    };

    return <React.Fragment>
        <a href="#" onClick={e => setModal(false)}>
            <img src="/images/svg/svg-sprite/symbol/closemodal.svg" alt="closemodal"/>
        </a>
        <div className="tag__inner--modal">
            <h2>{t(capitalizeFirstLetter(type))}</h2>
            <form action=""   onSubmit={e => onSubmit(e)}>
                <SearchInput  addItem={addItem} searchItem={searchItem} apiType={type} keyName={keyType}/>
                <div className="tag__list">
                    {
                        items && items.map((item, index) => {
                                return <ElemTag key={index} index={index} label={item?.name}  removeItem={removeItem}/>
                        })
                    }
                </div>
                <FormErrors />
                <div className="tag__buttons">
                    <button onClick={(e)=>{
                        save(e);
                        setModal(false);
                    }}  className="add__tag button button--fluid button--surfie-green">{t(`Add ${type}`)}</button>
                    <a href="#" className="cancel__skill button button--border-surfie-green" onClick={e => {
                        setModal(false);
                    }}>{t('Cancel')}</a>
                </div>
            </form>
        </div>
    </React.Fragment>
};

export default ItemsModalContent;

const ElemTag = ({label, index, removeItem}) => {
    return <div className="elem__tag">
        <p>{label}</p>
        <a href="#" onClick={e => removeItem(e, index)}>
            <img src="/images/closeicon.svg" alt=""/>
        </a>
    </div>
};
