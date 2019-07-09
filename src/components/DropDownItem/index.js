import React from "react";
import "./styles.css";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";

export default class DropDownItem extends React.Component {
  render() {
    const { id, openSectionIndex, name, togglePanel, ref } = this.props;
    return (
      <div className="main" ref={ref}>
        <div className="collapsible" onClick={togglePanel}>
          {openSectionIndex === id ? (
            <KeyboardArrowDown className="icon" fontSize="small" color="blue" />
          ) : (
            <KeyboardArrowRight
              className="icon"
              fontSize="small"
              color="blue"
            />
          )}
          <p>{name}</p>
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
