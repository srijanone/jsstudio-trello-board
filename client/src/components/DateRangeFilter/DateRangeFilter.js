import React, { Component } from 'react';
import moment from 'moment-timezone';
import { dateRangeFilter } from "../../api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllBoardsAction, saveDateAction } from "../../store/actions/board.action";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
class DateRangeFilter extends Component {
  constructor() {
    super();
    this.state = {
      focusedInput: null,
      startDate:moment().subtract(3, 'month'),
      endDate: moment().add(7, 'days'),
      fullscreen: false,
      direction: 'left',
      dateFormat: 'MM/DD/YYYY',
      small: false,
      block: false,
      orientation: 'horizontal',
      numMonths: 2,
      minimumNights: 7,
      contacts: [],
      cardObject: {
            CardState:'todo',
            Cardtime: 'aa',
      }
    };
    this.handleDatesChange = this.handleDatesChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleChangeDateFormat = this.handleChangeDateFormat.bind(this);
  }

  handleDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
    const start = moment(startDate).tz("Asia/India").format('YYYY-MM-DD'); 
    const end = moment(endDate).tz("Asia/India").format('YYYY-MM-DD'); 

    if (startDate && endDate) {
      this.props.saveDateAction([start, end])
      this.props.fetchAllBoardsAction();
    }
  }
  handleFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }
  handleChangeDateFormat(e){
    this.setState({ dateFormat: e.target.value});
  }

  render() {
    return (
      <div style={{ float: "Right"}}>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          onDatesChange={this.handleDatesChange} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
          displayFormat={this.state.dateFormat}
          hideKeyboardShortcutsPanel={true}
          numberOfMonths={this.state.numMonths || 2}
          small={this.state.small}
          isOutsideRange= {() => false}
        />
        {/* <h2>DATA</h2>
    <div>{this.state.contacts.map(contact => <div>{contact.data.card.name} {contact.data.listBefore.name} - {contact.data.listAfter.name} {contact.date} {moment.tz(contact.date, "Asia/India").unix()}</div>)}</div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { dateRange } = state.boards
  return { 
    dateRange
  }
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveDateAction,
      fetchAllBoardsAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DateRangeFilter);