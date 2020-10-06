import React from 'react';
import './style.css';
import { getBoards, getActions } from '../../api';
import { Boards } from '../../utils/const';

class BoardSelector extends React.Component {
  constructor(props) {
    super(props);

    //Calculating Today
    const fullDate = new Date();
    const date = fullDate.getDate();
    const month = fullDate.getMonth()+1;
    const year = fullDate.getFullYear();
    const currentDate = `${date}/${month}/${year}`;

    this.state = {
      boards: '',
      board: localStorage.getItem('idBoard') || '0',
      currentDate,
    }
  }

  componentDidMount() {
    getBoards('name').then((res) => {
      this.setState({
        boards: res,
      })
    });
    getActions();
  }

  selectTab = (board) => {
    if(board === this.state.board) {
      return
    }
    this.setState ({
      board,
    })
    localStorage.setItem('idBoard', board);
    window.location.reload();
  };
  

  render () {
    const { boards , board, currentDate} = this.state;
    return (
      <div className="BoardSelector">
        <nav>
          <button className={`tab ${board === '0' ? 'active' : ''}`} onClick={() => this.selectTab('0')}>Dashboard</button>
          {boards && boards.map(b => {
            if(Boards.indexOf(b.name) !== -1) {
              return <button key={b.id} className={`tab ${board === b.id ? 'active' : ''}`} onClick={() => this.selectTab(b.id)}>{b.name}</button>
            }
            return null
          })}
        </nav>
        <span className="date">{`Data as of: [Start date: 20/4/2020 - Till date: ${currentDate}]`}</span>
      </div>
    );
  }
}

export default BoardSelector;
