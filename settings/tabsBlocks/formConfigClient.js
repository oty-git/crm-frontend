import { Trans } from "react-i18next";

export default {
  details: {
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
    email: {
      label: <Trans>Email</Trans>,
      type: "string",
      editable: true,
    },
    country: {
      label: <Trans>Country</Trans>,
      translate: false,
      editable: true,
    },
    address: {
      type: "text",
      label: <Trans>Address</Trans>,
      translate: false,
      editable: true,
    },
    additional_info: {
      type: "hidden",
      label: <Trans>Additional info</Trans>,
      translate: false,
      editable: true,
    },
  },
};
