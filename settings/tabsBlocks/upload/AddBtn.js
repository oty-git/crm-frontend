import React,{useRef, useState} from "react";
import useOutsideClick from "../../../../../utils/useOutsideClick";
import {useTranslation} from "react-i18next";

const AddBtn = ({saveFiles, className="btn-add",multiple=true,name='education_files'}) => {

    const [isOpened, setIsOpened] = useState(false);

    const node = useRef();

    useOutsideClick(node, () => {
        setIsOpened(false);
    });
    const {t} = useTranslation();
    return <div className={className + (isOpened ? ' btn-add_opened' : '')} onClick={e => setIsOpened(!isOpened)} ref={node}>
            <div className="btn-add__header">
                <div className="btn-add__input btn-add__input_add">
                    <label htmlFor="file-upload" className="btn-add__input-label">{multiple ? t("Add files") :t("Add file")  }
                    <input id="file-upload" multiple={multiple} type="file" name={name} onChange={(e)=>{
                        saveFiles(e.target.files)
                    }}/>
                    </label>

                </div>
                {/*<div className="btn-add__icon"></div>*/}
            </div>

            {/*<div className="btn-add__dropdown">*/}
            {/*    <ul className="btn-add__list">*/}
            {/*        <li className="btn-add__item">*/}
            {/*            <div className="btn-add__input">*/}
            {/*                <label htmlFor="file-upload-2" className="btn-add__input-label">From computer*/}
            {/*                </label>*/}
            {/*                <input id="file-upload-2" type="file"/>*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*        <li className="btn-add__item">*/}
            {/*            <a href="" className="btn-add__link btn-add__link_text">{t('Create text')}</a>*/}
            {/*        </li>*/}
            {/*        <li className="btn-add__item">*/}
            {/*            <a href="" className="btn-add__link btn-add__link_url">{t('By URL')}</a>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
};

export default AddBtn;
