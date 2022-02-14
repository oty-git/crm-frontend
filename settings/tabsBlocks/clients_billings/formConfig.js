import { Trans } from "react-i18next";

export default {
  clients_id: {
    type: "hidden",
    label: <Trans>Client id</Trans>,
    translate: false,
    editable: true,
  },
  primary: {
    type: "hidden",
    label: <Trans>Primary</Trans>,
    translate: false,
    editable: true,
    default: 0,
  },
  name: {
    type: "text",
    label: <Trans>Name</Trans>,
    translate: false,
    editable: true,
  },
  email: {
    label: <Trans>Email</Trans>,
    type: "string",
    editable: true,
  },
  surname: {
    type: "text",
    label: <Trans>Surname</Trans>,
    translate: false,
    editable: true,
  },
  company: {
    type: "text",
    label: <Trans>Company</Trans>,
    translate: false,
    editable: true,
  },
  company_code: {
    type: "text",
    label: <Trans>Company code</Trans>,
    translate: false,
    editable: true,
  },
  vat: {
    type: "text",
    label: <Trans>VAT</Trans>,
    translate: false,
    editable: true,
  },
  phone: {
    type: "text",
    label: <Trans>Phone</Trans>,
    translate: false,
    editable: true,
  },
  address: {
    type: "text",
    label: <Trans>Address</Trans>,
    translate: false,
    editable: true,
  },
  zip_code: {
    type: "text",
    label: <Trans>ZIP code</Trans>,
    translate: false,
    editable: true,
  },
  city: {
    type: "text",
    label: <Trans>City</Trans>,
    translate: false,
    editable: true,
  },
  additional_info: {
    type: "hidden",
    label: <Trans>Additional info</Trans>,
    translate: false,
    editable: true,
  },
  country: {
    type: "text",
    label: <Trans>Country</Trans>,
    translate: false,
    editable: true,
  },
};
