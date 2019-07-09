import React from "react";
import "./App.css";
import { RadioGroup, Button } from "@material-ui/core";
import Subsection from "./components/subsection";
import SearchTable from "./components/SearchTable";
import DropDownItem from "./components/DropDownItem";
const PARAMS = [
  { id: 0, group: "Option 1", type: ["Type A", "Type B", "Type C"] },
  { id: 1, group: "Option 2", type: ["Type D", "Type E", "Type F"] }
];
const DATA = [
  { name: "Example 1", group: "Option 1", type: "Type A" },
  { name: "Example 2", group: "Option 1", type: "Type B" },
  { name: "Example 3", group: "Option 1", type: "Type C" },
  { name: "Example 4", group: "Option 2", type: "Type D" },
  { name: "Example 5", group: "Option 2", type: "Type E" },
  { name: "Example 6", group: "Option 2", type: "Type F" }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSectionIndex: -1,
      checked: "",
      anchorEl: null,
      showMenu: false,
      group: null
    };
    this.togglePanel = this.togglePanel.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && event.target.className === "dropdown") {
      this.setState({ showMenu: false });
    }
  }

  toggleMenu(event) {
    event.preventDefault();
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  togglePanel(key, group) {
    this.setState({
      open: !this.state.open,
      openSectionIndex: this.state.open ? -1 : key,
      group: group
    });
    var coll = document.getElementsByClassName("collapsible");
    var content = coll[key].nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  checkedRadio(value) {
    this.setState({ checked: value });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }
  removeFilters() {
    this.setState({ openSectionIndex: -1, checked: "", group: null });
  }
  render() {
    const { openSectionIndex, checked, group } = this.state;
    return (
      <div className="container">
        <div className="dropdown">
          <Button
            onClick={this.toggleMenu}
            aria-haspopup="true"
            variant="contained"
            color="secondary"
          >
            Open Drop down menu
          </Button>

          {this.state.showMenu
            ? PARAMS.map(item => (
                <DropDownItem
                  id={item.id}
                  ref={this.setWrapperRef}
                  togglePanel={e => this.togglePanel(item.id, item.group)}
                  openSectionIndex={openSectionIndex}
                  name={item.group}
                >
                  <RadioGroup value={checked}>
                    {item.type.map(val => (
                      <Subsection
                        name={val}
                        onChecked={() => this.checkedRadio(val)}
                      />
                    ))}
                  </RadioGroup>
                </DropDownItem>
              ))
            : null}
        </div>
        <div className="search">
          <SearchTable
            data={DATA}
            filter={[checked, group]}
            removeFilters={this.removeFilters.bind(this)}
          />
        </div>
      </div>
    );
  }
}
export default App;
