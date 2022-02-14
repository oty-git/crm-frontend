import React from "react";
import moment from "moment";
import { useState } from "react";
import ModalChangePassword from "../../../common/modals/password/ModalChangePassword";
import ModalEditAvatar from "../../../common/modals/ModalEditAvatar";
import { useTranslation } from "react-i18next";
import isEmpty from "../../../../functions/is-empty";

const GeneralTabHeader = ({
  client,
  user,
  userType,
  setModalShow,
  ...props
}) => {
  const userName = user && user[userType] ? user[userType].name : "";
  const [modalChangePassword, setModalChangePassword] = useState(false);
  const [modalEditAvatar, setModalEditAvatar] = useState(false);
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="mb-30">
          <div className="column-group column-group--sm column-group--justify-items-center profile__head">
            <div className="left__profile">
              <div className="column-group__item">
                <div className="edit-avatar">
                  <div className="avatar avatar--xl">
                    {!!(user && user[userType]) && (
                      <figure
                        style={{
                          backgroundImage: `url("${user[userType]?.avatar?.disk_name}")`,
                        }}
                      ></figure>
                    )}
                  </div>
                  <div className="edit-avatar__button">
                    <button
                      className="button button--round button--alabaster"
                      type="button"
                      onClick={(e) => setModalEditAvatar(true)}
                    >
                      <svg
                        className="svg-icon svg-icon--surfie-green"
                        width="18"
                        height="16"
                      >
                        <use
                          href="/images/svg/svg-sprite/symbol/sprite.svg#camera"
                          x="0"
                          y="0"
                        ></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="column-group__item name__profile">
                <div className="head__title--profile">
                  {user && !isEmpty(user) && user.Client ? (
                    <h6>{user.Client.PrimaryBillings?.company}</h6>
                  ) : (
                    <h6>{userName}</h6>
                  )}
                  <p>
                    {t("Member since: ")}{" "}
                    {user && moment(user.createdAt).format("YYYY-MM-DD")}
                  </p>
                </div>
                <div className="controls__employee__settings">
                  <div className="column-group__item">
                    {user.Client && !isEmpty(user.Client) && (
                      <div className="parent__company--button">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setModalShow(true);
                          }}
                        >
                          {t("Parent company")}
                          <span>
                            <img src="/images/plus.svg" alt="plus" />
                          </span>
                        </a>
                      </div>
                    )}
                    {(user.Employee || user.Freelancer) && (
                      <div
                        className="link"
                        data-modal-open="password-change-modal"
                        onClick={(e) => setModalChangePassword(true)}
                      >
                        {t("Reset password form")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalChangePassword
        user={user}
        showEmail={false}
        showForgotButton={true}
        modalShow={modalChangePassword}
        setModalShow={setModalChangePassword}
      />
      <ModalEditAvatar
        {...props}
        modalShow={modalEditAvatar}
        setModalShow={setModalEditAvatar}
        user={user}
        userType={userType}
        src={user ? user[userType]?.avatar?.disk_name : ""}
      />
    </React.Fragment>
  );
};
export default GeneralTabHeader;
