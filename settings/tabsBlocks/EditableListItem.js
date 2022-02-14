import React, { useEffect, useRef, useState } from "react";

const EditableListItem = ({ value, name, saveValue }) => {
  const [clicked, setClicked] = useState(false);
  const [newValue, setNewValue] = useState(false);
  const [saveText, setSaveText] = useState("save");

  const node = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      console.log("name!!!!", name);
      // inside click
      return;
    }
    // outside click
    setClicked(false);
  };
  const handleChange = (e) => {
    setNewValue(e.target.innerHTML);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") await save(e);
  };


  const save = async (e) =>{
    e.preventDefault();

    await saveValue(name, newValue);

    setSaveText("Saved!");

    setTimeout(() => {
      setSaveText("save");
      setClicked(false);
    }, 2000);

  };

  return (
    <div className="editable-text js-editable-text" ref={node}>
      <div
        className="editable-text__title"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onClick={(e) => setClicked(true)}
        onInput={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        {value}
      </div>
      <div className="editable-text__append">
        <div
          className="editable-text__append-icon"
          style={{ display: clicked ? "none" : "block" }}
        >
          <svg className="svg-icon svg-icon--alto" width="12" height="12">
            <use
              href="/images/svg/svg-sprite/symbol/sprite.svg#pencil"
              x="0"
              y="0"
            ></use>
          </svg>
        </div>
        <div
          className="editable-text__append-button"
          style={{ display: clicked ? "block" : "none" }}
        >
          <button
            className="button button--inline button--color-surfie-green"
            type="button"
            onClick={(e) => save(e)}
          >
            {saveText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableListItem;
