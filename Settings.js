import React from "react";
import SettingsPageWrap from "./settings/SettingsPageWrap";
import { useParams } from "react-router-dom";
import ClientSettingsPageWrap from "./settings/ClientSettingsPageWrap";

const Settings = () => {
  const { type } = useParams();
  return type === "clients" ? <ClientSettingsPageWrap /> : <SettingsPageWrap />;
};

export default Settings;
