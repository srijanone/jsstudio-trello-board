import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function PieChart(props) {
    useLayoutEffect(() => {
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.data = props.data;
        chart.radius = am4core.percent(50);
        chart.innerRadius = am4core.percent(30);
        chart.logo.height = -50;
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "status";
        pieSeries.labels.template.text= "";
        pieSeries.ticks.template.disabled = true;

    });

    return <div id="chartdiv" style={{ width: "100%", height: "412px" }}></div>;
}

export default PieChart;
