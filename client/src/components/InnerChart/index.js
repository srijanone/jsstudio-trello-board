import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";

am4core.useTheme(am4themes_frozen);

function InnerChart(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let chart = am4core.create("simple-column-chart", am4charts.XYChart);
    chart.data = props.data
    chart.logo.height = -25;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "status";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "status";
    series.name = "count";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    let label = categoryAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 100

    var valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{valueY}";
    valueLabel.label.verticalCenter = "right";
    valueLabel.align = "center"
    valueLabel.label.dx = 2;
  })

  return (
    <div id="simple-column-chart" style={{ width: "100%", height: "446px" }}></div>
  );
}
export default InnerChart;