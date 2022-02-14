import apiRoles from "../../../../../api/roles";
import {getI18n, Trans} from 'react-i18next';
import React from "react";
const i18n = getI18n();
export default {

    id: {
        type: 'select',
        label:<Trans>Roles</Trans>,
        api: apiRoles,
        multiple: true,
        placeholder: i18n.t('Choose role'),
        dataName: 'Roles',
    },
}
