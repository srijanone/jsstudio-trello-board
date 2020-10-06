import React, { useLayoutEffect, useRef } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_frozen);
am4core.useTheme(am4themes_animated);


function TeamProgress(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let chart = am4core.create("teamprogress", am4charts.XYChart);
    chart.logo.height = -15
    chart.paddingRight = 20;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'category'
      series.name = name
      series.tooltipText = "{category}: [bold]{valueY}[/]";

      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 30;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return series;
    }

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 20;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    let chartdata = props.boardData.map((item) => {
      return {
        category: item.name,
        ...item
      }
    })
    chart.data = chartdata
  
    const final = ['To Do', 'In Progress', 'Done', 'Credit']
    for (let i = 0; i<final.length ; i++) {
      createSeries(final[i], final[i]);
    }

    chart.legend = new am4charts.Legend()

    /* Create a cursor */
    chart.cursor = new am4charts.XYCursor();
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 100

    chart = chart;
  })

  return (
    <div id="teamprogress" style={{ width: "100%", height: "420px" }}></div>
  );
}

export default TeamProgress;
