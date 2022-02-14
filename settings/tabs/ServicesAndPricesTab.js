import React from "react";
import ServiceFormModalContent from "../tabsBlocks/services/ServiceFormModalContent";
import SideModalWrapper from "../../../common/modals/SideModalWrapper";
import TdMoreItems from "../tabsBlocks/services/TdMoreItems";
import apiAccountServices from "../../../../api/accountServices";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";

const ServicesAndPricesTab = ({user, userType,modalService,setModalService,...props}) => {
    const services = user[userType] ? user[userType]['AccountToServices'] : {};

    const {type, id} = useParams();

    const deleteService=(e,item)=>{
        e.preventDefault();
        apiAccountServices.remove(item.id).then((res)=>{
            props.getUser();
        })

    };
    const {t} = useTranslation();

    return <React.Fragment>
        <div className="mb-40">
            <div className="upload__block service__creation"
                 style={{
                     display: 'flex',
                     justifyContent: "flex-end",
                 }}>
            </div>
            <div className="table-holder table__stat overflow-visible">
                <table className="table">
                    <TableHead actions={!!(type&&id)}/>
                    <tbody>
                    {services && services.length > 0 && services.map((item, index) => {
                        return <TableRow actions={!!(type&&id)} key={index} service={item} setModalService={setModalService} deleteItem={deleteService}/>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="catalog__content-wrap">
            <div className="row">
                <div className="col-12 col-xxl-11 offset-0 offset-xxl-1">
                    {!(type&&id) &&

                    <p className="font-semibold">{t('Have you learn to do new services?')}<br/>
                        <a href="#" className="text-boston-blue">{t('Contact')}</a>
                        {t(" the project manager to update your pricing & services list.")}
                    </p>
                    }

                </div>
            </div>
        </div>

        <SideModalWrapper
            showModal={!!modalService}
            setShowModal={setModalService}
            modalClass={'modal__create'}
        >
            <ServiceFormModalContent modalService={modalService}  setModal={setModalService} user={user} userType={userType} {...props}/>
        </SideModalWrapper>
    </React.Fragment>
};

export default ServicesAndPricesTab;

const TableRow = ({service,setModalService,deleteItem,actions}) => {


    const updateItem=(e)=>{
        e.preventDefault();
        setModalService(service)
    };

    return <tr>
                <td className="main__stat">
                    <div className="icon-title">
                        <div className="icon-title__icon"><img src={service?.Service?.icon?.disk_name}/></div>
                        <div className="icon-title__title">
                            <p>{service?.Service?.name}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div>
                        <p>
                            {
                                service?.AccountServicesLanguages.map(language=>{
                                    return language?.language_from?.code?.toUpperCase()+ (  language?.language_to ? '-'+language?.language_to?.code?.toUpperCase() : '')
                                }).join(', ')
                            }
                        </p>
                    </div>
                </td>
                <td>
                    <p>{service.price_calculation_type.toUpperCase()}</p>
                </td>
                <td>
                    <p>{service?.AccountServicesLanguages[0]?.price} EUR</p>
                </td>
                <TdMoreItems data={service?.AccountServicesUrgencies} name={'urgency'} value={'fee'}/>
                <TdMoreItems data={service?.AccountServicesDiscounts} name={'repetitions'} value={'discount'}/>
                {!!actions &&
                <td>
                    <div className={"row-group row-group--nowrap row-group--sm justify-space-around"}>
                        <a href="" onClick={(e)=>updateItem(e)}><img src="/images/editgrey.svg" alt=""/></a>
                        <a href="" onClick={(e)=>deleteItem(e,service)}><img src="/images/deleteicon.svg" alt=""/></a>
                    </div>
                </td>
                }
            </tr>
};

const TableHead = ({actions}) => {
    const {t} = useTranslation();

    return <thead>
                <tr>
                    <th>
                        <h5>{t('Services:')}</h5>
                    </th>
                    <th>
                        <h5>{t('Language pair:')}</h5>
                    </th>
                    <th>
                        <h5>{t('Matt:')}</h5>
                    </th>
                    <th>
                        <h5>{t('Rate:')}</h5>
                    </th>
                    <th>
                        <h5>+ {t("fee")}/ -%</h5>
                    </th>
                    <th>
                        <h5>{t('Repetitions:')}</h5>
                    </th>
                    {!!actions &&
                    <th>
                        <h5>{t('Actions:')}</h5>
                    </th>
                    }
                </tr>
                </thead>
};

TableRow.defaultProps={
    actions:true
};
TableHead.defaultProps={
    actions:true
};
