import React from "react";
import "./style.css";
import { Pie } from "react-chartjs-2";
import { getCards, getLists, getLabels } from "../../api";
import Loader from "../Loader";
import NoData from "../NoData";
import "chartjs-plugin-datalabels";
import { Lists } from "../../utils/const";
import PieChart from "../PieChart";

function verifyLabel(labels, issueTypeId) {
  const isPresent = labels.indexOf(issueTypeId) !== -1;
  return isPresent;
}

class IssueType extends React.Component {
  constructor() {
    super();
    this.state = {
      data: "",
      issueType: "",
      issueTypeId: "",
      cards: [],
      lists: [],
      labels: ['5ec615eab0289a3f7ca9993b']
    };
  }

  componentDidMount() {
    getCards("idList,closed,idLabels", this.props.boradId).then(cards => {
      getLists("name", this.props.boradId).then(lists => {
        getLabels("name", this.props.boradId).then(labels => {
          this.setState(
            {
              cards,
              lists,
              labels
            },
            () => {
              this.renderChart();
            }
          );
        });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.boradId !== this.props.boradId) {
      getCards("idList,closed,idLabels", this.props.boradId).then(cards => {
        getLists("name", this.props.boradId).then(lists => {
          getLabels("name", this.props.boradId).then(labels => {
            this.setState(
              {
                cards,
                lists,
                labels,
                issueTypeId: labels[0].id
              },
              () => {
                this.renderChart();
              }
            );
          });
        });
      });
    }
  }
  labelChange = event => {
    this.setState({
      data: ""
    });
    const issueTypeId = event.target.value;
    this.setState(
      {
        issueTypeId
      },
      () => {
        this.renderChart();
      }
    );
  };

  render() {
    this.renderChart = () => {
      const { issueTypeId } = this.state;
      getLists("name", this.props.boradId).then(lists => {
        const listIds = [];
        lists.forEach(l => {
          if (Lists.indexOf(l.name) !== -1) {
            listIds.push(l.id);
          }
        });
        getCards("idList,closed,idLabels", this.props.boradId).then(cards => {
          const chartLabels = [];
          const chartLabelsObj = {};
          cards.forEach(c => {
            const idList = c.idList;
            const closed = c.closed;
            const labels = c.idLabels;
            if (
              idList &&
              !closed &&
              verifyLabel(labels, issueTypeId) &&
              listIds.indexOf(idList) !== -1
            ) {
              if (chartLabels.indexOf(idList) === -1) {
                chartLabels.push(idList);
                chartLabelsObj[idList] = 1;
              } else {
                const prevVal = chartLabelsObj[idList];
                chartLabelsObj[idList] = prevVal + 1;
              }
            }
          });
          const chartData = Object.values(chartLabelsObj);

          lists.forEach(l => {
            const id = l.id;
            const index = chartLabels.indexOf(id);
            if (index !== -1) {
              const name = l.name;
              chartLabels.splice(index, 1, name);
            }
          });

          const data = chartLabels.map((element, index) => {
            return {
              status: element,
              count: chartData[index]
            };
          });

          this.setState({
            data
          });
        });
      });

      getLabels("name", this.props.boradId).then(labels => {
        const labelIndex = labels.findIndex(l => {
          return l.id === issueTypeId;
        });
        if (labelIndex > -1) {
          this.setState({
            issueType: labels[labelIndex].name || ""
          });
        }
      });
    };

    const { data, issueType, labels, issueTypeId } = this.state;

    return (
      <div className="IssueType">
        <div className="wrapper">
          <div className="chartWrapper">
            <div className="selectButton" style={{ float: "right", padding: "10px", marginTop: "-41px", display: "inline-block"}}>
              <select
                className="labelSelect"
                onChange={this.labelChange}
                value={issueTypeId}
              >
                {labels &&
                  labels.map(il => {
                    // if(Labels.indexOf(il.name) !== -1) {
                    return (
                      <option key={il.id} value={il.id}>
                        {il.name}
                      </option>
                    );
                    // }
                  })}
              </select>
            </div>
            <div className="PieChart">
              {data ? (
                data.length === 0 ? (
                  <NoData />
                ) : (
                  <div className="chart">
                    {" "}
                    <PieChart data={data} />
                  </div>
                )
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IssueType;