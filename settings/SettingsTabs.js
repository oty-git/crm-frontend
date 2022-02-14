import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const SettingsTabs = ({ setActiveTab, tabsList }) => {
  return (
    <div className="settings-page__catalog">
      <div className="catalog">
        <Tabs onSelect={(tabIndex) => setActiveTab(tabIndex)}>
          <div className="catalog__header">
            <TabList className={'catalog__tabs tabs js-tabs"'}>
              {tabsList &&
                tabsList.map((item, index) => {
                  return (
                    <Tab
                      key={index}
                      className="catalog__tab js-tabs-tab"
                      selectedClassName={"is-active"}
                    >
                      <div className="catalog__tab-title">{item.label}</div>
                    </Tab>
                  );
                })}
            </TabList>
          </div>
          <div className={"catalog__box"}>
            <div className={"catalog__content"}>
              {tabsList &&
                tabsList.map((item, index) => {
                  // console.log("item===", item.tab);

                  return (
                    <TabPanel
                      key={index}
                      className={
                        "catalog__content-item tabs__content js-tabs-content"
                      }
                    >
                      {item.tab}
                    </TabPanel>
                  );
                })}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsTabs;
