import React from "react";
import TableRow from "./TableRow";
import { useTranslation } from "react-i18next";

const TableContent = ({ users, type, deleteItem }) => {
  return (
    <div
      className="catalog__content-item tabs__content js-tabs-content employers__table--content is-active employers__table--content"
      data-content="employees"
    >
      <div className="table-holder">
        <table className="table js-table table--with-checkbox">
          <TableHead type={type} />
          <tbody>
            {users &&
              users.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    user={item}
                    type={type}
                    deleteItem={deleteItem}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContent;

const TableHead = ({ type }) => {
  const { t } = useTranslation();

  return (
    <thead>
      <tr>
        <th>{t("ID:")}</th>
        <th>
          <div
            className="dropdown name-select-dropdown js-dropdown js-name-select-dropdown"
            data-dropdown="name-select-dropdown"
          >
            <div className="">
              <div className="">
                {type !== "clients" ? (
                  <h5>{t("Name Surname")}</h5>
                ) : (
                  <h5>{t("Company name")}</h5>
                )}
              </div>
            </div>
            <div className="dropdown__box name-select-dropdown__box">
              <div className="name-select-dropdown__buttons">
                <div
                  className="name-select-dropdown__button"
                  data-action="select"
                  data-dropdown-close="name-select-dropdown"
                >
                  {t("Select all")}
                </div>
                <div
                  className="name-select-dropdown__button"
                  data-action="deselect"
                  data-dropdown-close="name-select-dropdown"
                >
                  {t("Deselect all")}
                </div>
              </div>
            </div>
          </div>
        </th>
        <th>
          <h5>{t("Acc type:")}</h5>
        </th>
        {type !== "clients" &&
        <th className="centered__table">
          <h5>{t("Services:")}</h5>
        </th>
        }
        {type !== "clients" &&
        <th><h5>{t("Languages")}</h5></th>
        }
        <th className="centered__table">
          <h5>{t("Status")}</h5>
        </th>
        <th className="centered__table">
          <h5>{t("Action")}</h5>
        </th>
      </tr>
    </thead>
  );
};
