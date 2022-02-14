import ColumnHeader from "../ColumnHeader";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Form from "../../../common/form/Form";
import SideModalWrapper from "../../../common/modals/SideModalWrapper";
import {setShowModalForm} from "../../../../store/actions/init";
import apiUsers from "../../../../api/users";
import PreferredItem from "../tabsBlocks/PreferredItem";
import IsJsonString from "../../../../functions/isJson";
import {useTranslation} from "react-i18next";

const RolesTab = ({user, userType, getUser}) => {
    const {t} = useTranslation();

    const dispatch = useDispatch();
    const {type, id} = useParams();
    const showModal = useSelector(state => state.init.showModalForm);
    const [data, setData] = useState(user.Roles);
    const showForm = (showModal) => {
        dispatch(setShowModalForm(showModal))
    };

    useEffect(() => {
        setData(user.Roles);
    }, [user])

    const getFormConfig=()=>{
        try {
            return  require('./../tabsBlocks/roles/formConfig').default;
        }catch (e) {
            console.log('e',e)
            /**
             * no form config
             */
            return false;
        }
    };

    const removeItem = (e, apiType, itemId) => {
        e.preventDefault();
        apiUsers.remove(itemId,`/role/${user.id}`).then(res => {
                getUser();
            }).catch(err => console.log('err', err));
    };

    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);

        let object = {};
        formData.forEach(function(value, key){
            object[key] = IsJsonString(value) ? JSON.parse(value) : value;
        });
        formData = object;

        apiUsers.put(formData,`/${id}`).then(response => {
            getUser();
            showForm(false);
            console.log('user response', response);
        });
    };

    return <div className="catalog__content-wrap">
        <div className="row">
            <div className="col-12 col-md-6 col-xl-4 offset-0  mb-40">
                <ColumnHeader title={t('Roles:')} button={type && id} setModalShow={showForm}/>
                <div className="column-group">
                    {data && data.map((item, index) => {
                        return <PreferredItem key={item.name} label={item.name} itemId={item.id} removeIcon={type && id} removeItem={removeItem}/>
                    })}
                </div>
            </div>
        </div>
        <SideModalWrapper
            showModal={!!showModal}
            setShowModal={showForm}
            modalClass={'modal__role permissions__modal'}
        >
            <Form onSubmit={submit} formConfig={getFormConfig()} showForm={showForm} data={data} />
        </SideModalWrapper>
    </div>
};

export default RolesTab;
