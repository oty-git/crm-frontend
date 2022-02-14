import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TableFilterIcon from "./TableFilterIcon";
import TableContent from "./TableContent";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { setShowModalForm } from "../../../../store/actions/init";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../common/form/Form";
import SideModalWrapper from "../../../common/modals/SideModalWrapper";

const TableCatalog = ({
  users,
  title,
  type,
  formConfig,
  formToJson = false,
  getUsersByType,
  api
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const [usersObj, setUsersObj] = useState({
    approvedUsers: [],
    waitingUsers: [],
    rejectedUsers: [],
  });

  // const [data, setData] = useState([]);
  const showModal = useSelector((state) => state.init.showModalForm);
  const [row, setRow] = useState(false);

  const getData = () => {
    setLoading(true);
    getUsersByType();
    setLoading(false);
  };

  useEffect(() => {
    filterUsersForTabs();
  }, [users]);

  const filterUsersForTabs = () => {
    if (users && users.rows) {
      let approvedUsers = [];
      let waitingUsers = [];
      let rejectedUsers = [];
      users.rows.map((item) => {
        if (item.User && item.User.status) {
          switch (item.User.status) {
            case "approved":
            case "temporary_approve":
              approvedUsers.push(item);
              break;
            case "waiting_for_approval":
              waitingUsers.push(item);
              break;
            case "rejected":
            case "archived":
              rejectedUsers.push(item);
              break;
          }
        }
      });
      setUsersObj({
        approvedUsers: approvedUsers,
        waitingUsers: waitingUsers,
        rejectedUsers: rejectedUsers,
      });
    }
  };

  let tabsList = [
    { label: t(title), count: usersObj.approvedUsers.length },
    { label: t("Registrations"), count: usersObj.waitingUsers.length },
    { label: t("Archived & Rejected"), count: usersObj.rejectedUsers.length },
  ];

  const showForm = (showModal, row = false) => {
    dispatch(setShowModalForm(showModal));
    setRow(row);
  };

  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    api.put(formData, row ? `/${row.id}` : "", e).then((response) => {
      if (response && response.success) {
        dispatch(setShowModalForm(false));
        getData();
        filterUsersForTabs();
      }
    });
  };

  const deleteItem = (id) => {
    api.remove(id).then((res) => {
      getData();
    });
  };

  return (
    <div className="employers-page__catalog">
      <div className="catalog">
        <Tabs>
          <div className="catalog__header">
            <TabList className="catalog__tabs tabs js-tabs">
              {tabsList &&
                tabsList.map((item, index) => {
                  return (
                    <Tab
                      key={index}
                      className={"catalog__tab js-tabs-tab"}
                      selectedClassName={"is-active"}
                    >
                      <div className="catalog__tab-title">
                        {item.label}
                        <span className="unread catalog__tab-unread">
                          {item.count}
                        </span>
                      </div>
                    </Tab>
                  );
                })}
            </TabList>
            <TableFilterIcon type={type} onCreateClientClick={showForm} />
          </div>
          <div className={"catalog__box"}>
            <div className={"catalog__content"}>
              <TabPanel>
                <TableContent
                  type={type}
                  users={usersObj.approvedUsers}
                  deleteItem={deleteItem}
                />
              </TabPanel>
              <TabPanel>
                <TableContent
                  type={type}
                  users={usersObj.waitingUsers}
                  deleteItem={deleteItem}
                />
              </TabPanel>
              <TabPanel>
                <TableContent
                  type={type}
                  users={usersObj.rejectedUsers}
                  deleteItem={deleteItem}
                />
              </TabPanel>
            </div>
          </div>
        </Tabs>
        <SideModalWrapper
          showModal={!!showModal}
          setShowModal={showForm}
          modalClass={"modal__role permissions__modal"}
        >
          {!!showModal && (
            <Form
              onSubmit={submit}
              formConfig={formConfig}
              showForm={showForm}
              data={row}
              formName={t("Create client")}
            />
          )}
        </SideModalWrapper>
      </div>
    </div>
  );
};

export default TableCatalog;
