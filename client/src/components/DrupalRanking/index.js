import React from 'react';
import './style.css';
import img from '../../images/trophy.png';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { getRank } from '../../api';

class DrupalRanking extends React.Component {
     constructor() {
        super();
        this.state = {
            indiaRank: '',
            organisationRank: '',
            serviceRank: '',
        }
     }

    componentDidMount() {
        getRank().then((result) => {
            this.setState({
                indiaRank: result.indiaRank,
                organisationRank: result.organisationRank,
                serviceRank: result.serviceRank,
            })
        });
    }

    animate = (event) => {
        const target = event.target;
        let rotater = '';
        if(target.classList.contains('tile')) {
            rotater = target.getElementsByClassName('rotator')[0];
        } else {
            rotater = target.closest('.rotator');
        }
        
        rotater.classList.add('rotate');
        setTimeout(() => {
            const a = target.closest('.tile');
            a.getElementsByClassName('side1')[0].classList.toggle('hide');
            a.getElementsByClassName('side2')[0].classList.toggle('hide');
            rotater.classList.remove('rotate');
        }, 200) 
    }

  render () {
    const data = {
        datasets: [{
            label: 'Drupal Organization (India)',
            data: [5, 1, 1],
            backgroundColor: '#93b453',
            borderWidth: 1,
        },{
            label: 'Drupal Organization ',
            data: [22, 6, 4],
            backgroundColor: '#c9544f',
            borderWidth: 1,
        }, {
            label: 'Drupal Services ',
            data: [20, 5, 4],
            backgroundColor: '#ef923a',
            borderWidth: 1,
        }, ],
        labels: ['April', 'May', 'June'],
    };
    const data2 = {
        datasets: [{
            label: 'Core',
            data: [17, 84, 3],
            backgroundColor: '#93b453',
            borderWidth: 1,
        },{
            label: 'Others',
            data: [144, 172, 32],
            backgroundColor: '#c9544f',
            borderWidth: 1,
        }, ],
        labels: ['May', 'June', 'July'],
    };
    const options = {
        scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      fontStyle: 'bold',
                      fontColor: 'white',
                  },
              }],
              xAxes: [{
                    ticks: {
                        fontStyle: 'bold',
                        fontColor: 'white',
                    },
                  gridLines: {
                      display: false,
                  },
              }],
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
            position: 'bottom',
            labels: {
                boxWidth: 12,
                fontColor: 'white',
            },
        },
    };
    const { indiaRank, organisationRank, serviceRank } = this.state;
    return (
      <div className="DrupalRanking">
        <div className="tile w33 background1">
            <p className="accolades">Credits Report</p>
            <Bar
                data={data2}
                height={165}
                options={options}
            />
        </div>
        <div className="w33 trophyWrapper tile background2">
            <div className="row">
                <div className="side1">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.drupal.org/organizations/india" className="label">
                        Drupal Organization (India)
                    </a>
                    <img  alt="AccoladeImg" className="accoladeImg" src={img} />
                    <div className="imgOverlay">{indiaRank}</div>
                </div>
            </div>
            <div className="row">
                    <div className="side1">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.drupal.org/drupal-services" className="label">
                            Drupal Services
                        </a>
                        <img alt="AccoladeImg" className="accoladeImg" src={img} />
                        <div className="imgOverlay">{serviceRank}</div>
                    </div>
                    <div className="side1">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.drupal.org/organizations" className="label">
                            Drupal Organization
                        </a>
                        <img alt="AccoladeImg" className="accoladeImg" src={img} />
                        <div className="imgOverlay">{organisationRank}</div>
                    </div>
            </div>
        </div>
        <div className="tile w33 background3">
            <p className="accolades">Rankings</p>
            <Bar
                data={data}
                height={165}
                options={options}
            />
        </div>
      </div>
    );
  }
}

export default DrupalRanking;
