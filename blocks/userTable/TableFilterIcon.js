import React from "react";
import { useTranslation } from "react-i18next";

const TableFilterIcon = ({ type, onCreateClientClick }) => {
  const { t } = useTranslation();

  return (
    <div className="catalog__right catalog__right--ml-auto">
      <button
        className="button button--white button__filter"
        type="button"
        data-content-toggle-button="filters"
      >
        <svg
          className="svg-icon svg-icon--surfie-green button__icon"
          width="14"
          height="14"
        >
          <use
            href="/images/svg/svg-sprite/symbol/sprite.svg#filter"
            x="0"
            y="0"
          />
        </svg>
      </button>
      {type === "clients" ? (
        <div className="button new-client__button create__buttons">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCreateClientClick(true);
            }}
          >
            <span>
              <img src="/images/pluswhite.svg" alt="plus" />
            </span>
            {t("Create client")}
          </a>
        </div>
      ) : // <button className="button__new">Create client</button>
      null}
    </div>
  );
};

export default TableFilterIcon;
