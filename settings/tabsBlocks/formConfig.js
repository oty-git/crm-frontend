import {Trans} from "react-i18next";

export default {
    general_information: {
        name:{
            label: <Trans>Name:</Trans>,
            type:'string',
            editable: true,
        },
        email:{
            label: <Trans>Email:</Trans>,
            type:'string',
            editable: true,
        },
        phone:{
            label: <Trans>Phone:</Trans>,
            type:'string',
            editable: true,
        },
        languages_id:{
            label: <Trans>Native:</Trans>,
            type:'select',
            editable: true,
        },
        address:{
            label: <Trans>Address:</Trans>,
            type:'string',
            editable: true,
        },
        zip_code:{
            label: <Trans>Zip code:</Trans>,
            type:'string',
            editable: true,
        },
        city:{
            label: <Trans>City:</Trans>,
            type:'string',
            editable: true,
        },
        date_of_birth: {
            label: <Trans>Birth day:</Trans>,
            type: 'string',
            editable: true,
        },
        info:{
            label: <Trans>Additional:</Trans>,
            type:'string',
            editable: true,
        },
    },
    bank_information: {
        bank_account_holder: {
            label: <Trans>Holder type:</Trans>,
            type: 'string',
            editable: true,

        },
        bank_account_number: {
            label: <Trans>Bank No:</Trans>,
            type: 'string',
            editable: true,

        },
        bank_name: {
            label: <Trans>Bank:</Trans>,
            type: 'string',
            editable: true,

        },
        swift_number: {
            label: <Trans>Swift:</Trans>,
            type: 'string',
            editable: true,

        },
        bank_code: {
            label: <Trans>Bank Co:</Trans>,
            type: 'string',
            editable: true,
        },
        paypal_email: {
            label: <Trans>Paypal:</Trans>,
            type: 'string',
            editable: true,
        },
    }

}
