import React, { useEffect, useState } from "react";
import RadioButton from "../../../common/blocks/RadioButton";
import { useTranslation } from "react-i18next";
import apiClientsBillings from "../../../../api/clients_billings";
import apiUsers from "../../../../api/users";

const DetailsPicker = ({ client, index, getUser }) => {
  const { t } = useTranslation();

  const [selectedRadio, setSelectedRadio] = useState(
    client.Client["ClientsBillings"][index]?.primary === 1 ? "1" : "0"
  );


  useEffect(()=>{
    setSelectedRadio(client.Client["ClientsBillings"][index]?.primary === 1 ? "1" : "0");
  },[client]);

  const changeValue = async (e) => {
    const id = client.Client.ClientsBillings[index].id;

    client.Client["ClientsBillings"][index].primary = +e.target.value;
    setSelectedRadio(e.target.value);

    let formData = {
      primary : e.target.value,
    };
    await apiClientsBillings.put(formData, `/${id}`);
    await getUser();
  };

  return (
    <>
      <div className="info-list__item">
        <div className="info-list__left">
          <h4>Details #{index + 1}</h4>
        </div>
        <div className="info-list__right info__remove">
          <RadioButton
            value={1}
            label={t("Primary")}
            selected={selectedRadio}
            changeValue={changeValue}
          />
        </div>
      </div>
    </>
  );
};
export default DetailsPicker;
