import React from "react";
import { connect } from "react-redux";
import { uniq } from "lodash";
import { setFilter } from "../../store/actions/board.action";
import { bindActionCreators } from "redux";
const Filter = ({ lists, setFilter }) => {
  let uniqListNames = uniq(lists.map(l => l.name));
  uniqListNames.push("All");
  const handleClick = value => {
    if (value === "All") {
      setFilter(null);
    } else {
      setFilter(value);
    }
  };
  return (
    <div className="dropdown" style={{float: "Right", paddingTop: "8px"}}>
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style ={{ border: '1px solid #dbdbdb', borderRadius: '2px' }}
      >
        Measure Value
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {uniqListNames.map((element, index) => {
          return (
            <span
              key={index}
              className="dropdown-item"
              onClick={() => handleClick(element)}
            >
              {element}
            </span>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  lists: state.boards.lists
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setFilter }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Filter);