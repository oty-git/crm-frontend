import React, { useEffect, useState } from "react";
import GeneralTabHeader from "../tabsBlocks/GeneralTabHeader";
import ContentBlock from "../ContentBlock";
import { useTranslation } from "react-i18next";
import formConfigClient from "../tabsBlocks/formConfigClient";
import isEmpty from "../../../../functions/is-empty";
import Form from "../../../common/form/Form";
import SideModalWrapper from "../../../common/modals/SideModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setShowModalForm } from "../../../../store/actions/init";
import IsJsonString from "../../../../functions/isJson";
import apiUsers from "../../../../api/users";
import apiClientsBillings from "../../../../api/clients_billings";

const ClientGeneralTab = ({ client, user, userType, getUser, ...props }) => {
  const details = formConfigClient.details;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.init.showModalForm);
  const [data, setData] = useState(user.Roles);
  const [row, setRow] = useState(false);

  const showForm = (showModal, row = false) => {
    dispatch(setShowModalForm(showModal));
    setRow(row);
  };


  useEffect(() => {
    setData(user.Roles);
  }, [user]);

  const getFormConfig = () => {
    try {
      let conf = require("./../tabsBlocks/clients_billings/formConfig").default;
      return conf;
    } catch (e) {
      console.log("e", e);
      /**
       * no form config
       */
      return false;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    let object = {};
    formData.forEach(function (value, key) {
      object[key] = IsJsonString(value) ? JSON.parse(value) : value;
    });
    formData = object;
    formData.clients_id = user.Client.id;

    apiClientsBillings
      .put(formData, row ? `/${row.id}` : "", e)
      .then((response) => {
        getUser();
        showForm(false);
      });
  };

  return (
    <div className="catalog__content-wrap">
      <div className="row">
        <div className="catalog__content-wrap">
          <div className="row">
            <GeneralTabHeader
              user={user}
              userType={userType}
              setModalShow={showForm}
              {...props}
            />
            <div className="wrapper__general--info settings__general--info">
              {user.Client &&
                !isEmpty(user.Client) &&
                user.Client.ClientsBillings.map((item, index) => {
                  return (
                    <div className="general__block" key={item.id}>
                      <ContentBlock
                        getUser={getUser}
                        user={user}
                        key={item.id}
                        items={details}
                        client={user}
                        index={index}
                        userType={userType}
                        accountType={true}
                      />
                    </div>
                  );
                })}
            </div>
            <SideModalWrapper
              showModal={!!showModal}
              setShowModal={showForm}
              modalClass={"modal__role permissions__modal"}
            >
              {!!showModal && (
                <Form
                  onSubmit={submit}
                  formConfig={getFormConfig()}
                  showForm={showForm}
                  data={row}
                  formName={t("CREATE")}
                />
              )}
            </SideModalWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientGeneralTab;
