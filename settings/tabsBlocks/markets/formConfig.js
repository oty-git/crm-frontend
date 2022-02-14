import { getI18n, Trans } from "react-i18next";
import React from "react";
import apiMarkets from "../../../../../api/markets";
const i18n = getI18n();
export default {
  markets_id: {
    type: "select",
    label: <Trans>Markets</Trans>,
    api: apiMarkets,
    multiple: false,
    placeholder: i18n.t("Choose market"),
    dataName: "Markets",
  },
};
