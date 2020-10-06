import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';

const COLORS = ['rgb(165, 171, 238)', 'rgb(190, 196, 248)'];
const getColour = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const config = ["To Do", "In Progress", "Done", "Credit"];

const Boards = (props) => {
  const { allBoards } = props
  return (
    <container-fluid>
      <Row>
        {allBoards.map((board, key) => (
          <Col xs={4}>
            <Card style={{ marginBottom: 9, marginTop: 15, height: 277 }}>
              <div
                key={key}
              >
                <div className="card-body">
                  <div class="d-flex p-2 bd-highlight" style={{ backgroundColor: getColour() }}>
                    <h5 class="card-title">
                      {board.name}
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">

                    {board.lists.map((list, index) => (
                      <>
                        {config.includes(list.name) &&
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn"
                            key={index} name={board.name}
                            style={{ fontWeight: "400", fontSize: "smaller" }}
                          >

                            {list.name}
                            {list.cards.length > 10 ?
                              <span
                                className="badge badge-primary list-exceed-limit" style={{ fontSize: "small" }}>
                                {list.cards.length}
                              </span> : <span className="badge badge-primary" style={{ fontSize: "small" }}>
                                {list.cards.length}
                              </span>}
                          </li>
                        }
                      </>
                    ))}
                  </ul>
                  <Link className="nav-link read-more" to={`/home/board/${board.id}`}>
                    Read more
                  </Link>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </container-fluid>
  )
}

export default Boards