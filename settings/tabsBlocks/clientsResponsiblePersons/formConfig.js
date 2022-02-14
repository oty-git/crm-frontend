import { getI18n, Trans } from "react-i18next";
import React from "react";
import apiEmployees from "../../../../../api/employees";
const i18n = getI18n();
export default {
  id: {
    type: "select",
    label: <Trans>Responsible Persons</Trans>,
    api: apiEmployees,
    multiple: true,
    placeholder: i18n.t("Choose person"),
    dataName: "Employees",
    innerValueGet:'Employee',
    imageGet:'avatar.disk_name'
  },
};
