import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RowActions from "./RowActions";
import user_statuses from "../../../../constants/user_statuses";
import { useTranslation } from "react-i18next";
import isEmpty from "../../../../functions/is-empty";

const TableRow = ({ user, type, deleteItem }) => {
  const { t } = useTranslation();

  const [status, setStatus] = useState({});
  const [userServices, setUserServices] = useState({});

  useEffect(() => {
    getUserStatus();
    getUserServices();
  }, [user, type]);

  const getUserStatus = () => {
    setStatus(
      user && user.User && user.User.status
        ? user_statuses[user.User.status]
        : {}
    );
  };

  const getUserServices = () => {
    setUserServices(user ? user.AccountToServices : {});
  };


  return (
    <tr className="js-table-tr">
      <td>
        <div className="id__info">
          <p>{user.id}</p>
        </div>
      </td>
      <td>
        <Link
          to={`/account/${type}/${user.User.id}`}
          className="row-group row-group--sm row-group--align-center row-group--nowrap"
        >
          <div className="row-group__item">
            <div className="avatar">
              <figure
                style={{ backgroundImage: `url("${user?.avatar?.disk_name}")` }}
              />
            </div>
          </div>
          <div className="row-group__item">
            {type !== "clients" ? (
              <p className="font-bold">{user.name}</p>
            ) : (
              !isEmpty(user.ClientsBillings) && (
                <p className="font-bold">{user.PrimaryBillings?.company || (`${user.PrimaryBillings?.name} ${user.PrimaryBillings?.surname}`)}</p>
              )
            )}
          </div>
        </Link>
      </td>
      <td>
        {type === "freelancers" ? (
          <button
            className="button button--no-events button--border-caribbean-green"
            type="button"
          >
            {t("Freelance")}
          </button>
        ) : type === "employee" ? (
          <button
            className="button button--no-events button--border-surfie-green"
            type="button"
          >
            {t("Full time")}
          </button>
        ) : (
          <button
            className="button button--no-events button--border-surfie-green"
            type="button"
          >
            {t("Client")}
          </button>
        )}
      </td>
        {type !== "clients" &&

            <td className="centered__table--content">
                <div className="row-group row-group--sm row-group--nowrap row-group--align-center services__table--row">
                    {userServices &&
                    userServices.length > 0 &&
                    userServices.map((service, index) => {
                        return (
                            service.Service && (
                                <ServicesItem key={index} service={service.Service}/>
                            )
                        );
                    })}
                </div>
            </td>
        }
        {type !== "clients" &&

        <td>
            <div className="row-group row-group--sm row-group--nowrap row-group--align-center">
              <LanguagesItem services={userServices} />
            </div>
        </td>
        }

        <td className="centered__table--content">
        <div className="waiting__block">
          <p className={"font-semibold " + status["class"]}>
            {status["label"]}
          </p>
        </div>
      </td>
      <td className="centered__table--content">
        <RowActions user={user}  deleteItem={deleteItem}/>
      </td>
    </tr>
  );
};

export default TableRow;

const ServicesItem = ({ service }) => {
  return (
    <div className="row-group__item">
      <img src={service.icon?.disk_name} alt={service.name} />
    </div>
  );
};

const LanguagesItem = ({ services }) => {
  const [clicked, setClicked] = useState(false);

  const getString = (count = -1) => {
    return services && services.length
      ? services
          .map((service, index) => {
            return service?.AccountServicesLanguages.map((language) => {
              return (
                language?.language_from?.code?.toUpperCase() +
                (language?.language_to
                  ? "-" + language?.language_to?.code?.toUpperCase()
                  : "")
              );
            });
          })
          .flat()
          .slice(0, count)
          .join(", ")
      : [];
  };
  const shortString = getString(2);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="row-group__item">
        <div>
          <p>{shortString}</p>
        </div>
      </div>
      {shortString && (
        <div className="row-group__item">
          <div
            className="dropdown lang-combinations-dropdown js-dropdown"
            data-dropdown="notifications"
          >
            <div
              className={
                "dropdown__toggle lang-combinations-dropdown__toggle" +
                (clicked ? " is-active" : "")
              }
              onClick={(e) => setClicked(!clicked)}
            >
              <svg
                className="svg-icon svg-icon--surfie-green lang-combinations-dropdown__toggle-icon"
                width="8"
                height="6"
              >
                <use
                  href="/images/svg/svg-sprite/symbol/sprite.svg#three-dots"
                  x="0"
                  y="0"
                ></use>
              </svg>
            </div>
            <div
              className="dropdown__box lang-combinations-dropdown__box"
              style={{ display: clicked ? "block" : "none" }}
            >
              <div className="column-group column-group--xs">
                <div className="column-group__item">
                  <p className="font-semibold">{t("All combinations:")}</p>
                </div>
                <div className="column-group__item">
                  <p>{getString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
