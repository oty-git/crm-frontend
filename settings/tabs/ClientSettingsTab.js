import ColumnHeader from "../ColumnHeader";
import React, { useEffect, useState } from "react";
import InfoListItem from "../tabsBlocks/InfoListItem";
import SideModalWrapper from "../../../common/modals/SideModalWrapper";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Form from "../../../common/form/Form";
import apiClients from "../../../../api/clients";
import apiClientsResponsiblePersons from "../../../../api/clients_responsible_persons";
import { setShowModalForm } from "../../../../store/actions/init";
import { useDispatch } from "react-redux";
import IsJsonString from "../../../../functions/isJson";
import PreferredItem from "../tabsBlocks/PreferredItem";

const ClientSettingsTab = ({ user, userType, getUser }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { type, id } = useParams();
  const [modalPersons, setModalPersons] = useState(false);
  const [modalMarkets, setModalMarkets] = useState(false);
  const [dataMarket, setDataMarket] = useState(user.Client?.Market);
  const [dataResponsiblePersons, setDataResponsiblePersons] = useState(
    user.Client?.ClientsResponsiblePersons
  );

  const showForm = (showModal) => {
    dispatch(setShowModalForm(showModal));
  };

  useEffect(() => {
    setDataResponsiblePersons(user.Client?.ClientsResponsiblePersons);
  }, [user]);

  useEffect(() => {
    setDataMarket(user.Client?.Market);
  }, [user]);

  const getMarketsFormConfig = () => {
    try {
      return require("./../tabsBlocks/markets/formConfig").default;
    } catch (e) {
      console.log("e", e);
      /**
       * no form config
       */
      return false;
    }
  };

  const getPersonsFormConfig = () => {
    try {
      return require("./../tabsBlocks/clientsResponsiblePersons/formConfig").default;
    } catch (e) {
      console.log("e", e);
      /**
       * no form config
       */
      return false;
    }
  };

  if (!user) return null;



  const submitPersons = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let object = {};
    formData.forEach(function (value, key) {
      object[key] = IsJsonString(value) ? JSON.parse(value) : value;
    });
    formData = object;

    apiClients.put(formData, `/responsible_persons/${user[userType].id}`).then((response) => {
      getUser();
      showForm(false);
      setModalPersons(false);
    });
  };
  const submitMarket = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    apiClients.put(formData, `/${user[userType].id}`).then((response) => {
      getUser();
      showForm(false);
      setModalMarkets(false);
    });
  };


  const removeResponsibleItem=(e, apiType, itemId)=>{
    e.preventDefault();
    apiClientsResponsiblePersons.remove(itemId).then(res => {
      getUser();
    }).catch(err => console.log('err', err));
  };

  return (
    <div className="catalog__content-wrap">
      <div className="row">
        <div className="col-12 col-md-6 col-xl-3 mb-40">
          <ColumnHeader
            title={t("Responsible persons:")}
            button={type && id}
            setModalShow={setModalPersons}
          />
          <div className="info-list">
            <ClientsResponsiblePersons
                removeItem={removeResponsibleItem}
                data={user.Client.ClientsResponsiblePersons}
            />
          </div>
          <SideModalWrapper
            showModal={modalPersons}
            setShowModal={setModalPersons}
            modalClass={"modal__role permissions__modal"}
          >
            {!!modalPersons &&
            <Form
              onSubmit={submitPersons}
              formConfig={getPersonsFormConfig()}
              showForm={setModalPersons}
              data={dataResponsiblePersons}
            />
            }
          </SideModalWrapper>
        </div>
        <div className="col-12 col-md-6 col-xl-3 mb-40">
          <ColumnHeader
            title={t("Market:")}
            button={type && id}
            setModalShow={setModalMarkets}
            edit={user.Client.Market}
          />
          <div className="info-list">
            <MarketItem item={user.Client.Market} />
          </div>
          <SideModalWrapper
            showModal={modalMarkets}
            setShowModal={setModalMarkets}
            modalClass={"modal__role permissions__modal"}
          >
            {!!modalMarkets &&
              <Form
                  onSubmit={submitMarket}
                  formConfig={getMarketsFormConfig()}
                  showForm={setModalMarkets}
                  data={{markets_id:dataMarket.id || dataMarket}}
              />
            }
          </SideModalWrapper>
        </div>
      </div>
    </div>
  );
};

export default ClientSettingsTab;

const ClientsResponsiblePersons = ({ data , removeItem}) => {

  return (
      data && data.map((item, index) => {
        return <PreferredItem key={item.id} label={item.Employee.name} itemId={item.id} removeIcon={true} removeItem={removeItem}/>
      })
  );
};

const MarketItem = ({ item }) => {
  // const { type, id } = useParams();
  const { name: marketName } = item;
  const { name: currencyName } = item.Currency;

  return (
    <>
      <InfoListItem label={`Country:`} value={marketName} itemId={item.id} />
      <InfoListItem label={`Pricelist:`} value={""} itemId={item.id} />
      <InfoListItem label={`Currency:`} value={currencyName} itemId={item.id} />
    </>
  );
};
