import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import getCroppedImage from "../../../../utils/getCroppedImage";
import apiEmployees from "../../../../api/employees";
import apiFreelancers from "../../../../api/freelancers";
import { useTranslation } from "react-i18next";
import apiClients from "../../../../api/clients";

const defaultSrc = "/images/user_placeholder.jpg";

const AvatarImageInput = ({ src, user, userType, setModalShow, getUser }) => {
  const { t } = useTranslation();

  const [avatar, setAvatar] = useState(src);
  const [filename, setFileName] = useState(false);
  const [filetype, setFileType] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [rotation, setRotation] = useState(0);

  const ref = useRef();
  const submitButton = useRef();

  const saveAvatar = (e, value) => {
    let avatar = URL.createObjectURL(e.target.files[0]);

    setFileName(e.target.files[0].name);
    setFileType(e.target.files[0].type);
    setAvatar(avatar);
    // submitButton.current.click()
  };

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const save = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    let cropped = avatar;
    try {
      cropped = await getCroppedImage(
        avatar,
        croppedAreaPixels,
        rotation,
        filetype
      );
    } catch (e) {
      console.error(e);
    }

    formData.append("avatar", cropped, filename || "avatar.jpeg");

    let api = user.Employee
      ? apiEmployees
      : user.Freelancer
      ? apiFreelancers
      : apiClients;
    await api.put(formData, `/${user[userType].id}`).then((r) => {
      console.log(r);
    });
    setModalShow(false);
    await getUser();
  };
  const deletePhoto = (e) => {
    e.preventDefault();
    setAvatar(defaultSrc);

    if (user[userType]?.avatar?.id) {
      let api = user.Employee
        ? apiEmployees
        : user.Freelancer
        ? apiFreelancers
        : apiClients;
      if (api) {
        api
          .remove(user[userType]?.avatar?.id, "/files")
          .then((res) => {
            getUser();
          })
          .catch((err) => console.log("err", err));
      }
    }
  };

  return (
    <div className="edit-avatar-tool js-edit-avatar-tool">
      <div className="edit-avatar-tool__title">
        <h3>{t("Renew profile image:")}</h3>
      </div>
      <form action="" onSubmit={save}>
        <label className="edit-avatar-tool__placeholder">
          <div className="edit-avatar-tool__placeholder-wrap">
            <input
              className="input--alabaster input--hidden"
              type="file"
              name="photo"
              ref={ref}
              accept="image/*"
            />
            <h4 className="font-semibold text-alto">
              {t("Upload a new image")}
            </h4>
          </div>
        </label>
        <div className="edit-avatar-tool__image-box">
          {/*<img className="edit-avatar-tool__image" src={avatar || src} alt="avatar"/>*/}
          <div
            className="crop-container"
            style={{
              position: "relative",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Cropper
              className="edit-avatar-tool__image"
              image={avatar}
              crop={crop}
              zoom={zoom}
              aspect={1}
              minZoom={1}
              maxZoom={5}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid={false}
              style={{
                mediaStyle: {
                  width: "100%",
                },
              }}
            />
          </div>
        </div>
        <div className="edit-avatar-tool__change">
          <h5>
            {t("Change size ")}
            <span className="text-surfie-green edit-avatar-tool__number">
              {(zoom * 100 - 100).toFixed()}
            </span>
          </h5>
        </div>
        <div className="edit-avatar-tool__range">
          <div className="input-range js-input-range">
            <div className="input-range__minus">
              <svg
                className="svg-icon svg-icon--surfie-green"
                width="14"
                height="2"
              >
                <use
                  href="/images/svg/svg-sprite/symbol/sprite.svg#minus"
                  x="0"
                  y="0"
                ></use>
              </svg>
            </div>
            <div className="input-range__wrap">
              <input
                className="input input--alabaster input-range__input edit-avatar-tool__range-input"
                type="range"
                value={zoom}
                min="1.00"
                max="2"
                step="0.01"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
              />
              <div className="input-range__line"></div>
            </div>
            <div className="input-range__plus">
              <svg
                className="svg-icon svg-icon--surfie-green"
                width="14"
                height="14"
              >
                <use
                  href="/images/svg/svg-sprite/symbol/sprite.svg#plus"
                  x="0"
                  y="0"
                ></use>
              </svg>
            </div>
          </div>
        </div>
        <div className="edit-avatar-tool__buttons">
          <div className="edit-avatar-tool__buttons-left">
            <button
              className="button button--transparent edit-avatar-tool__delete"
              onClick={(e) => deletePhoto(e)}
              type="button"
            >
              {t("Delete current photo")}
            </button>
          </div>
          <div className="edit-avatar-tool__buttons-right">
            <div className="button-group">
              <label className="button button--alabaster button-group__button edit-avatar-tool__upload">
                <input
                  className="input--alabaster input--hidden"
                  type="file"
                  name="photo"
                  ref={ref}
                  accept="image/*"
                  onChange={saveAvatar}
                />
                <span>{t("Upload new")}</span>
                <svg
                  className="svg-icon svg-icon--surfie-green button__icon"
                  width="10"
                  height="10"
                >
                  <use
                    href="/images/svg/svg-sprite/symbol/sprite.svg#plus"
                    x="0"
                    y="0"
                  ></use>
                </svg>
              </label>
              <button
                className="button button--surfie-green button-group__button"
                data-modal-close="edit-avatar-modal"
                type="submit"
                ref={submitButton}
              >
                {t("Apply")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

AvatarImageInput.defaultProps = {
  src: defaultSrc,
};
AvatarImageInput.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AvatarImageInput;
