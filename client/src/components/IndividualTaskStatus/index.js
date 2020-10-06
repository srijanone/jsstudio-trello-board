import React from 'react';
import './style.css';
import { Bar } from 'react-chartjs-2';
import { getCards, getMembers, getLists } from '../../api';
import getRandomColor from '../../utils/custom';
import Loader from '../Loader';
import 'chartjs-plugin-datalabels';
import { Lists, OffBoard } from '../../utils/const';
import striker from '../../utils/strikethrough'
 
class IndividualTaskStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            data : '',
        }
    }
    componentDidMount() {
        getLists('name').then((list) => {
            const listIds = [];
            list.forEach((l) => {
                if(Lists.indexOf(l.name) !== -1) {
                    listIds.push(l.id);
                }
            })
            getCards('idMembers,idList,closed').then((cards) => {
                let chartLabels = [];
                const chartLabelsObj = {};
                cards.forEach((c) => {
                    const idMembers = c.idMembers[0];
                    const idList = c.idList;
                    const closed = c.closed;
                    if(idMembers && idList &&  !closed && listIds.indexOf(idList)  !== -1) {
                        if(chartLabels.indexOf(idMembers+idList) === -1) {
                            chartLabels.push(idMembers+idList);
                            if(chartLabelsObj[idList]) {
                                chartLabelsObj[idList][idMembers] = 1
                            } else {
                                const obj = {};
                                obj[idMembers] = 1
                                chartLabelsObj[idList] = obj;
                            }
                        } else {
                            const prevVal = chartLabelsObj[idList][idMembers];
                            chartLabelsObj[idList][idMembers] = prevVal + 1;
                        }
                    }
                })

                getMembers('fullName').then((members) => {
                    const membersArr = [];
                    chartLabels = [];
                    members.forEach((m) => {
                        const id = m.id;
                        const fullName = m.fullName;
                        membersArr.push(id);
                        chartLabels.push(fullName);
                    })
            
                    const chartLabelsObjKeys = Object.keys(chartLabelsObj);
                    const datasets = [];

                    
                    chartLabelsObjKeys.forEach((key, index) => {
                        const data = chartLabelsObj[key];
                        const taskData = membersArr.map((m) => {
                            return data[m] || 0;
                        })
                        let label = key;
                        list.forEach((l) => {
                            if(l.id === key) {
                                label = l.name;
                                return
                            }
                        })
                        datasets.push({
                            label,
                            backgroundColor: getRandomColor(index),
                            data: taskData,
                        })
                    })

                    const dataset1 = datasets[0].data;
                    const dataset1Len = dataset1.length;
                    const datasetLen = datasets.length;
                    for(let i=dataset1Len-1; i>=0; i--) {
                        for(let j=0; j<= datasetLen-1; j++) {
                            if(datasets[j].data[i] !== 0) {
                                break
                            }
                            if(j === datasetLen -1) {
                                for(let k=0; k<= datasetLen-1; k++) {
                                    datasets[k].data.splice(i, 1);
                                }
                                chartLabels.splice(i,1);
                            }
                        }
                    }

                    const data = {
                        labels: chartLabels,
                        datasets,
                    };
            
                    this.setState({
                        data,
                    })
                    
                })
        
                
            })
        })
       
    }

    render () {
        const { data } = this.state;
        const options = {
            scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                      },
                      stacked: true,
                  }],
                  xAxes: [{
                      stacked: true,
                      gridLines: {
                          display: false,
                      },
                      ticks: {
                        fontFamily: 'Arial',
                        callback: function(value) {
                            if(OffBoard.indexOf(value) !== -1) {
                                return striker(value)
                            }
                            return value;
                        }
                      }
                  }]
            },
            plugins: {
                datalabels: {
                   display: function(context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        return value !== 0; // display labels with value > 0
                    },
                   color: 'white',
                   font: {
                     weight: 'bold',
                   },
                }
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 12,
                },
            },
        };
        return (
            <div className="IndividualTaskStatus">
                {console.log('Individule task status data',data)}
                {console.log('Individule task status options',options)}
                <div className="wrapper">
                    <div className="chartWrapper">
                        <h5 className="heading">Bar Chart</h5>
                        {data 
                            ?   <Bar
                                    data={data}
                                    options={options}
                                    height={200}
                                />
                            :   <Loader />
                        }
                    </div>
                </div>
            </div>
          );
    }
  
}

export default IndividualTaskStatus;

