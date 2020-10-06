import React from 'react';
import './style.css';
import { HorizontalBar } from 'react-chartjs-2';
import { getCards, getMembers } from '../../api';
import getRandomColor from '../../utils/custom';
import Loader from '../Loader';

class IndividualTaskCount extends React.Component {
    constructor() {
        super();
        this.state = {
            data : '',
        }
    }
    componentDidMount() {
        getCards('idMembers,closed').then((cards) => {
            const chartLabels = [];
            const chartLabelsObj = {};
            cards.forEach((c) => {
                const idMembers = c.idMembers[0];
                const closed = c.closed;
                if(idMembers &&  !closed) {
                    if(chartLabels.indexOf(idMembers) === -1) {
                        chartLabels.push(idMembers);
                        chartLabelsObj[idMembers] = 1;
                    } else {
                        const prevVal = chartLabelsObj[idMembers];
                        chartLabelsObj[idMembers] = prevVal + 1;
                    }
                }
            })
            const chartData = Object.values(chartLabelsObj);
            getMembers('fullName').then((members) => {
                members.forEach((m) => {
                    const id = m.id;
                    const index = chartLabels.indexOf(id)
                    if(index !== -1) {
                        const name = m.fullName;
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
                    ],
                };
    
                this.setState({
                    data,
                });
            });
        });
    }

    render () {
        const { data } = this.state;
        const options = {
            scales: {
                  xAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
        };
        return (
            <div className="IndividualTaskCount">
                {data 
                    ?   <HorizontalBar
                            data={data}
                            options={options}
                        />
                    :    <Loader />
                }
              
            </div>
          );
    }
  
}

export default IndividualTaskCount;

