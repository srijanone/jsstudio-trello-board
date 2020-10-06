import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./style.css";
import IssueType from "../IssueType";
import InnerChart from "../InnerChart";
import {
  filteredArray,
  authorsWithReopenTicket
} from "../../utils/filter";
import {
  allBoards,
  currentMembers
} from "../../store/selectors/board.selector";
import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import { fetchBoardMembersAction } from "../../store/actions/board.action";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'
import MembersCard from './components/MembersCard'
import { CONFIG } from '../../environment'

const BoardDetail = ({ boards, fetchBoardMembersAction, members }) => {
  let { id } = useParams();
  const [board, setBoard] = useState(null);
  const [visible, setVisible] = React.useState(3);
  const [time, setTime] = useState([]);
  const [reopenData, setReopen] = useState([]);

  useEffect(() => {
    setBoard(boards.filter(b => b.id === id)[0]);
    fetchBoardMembersAction(id);
    setVisible(3);
    fetch(
      `${CONFIG.API_PATH}/api/boards/${id}`
    )
      .then(res => res.json())
      .then(data => {
        setTime(data);
        setReopen(data);
      })
      .catch(console.log);
  }, [id]);

  const barChart = board?.lists.map(list => {
    return {
      status: list.name,
      count: list.cards.length
    };
  });

  const authors = authorsWithReopenTicket(reopenData); // authorsWithReopenTicket returns the array of reopen count of all authors

  return (
    <>
      <div class="d-flex flex-row my-flex-container" style={{ backgroundColor: "rgba(65,106,217,1)", marginBottom: 15 }}>
        <h5 class="d-flex justify-content-center" style={{ paddingTop: 28, paddingLeft: 15, color: "white" }}>
          {board?.name}
        </h5>
      </div>
      <Container fluid>
        <Row>
          <Col lg={6}>
            <Card>
              <h5 class="individual-task-status" style={{ marginTop: "14px", paddingLeft: "11px", fontWeight: "400" }}>Individual Task Status </h5>
              <InnerChart data={barChart} />
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <h5 class="individual-task-status" style={{ marginTop: "14px", paddingLeft: "11px", fontWeight: "400" }}>Issue Labels </h5>
              <IssueType boradId={board?.id} />
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid style={{ padding: 10 }}> </Container>
      <MembersCard
        members={members}
        board={board}
        authors={authors}
      />
    </>
  );
};
const mapStateToProps = state => ({
  boards: allBoards(state),
  members: currentMembers(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBoardMembersAction
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BoardDetail);