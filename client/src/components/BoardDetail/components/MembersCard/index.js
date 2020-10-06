import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { filterWithMembers } from "../../../../utils/filter";
const colours = [
    "#bb82f9",
    "#f4c3d5",
    "#fab916",
    "#61dafb",
    "#fc0d1c",
    "#84ffaf"
];
const getRandomColor = () => {
    const random = Math.floor(Math.random() * colours.length);
    return colours[random];
};

const MembersCard = (props) => {
    const { members, board, authors } = props
    const [visible, setVisible] = React.useState(3);
    const loadMore = () => {
        setVisible(visible + 3);
    };

  return (
      <>
      <Container fluid>
          <Row>
              {members.slice(0, visible).map(user => {
                  const { id } = user;
                  let requiredAuthor = authors.filter(author => author.id == id); // extraction Reopen count of each individual Author
                  const reopen =
                      requiredAuthor.length > 0
                          ? requiredAuthor[0].reopenedTicketCount
                          : 0;

                  return (
                      <Col xs={4}>
                          <div
                              className="card shadow-sm-2"
                              style={{
                                  borderLeft: `7px solid ${getRandomColor()}`,
                                  backgroundColor: getRandomColor(),
                                  minWidth: 300
                              }}
                          >
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                  {user.avatarUrl !== null && (
                                      <div
                                          style={{
                                              width: 50,
                                              height: 50,
                                              borderRadius: 50,
                                              backgroundImage: `url(${user.avatarUrl}/50.png)`
                                          }}
                                      >
                                          <h6 className="full-name">{user.fullName}</h6>
                                      </div>
                                  )}
                                  {user.avatarUrl === null && (
                                      <div
                                          className="d-flex justify-content-center align-items-center"
                                          style={{
                                              width: 50,
                                              height: 50,
                                              borderRadius: 50,
                                              backgroundColor: "whitesmoke"
                                          }}
                                      >
                                          <h4>{user.initials}</h4>
                                      </div>
                                  )}
                                  <div className="card-body">
                                      <ul className="list-group list-group-flush">
                                          {board ?.lists.map((list, i) => (
                                              <li
                                                  className="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn"
                                                  key={i}
                                              >
                                                  {list.name}
                                                  <span className="badge badge-primary badge-pill">
                              {filterWithMembers(list.cards, user.id)}
                            </span>
                                              </li>
                                          ))}
                                          <li className="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn">
                                              {"Reopen Ticket"}
                                              <span className="badge badge-primary badge-pill">
                            {reopen}
                          </span>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </Col>
                  );
              })}
          </Row>
      </Container>
          {visible < members.length && (
              <div id="loadMore">
                  <Button onClick={loadMore}>Load More</Button>
              </div>
          )}
      </>
  );
}

export default MembersCard;