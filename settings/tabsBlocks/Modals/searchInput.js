import Autocomplete from "react-autocomplete";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

const SearchInput=({searchItem,apiType,keyName})=>{
    const [variants,setVariants]= useState([]);
    const [selectedVariant,setSelectedVariant]= useState(false);
    const [value,setValue] = useState('');
    const submitRef = useRef();

    const chooseVariant=(value)=>{
        setValue('');
        setSelectedVariant(value);
    };

    useEffect(()=>{
        if(selectedVariant && selectedVariant.id){
            submitRef.current.click();
            setVariants([]);
        }
    },[selectedVariant]);

    useEffect(()=>{
        if(!variants.length){
            setSelectedVariant(false);
        }
    },[variants]);

    const {t} = useTranslation();
    return <>
        <Autocomplete
            getItemValue={(item) => item.name}
            items={variants}
            renderItem={(item, isHighlighted) =>
                <li >
                    <a href="#">{item.name}</a>
                </li>
            }
            renderMenu={(items, value, style)=> {

                return   <div className="search__dropdown" style={{display:"block"}}>
                    <ul  style={{ ...style}} children={items}/></div>
            }}

            value={value}
            onChange={(e)=>{
                setValue(e.target.value);
                searchItem(e.target.value,apiType,setVariants);

            }}
            wrapperProps={{
                className:'tag__search'
            }}
            wrapperStyle={{
                display: 'block'
            }
            }
            renderInput={(props)=>{
                return <input {...props}   type="text" placeholder={t(`Search ${apiType} or press Enter to create new`)} className="input" name={'name'}/>
            }}
            onSelect={(val,item)=>{
                chooseVariant(item)
            }}
        />
        {!!selectedVariant &&
            <>
                <input type="hidden" name={keyName} defaultValue={selectedVariant.id}/>
                <input type="hidden" name={"variantName"} defaultValue={selectedVariant.name}/>
            </>
        }
        <button type={'submit'} ref={submitRef} style={{display:'none'}}/>

    </>
};
export default SearchInput;
