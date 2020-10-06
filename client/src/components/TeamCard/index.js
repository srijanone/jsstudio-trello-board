import React from 'react';
import './style.css';
import ProgressCircle from '../ProgressCircle';

class AllBoards extends React.Component {
    componentDidMount() {
        window.addEventListener('click', this.hideTooltip);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.hideTooltip);
    }

    getTeamPercent = (data, team, key) => {
        const keyValue = data[team][key];
        const totalValue = data[team]['total'];
        const percent = parseFloat((keyValue/totalValue)*100).toFixed(2);
        return percent || '0';
    }

    toggleTooltip = (event) => {
        event.target.nextElementSibling.classList.toggle('hide');
    }

    hideTooltip = (event) => {
        if(event.target.classList.contains('isTooltip')) return false;
        const tooltipRef = document.getElementsByClassName('tooltip');
        for(let i=0; i<=tooltipRef.length-1; i++){
            if(!tooltipRef[i].classList.contains('hide')){
                tooltipRef[i].classList.add('hide');
            };
            
        }
    }

    render () {
        const { data, team, className } = this.props;
        return (
            <div className={`${className} tile teamTile`}>
                <h3 className="teamName">{team}</h3>
                <div className="dataWrapper">
                    <div className="label">Total Patches: </div>
                    <div className="progressBar">
                        <ProgressCircle type="bar" percent={this.getTeamPercent(data, team, 'patchesCount')} />
                    </div>
                    <div className="value">{data[team].patchesCount} </div>

                    <div className="label"> Done: </div>
                    <div className="progressBar">
                        <ProgressCircle type="bar" percent={this.getTeamPercent(data, team, 'doneCount')} />
                    </div>
                    <div className="value">{data[team].doneCount} </div>

                    <div className="label bold"> Credits
                        <span className="infoIconCredit isTooltip"
                            title="Click on tile for more details"
                            onClick={this.toggleTooltip}
                        >i</span>
                        
                        <div className="tooltip hide isTooltip">
                            <span className="caret"></span>  
                            <div className="isTooltip">Core Credits:{data[team].coreCreditCount} </div>
                            <div className="isTooltip">Other Credits:{data[team].otherCreditCount} </div>
                        </div>
                    </div>
                    <div className="progressBar">
                        <ProgressCircle type="bar" percent={this.getTeamPercent(data, team, 'creditCount')} />
                    </div>
                    <div className="value bold">{data[team].creditCount} </div>
                </div>
            </div>   
        );
    }
  
}

export default AllBoards;
