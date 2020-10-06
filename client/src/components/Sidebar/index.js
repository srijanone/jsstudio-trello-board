import React from 'react';
import './style.css';

const Sidebar = () => {
    return (
        <nav className="Sidebar">
           {/* <a href="/totalIssues">Total Issues</a>
            <a href="/individualTaskCount">Individual Task Count</a> */}
            <a href="/individualTaskStatus">Individual Task Status</a>
        </nav>
    )
}

export default Sidebar;
