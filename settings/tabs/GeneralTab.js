import React from "react";
import GeneralTabHeader from "../tabsBlocks/GeneralTabHeader";
import formConfig from "../tabsBlocks/formConfig";
import ContentBlock from "../ContentBlock";
import { useTranslation } from "react-i18next";

const GeneralTab = ({ user, userType, ...props }) => {
  const generalInfo = formConfig.general_information;
  const bankInfo = formConfig.bank_information;
  const { t } = useTranslation();

  console.log("user !!!", user);

  return (
    <div className="catalog__content-wrap">
      <div className="row">
        <div className="catalog__content-wrap">
          <div className="row">
            <GeneralTabHeader user={user} userType={userType} {...props} />
            <div className="wrapper__general--info settings__general--info">
              <div className="general__block">
                <ContentBlock
                  title={t("General information:")}
                  items={generalInfo}
                  user={user}
                  userType={userType}
                  accountType={true}
                />
              </div>
              <div className={"bank__block"}>
                <ContentBlock
                  title={t("Bank information:")}
                  items={bankInfo}
                  user={user}
                  userType={userType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
