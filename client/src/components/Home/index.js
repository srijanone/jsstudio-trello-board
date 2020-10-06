import React from "react";
import "./style.css";
import Header from "../Header";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from "../Footer";
import { SideNav } from "../Header/side-nav";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DateRangeFilter from "../DateRangeFilter/DateRangeFilter"
import Card from 'react-bootstrap/Card'
import {
  allBoards,
  listCardGrouping,
  uniqListWithColors,
  cards,
} from "../../store/selectors/board.selector";
import { fetchAllBoardsAction } from "../../store/actions/board.action";
import TeamProgress from "../TeamProgress"
import TeamContributors from "../TeamContributors";
import { Route, Switch } from "react-router-dom";
import BoardDetail from "../BoardDetail/BoardDetail";
import { CONFIG } from '../../environment';
import Boards from './components/Boards';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isAll: true,
      showSidebar: false,
      listData: false,
      visible: true,
      teamContributor: []
    };
    this.amchartTeamContributor = this.amchartTeamContributor.bind(this);
  }

  amchartTeamContributor() {
    const memberArray = []
    let creatingChart = false
    if (this.props.allBoards.length && !creatingChart) {
      this.props.allBoards.map((board) => {
        fetch(`${CONFIG.API_PATH}/api/listOfboardsMembers/${board.id}`)
          .then(res => res.json())
          .then((data) => {
            memberArray.push({
              country: board.name,
              visits: data.length
            })
            this.setState({ teamContributor: memberArray })
          })
      })
      creatingChart = true
    }
  }

  componentDidMount() {
    this.props.fetchAllBoardsAction();
    const idBoard = localStorage.getItem("idBoard");
    if (idBoard !== "0" && idBoard !== null) {
      this.setState({
        isAll: false,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.teamContributor.length === 0) {
      this.amchartTeamContributor()
    }
  }

  loadMore = (e) => {
    this.setState({ visible: false });
  }

  render() {
    const { showSidebar, visible } = this.state;
    const { filter, listWithColors, listCardGrouping, allBoards } = this.props;
    const filteredList = [];
    listCardGrouping.forEach(board => {
      filteredList.push({ name: board.name, [filter]: board[filter] });
    });

    return (
      <div className="home-page">
        <container-fluid>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col xs lg="2" className="dashboard">
              <SideNav
                show={showSidebar}
                list={this.props.allBoards}
                idKey={"id"}
                displayKey={"name"}
              />

            </Col>
            <Col xs lg="10" style={{ backgroundColor: "whitesmoke" }}>
              {this.props.location.pathname === '/home' &&
                <div class="d-flex flex-row my-flex-container" style={{ backgroundColor: "rgba(65,106,217,1)", marginBottom: 15 }}>
                  <h5 class="d-flex justify-content-center" style={{ paddingTop: 28, paddingLeft: 15, color: "white" }}> Boards </h5>
                </div>
              }
              <Switch location={this.props.location}>
                <Route path={`${this.props.match.path}/board/:id`}>
                  <BoardDetail />
                </Route>
                <Route path="/">
                  <>
                    <container-fluid>
                      <Row>

                        <Col lg={6}>
                          <Card>
                            <div class="p-2 my-flex-item">
                              <DateRangeFilter />
                              <h5 class="team-progress" style={{ marginTop: "14px", paddingLeft: "11px", fontWeight: "400" }}> Team Progress </h5>
                            </div>
                            <TeamProgress
                              boardData={listCardGrouping}
                            />
                          </Card>
                        </Col>
                        <Col lg={6}>
                          <Card>
                            <div class="p-2 my-flex-item">
                              <h5 class="team-contribution" style={{ marginTop: "14px", paddingLeft: "11px", fontWeight: "400" }}> Team Contributors </h5>
                            </div>
                            <TeamContributors
                              data={this.state.teamContributor}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </container-fluid>
                    <div>
                     <Boards allBoards={this.props.allBoards}
                     />
                    </div>
                  </>
                </Route>
              </Switch>
            </Col>
          </Row>
          <Row>
            <Footer className="d-flex justify-content-between align-items-center"/>
          </Row>
        </container-fluid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allBoards: allBoards(state),
  listCardGrouping: listCardGrouping(state),
  listWithColors: uniqListWithColors(state),
  cards: cards(state),
  filter: state.boards.filter
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAllBoardsAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Home);
