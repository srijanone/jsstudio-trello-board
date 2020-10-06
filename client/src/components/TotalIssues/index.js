import React from 'react';
import './style.css';
import { Bar } from 'react-chartjs-2';
import { getCards, getLists } from '../../api';
import getRandomColor from '../../utils/custom';
import Loader from '../Loader';
// import 'chartjs-plugin-datalabels';

class TotalIssues extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
    }
  }
  componentDidMount() {
    getCards('idList,closed').then((cards) => {
      const chartLabels = [];
      const chartLabelsObj = {};
      cards.forEach((c) => {
        const idList = c.idList;
        const closed = c.closed;
        if (idList && !closed) {
          if (chartLabels.indexOf(idList) === -1) {
            chartLabels.push(idList);
            chartLabelsObj[idList] = 1;
          } else {
            const prevVal = chartLabelsObj[idList];
            chartLabelsObj[idList] = prevVal + 1;
          }
        }
      })
      const chartData = Object.values(chartLabelsObj);
      getLists('name').then((lists) => {
        lists.forEach((l) => {
          const id = l.id;
          const index = chartLabels.indexOf(id)
          if (index !== -1) {
            const name = l.name;
            chartLabels.splice(index, 1, name);
          }
        })
        const data = {
          labels: chartLabels,
          datasets: [
            {
              label: 'Count',
              backgroundColor: getRandomColor(),
              borderWidth: 1,
              data: chartData,
            }
          ]
        };

        this.setState({
          data,
        })
      })

    })
  }

  render() {
    const { data } = this.state;
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      maintainAspectRatio: false,
      // plugins: {
      //     datalabels: {
      //        display: true,
      //        color: 'white',
      //        font: {
      //          weight: 'bold',
      //        },
      //     }
      // }
    };
    return (
      <div className="TotalIssues">
        {data
          ? <Bar
            data={data}
            width={100}
            height={500}
            options={options}
          />
          : <Loader />
        }
      </div>
    );
  }

}

export default TotalIssues;
