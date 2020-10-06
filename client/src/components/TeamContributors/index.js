import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

function am4themes_myTheme(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#A0F0F0"),
      am4core.color("#5F8FC0"),
      am4core.color("#416AD9"),
      am4core.color("#260E66"),
      am4core.color("#77A95A"),
      am4core.color("#A5A5A5")
    ];
  }
}

am4core.useTheme(am4themes_myTheme);

function TeamContributors(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);
    x.paddingRight = 20;
    x.data = props.data;
    x.logo.height = -15
    x.padding(40, 40, 40, 40);
    var categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    var valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    var series = x.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "country";
    series.dataFields.valueY = "visits";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10
    series.columns.template.width = am4core.percent(50);
    let label = categoryAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 120
    //series.interpolationDuration = 1500;
    //series.interpolationEasing = am4core.ease.linear;
    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
    x.zoomOutButton.disabled = true;
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return x.colors.getIndex(target.dataItem.index);
    });
    categoryAxis.sortBySeries = series;
  });


  return (
    <div id="chartdiv" style={{ width: "100%", height: "420px" }}></div>
  );
}
export default TeamContributors;
