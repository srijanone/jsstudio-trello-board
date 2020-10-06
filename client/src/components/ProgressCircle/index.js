import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import CountUp from 'react-countup';

class ProgressCircle extends React.Component {
    constructor() {
        super();
        this.state = {
            data : '',
        }
    }

    componentDidMount() {
        
    };

    

    render () {
        const { percent, type } = this.props;
        const progressPercent = parseInt(percent);
        return (
            <div className={`progress--${type} progress--${progressPercent}`}>
                <div className="progress__number">
                    {percent === 'NaN' ? "0%" : 
                        <CountUp
                            start={0}
                            end={Number(percent)}
                            duration={2}
                            decimals={2}
                            suffix="%"
                        />
                    }
                </div>
            </div>
        );
    }
  
}

ProgressCircle.propTypes = {
    percent: PropTypes.string,
    type: PropTypes.string.isRequired,
};

ProgressCircle.defaultProps = {
    percent: '0',
}

export default ProgressCircle;
