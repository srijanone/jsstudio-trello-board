import React, {Fragment} from 'react';
import './style.css';
import { getBoards, getCards, getLists, getLabels,
     } from '../../api';
import { Boards, Patches, Done, Credit, CommunityReview, ToDo, 
    InProgress, InternalReview, CoreCredit } from '../../utils/const';
import CountUp from 'react-countup';
import Loader from '../Loader';
import DrupalRanking from '../DrupalRanking';
// import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import TeamCard from '../TeamCard';

class AllBoards extends React.Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            data : {},
            chartData: {},
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        const board = [];
        const boards = await getBoards('name');
        boards.forEach((b) => {
            if(Boards.indexOf(b.name) !== -1) {
                board.push(b)
            }
        })
        board.forEach(async b => {
            const list = await getLists('name', b.id);
            
            const patchesListIds = [];
            const doneListIds = [];
            const creditListIds = [];
            const communityReviewListIds = [];
            const toDoListIds = [];
            const inProgressListIds = [];
            const internalReviewListIds = [];
            list.forEach((l) => {
                if(Patches.indexOf(l.name) !== -1) {
                    patchesListIds.push(l.id);
                }
                if(Done.indexOf(l.name) !== -1) {
                    doneListIds.push(l.id);
                }
                if(Credit.indexOf(l.name) !== -1) {
                    creditListIds.push(l.id);
                }
                if(CommunityReview.indexOf(l.name) !== -1) {
                    communityReviewListIds.push(l.id);
                }
                if(ToDo.indexOf(l.name) !== -1) {
                    toDoListIds.push(l.id);
                }
                if(InProgress.indexOf(l.name) !== -1) {
                    inProgressListIds.push(l.id);
                }
                if(InternalReview.indexOf(l.name) !== -1) {
                    internalReviewListIds.push(l.id);
                }
            })

            const labels = await getLabels('name', b.id);
            
            const coreCreditIds = [];
            const otherCreditIds = [];
            labels.forEach((l) => {
                if(CoreCredit.indexOf(l.name) !== -1) {
                    coreCreditIds.push(l.id);
                } else {
                    otherCreditIds.push(l.id);
                }
            })

            const cards = await getCards('idList,closed,idLabels', b.id);
            
            let patchesCount = 0;
            let doneCount = 0;
            let creditCount = 0;
            let communityReviewCount = 0;
            let toDoCount = 0;
            let inProgressCount = 0;
            let internalReviewCount = 0;
            let coreCreditCount = 0;
            let otherCreditCount = 0;
            cards.forEach((c) => {
                const idList = c.idList;
                const closed = c.closed;
                const idLabel = c.idLabels[0];
                if(!closed) {
                    if(patchesListIds.indexOf(idList) !== -1) {
                        patchesCount++;
                    } 
                    if (doneListIds.indexOf(idList) !== -1) {
                        doneCount++;
                    }
                    if (creditListIds.indexOf(idList) !==  -1) {
                        creditCount++;
                        if(coreCreditIds.indexOf(idLabel) !== -1) {
                            coreCreditCount++
                        } else {
                            otherCreditCount++
                        }
                    }
                    if (communityReviewListIds.indexOf(idList) !==  -1) {
                        communityReviewCount++;
                    }
                    if (toDoListIds.indexOf(idList) !==  -1) {
                        toDoCount++;
                    }
                    if (inProgressListIds.indexOf(idList) !==  -1) {
                        inProgressCount++;
                    }
                    if (internalReviewListIds.indexOf(idList) !==  -1) {
                        internalReviewCount++;
                    }
                }
                
            })
            const newObj = {
                patchesCount,
                doneCount: doneCount + creditCount,
                creditCount,
                communityReviewCount,
                toDoCount,
                inProgressCount,
                internalReviewCount,
                total: patchesCount,
                coreCreditCount,
                otherCreditCount,
            }
            const { data } = this.state;
            const newData = data;
            newData[b.name] = newObj;

            const chartObj = {
                labels: '',
                datasets: [],
            };
            chartObj.labels = Object.keys(newData);
            const patches = [];
            const done = [];
            const credit = [];
            chartObj.labels.forEach((c) => {
                patches.push(newData[c].patchesCount);
                done.push(newData[c].doneCount);
                credit.push(newData[c].creditCount);
            })
            chartObj.datasets.push({
                label: 'Patches',
                backgroundColor: '#4786ba',
                data: patches,
            });
            chartObj.datasets.push({
                label: 'Done',
                backgroundColor: '#8a6ba4',
                data: done,
            });
            chartObj.datasets.push({
                label: 'Credit',
                backgroundColor: '#1faac0',
                data: credit,
            });
            if (this._isMounted) {
                this.setState({
                    data: newData,
                    chartData: chartObj
                })
            }
        })
    };
    
    componentWillUnmount() {
        this._isMounted = false;
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
    
    getTotals = (data, key) => {
        const dataArr = Object.values(data);
        let patches = 0;
        dataArr.forEach((d) => {
            patches += d[key]
        })
        return patches
    }

    render () {
        const { data } = this.state;
        const dataArr = Object.values(data);
        return (
            <Fragment>
            {dataArr.length === 0 ? <Loader /> :
            <div className="AllBoards">
                <div className="tile totalTile background1" onClick={this.animate}>
                    <div className="rotator">
                        <div className="side1">
                            <h3 className="label">Total Patches</h3>
                            <span className="infoIcon"
                                title="Click on tile for more details"
                                >i</span>
                            <CountUp
                                start={0}
                                end={this.getTotals(data, 'patchesCount')}
                                duration={2}
                                className="value"
                            />
                        </div>
                        <div className="side2 hide">
                        Total count includes the tasks with following status: To Do, In Progress, Internal Review, Community Review, Done and Credit
                        </div>
                    </div>
                </div>
                <div className="tile totalTile background2" onClick={this.animate}>
                    <div className="rotator">
                        <div className="side1">
                            <h3 className="label">Done</h3>
                            <span className="infoIcon"
                                title="Click on tile for more details"
                                >i</span>
                            <CountUp
                                start={0}
                                end={this.getTotals(data, 'doneCount')}
                                duration={2}
                                className="value"
                            />
                        </div>
                        <div className="side2 hide">
                            When an issue passes from the RTBC state, it is moved to the Fixed state
                        </div>
                    </div>
                </div>
                <div className="tile totalTile background3" onClick={this.animate}>
                    <div className="rotator">
                        <div className="side1">
                            <h3 className="label">Credit</h3>
                            <span className="infoIcon"
                                title="Click on tile for more details"
                                >i</span>
                            <CountUp
                                start={0}
                                end={this.getTotals(data, 'creditCount')}
                                duration={2}
                                className="value"
                            />
                        </div>
                        <div className="side2 hide">
                            <p className="creditsBreakdown">Core Credits: {this.getTotals(data, 'coreCreditCount')}</p>
                            <p className="creditsBreakdown">Other Credits: {this.getTotals(data, 'otherCreditCount')}</p>
                        </div>
                    </div>
                </div>
               
                {dataArr && dataArr.length === 3 &&
                    <Fragment>
                        <TeamCard className="background1" data={data} team='Avengers' />
                        <TeamCard className="background2" data={data} team='Shoorveer' />
                        <TeamCard className="background3" data={data} team='The Apollo' />
                    </Fragment>
                }
                <DrupalRanking />
                {/* <div className="chartWrapper">
                    <HorizontalBar
                        data={chartData}
                        options={options}
                        height={50}
                    />
                </div> */}
            </div>
            }
            </Fragment>
            
        );
    }
  
}

export default AllBoards;
