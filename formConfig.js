import { Trans } from "react-i18next";
import apiMarkets from "../../api/markets";

export default {
  "ClientsBillings[0][primary]": {
    type: "hidden",
    label: <Trans>Primary details</Trans>,
    translate: false,
    defaultValue: 1,
  },
  "ClientsBillings[0][company]": {
    type: "text",
    label: <Trans>Company name</Trans>,
    translate: false,
  },
  "ClientsBillings[0][name]": {
    type: "text",
    label: <Trans>Name</Trans>,
    translate: false,
  },
  "ClientsBillings[0][surname]": {
    type: "text",
    label: <Trans>Surname</Trans>,
    translate: false,
  },
  "ClientsBillings[0][company_code]": {
    type: "text",
    label: <Trans>Company code</Trans>,
    translate: false,
  },
  "ClientsBillings[0][vat]": {
    type: "text",
    label: <Trans>VAT</Trans>,
    translate: false,
  },
  email: {
    type: "text",
    label: <Trans>Email</Trans>,
    translate: false,
  },
  "ClientsBillings[0][address]": {
    type: "text",
    label: <Trans>Address</Trans>,
    translate: false,
  },
  "ClientsBillings[0][phone]": {
    type: "text",
    label: <Trans>Phone Number</Trans>,
    translate: false,
  },
  "ClientsBillings[0][zip_code]": {
    type: "hidden",
    label: <Trans>ZIP code</Trans>,
    translate: false,
  },
  "ClientsBillings[0][city]": {
    type: "hidden",
    label: <Trans>City</Trans>,
    translate: false,
  },
  "ClientsBillings[0][additional_info]": {
    type: "hidden",
    label: <Trans>Additional info</Trans>,
    translate: false,
  },
  "ClientsBillings[0][country]": {
    type: "hidden",
    label: <Trans>Country</Trans>,
    translate: false,
  },
  markets_id: {
    type: "select",
    api: apiMarkets,
    label: <Trans>Market</Trans>,
    translate: false,
  },
};
