import React from "react";
import ColumnHeader from "./ColumnHeader";
import InfoListItem from "./tabsBlocks/InfoListItem";
import isEmpty from "../../../functions/is-empty";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import DetailsPicker from "./tabsBlocks/DetailsPicker";
import apiEmployees from "../../../api/employees";
import apiFreelancers from "../../../api/freelancers";
import apiClientsBillings from "../../../api/clients_billings";

const ContentBlock = ({
  client,
  index,
  title,
  items,
  user,
  getUser,
  userType,
  accountType,
  headerButton,
}) => {
  const { type, id } = useParams();
  const { t } = useTranslation();

  const getClientsBillingsValue = (key) => {
    let keyValue;
    switch (key) {
      // case "email":
      //   keyValue = client?.email;
      //   break;
      // case "country":
      //   keyValue = client.Client.Market?.name;
      //   break;
      default:
        keyValue = client.Client.ClientsBillings[index][key];
    }
    return keyValue;
  };



  const saveValue = async (name,newValue) => {
    if (!newValue) return null;
    let formData = new FormData();
    formData.append(name, newValue);
    let api;
    let id;
    switch (userType) {
      case "Employee":
        api = apiEmployees;
        break;
      case "Freelancer":
        api = apiFreelancers;
        break;
      case "Client":
        api = apiClientsBillings;
        id = user.Client.ClientsBillings[index]?.id;
        break;
    }


    let url  = id ? `/${id}` :  `/${user[userType].id}`;

    await api.put(formData, url);

  };




  return (
    <React.Fragment>
      <ColumnHeader title={title} button={headerButton} />
      <div className="info-list">
        {!client && accountType && (
          <InfoListItem
            user={user}
            userType={userType}
            label={t("Account type:")}
            value={t(userType)}
          />
        )}
        {user &&
          !user.Client &&
          items &&
          !isEmpty(items) &&
          user[userType] &&
          Object.keys(items).map((key, index) => {
            return (
              <InfoListItem
                user={user}
                userType={userType}
                key={index}
                inputName={key}
                label={items[key].label}
                value={user[userType][key]}
                editable={items[key].editable && type && id}
                saveValue={saveValue}

              />
            );
          })}
        {client && !isEmpty(client) && items && !isEmpty(items) && (
          <DetailsPicker client={client} index={index} getUser={getUser} />
        )}
        {client &&
          !isEmpty(client) &&
          items &&
          !isEmpty(items) &&
          Object.keys(items).map((key, index) => {
            return (
              <InfoListItem
                user={user}
                index={index}
                userType={userType}
                key={index}
                inputName={key}
                label={items[key].label}
                value={getClientsBillingsValue(key)}
                editable={items[key].editable && type && id}
                saveValue={saveValue}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
};
export default ContentBlock;
