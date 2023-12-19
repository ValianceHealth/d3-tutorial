import * as d3 from "d3";
import { Fragment } from "react";

import { useD3 } from "../hooks/useD3";

function BarChart() {
  const ref = useD3((svg) => {
    const data1 = [
      { group: "A", value: 4 },
      { group: "B", value: 16 },
      { group: "C", value: 8 },
    ];

    const data2 = [
      { group: "A", value: 7 },
      { group: "B", value: 1 },
      { group: "C", value: 20 },
      { group: "D", value: 10 },
    ];

    const margin = { top: 30, right: 30, bottom: 0, left: 30 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    svg.selectAll(".xAxis").remove();

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialize the X axis
    const x = d3.scaleBand().range([0, width]).padding(0.2);
    const xAxis = svg
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0,${height})`);

    // Initialize the Y axis
    const y = d3.scaleLinear().range([height, 0]);
    const yAxis = svg.append("g").attr("class", "yYaxis");

    function update(data) {
      // Update the X axis
      x.domain(data.map((d) => d.group));
      xAxis.transition().duration(1000).call(d3.axisBottom(x));

      // Update the Y axis
      y.domain([0, d3.max(data, (d) => d.value)]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

      // Create the bars
      svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .transition()
        .duration(1000)
        .attr("x", (d) => x(d.group))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .attr("fill", "#69b3a2");
    }

    // Buttons to change data
    svg
      .append("foreignObject")
      .attr("width", 500)
      .attr("height", 30)
      .append("xhtml:div")
      .html("<button>Click Me</button>")
      .on("click", () => update(data1));

    svg
      .append("foreignObject")
      .attr("width", 500)
      .attr("height", 30)
      .attr("y", 30)
      .append("xhtml:div")
      .html("<button>Click Me</button>")
      .on("click", () => update(data2));

    // Initialize the plot with the first dataset
    update(data1);
  }, []);

  return (
    <Fragment>
      <svg ref={ref} />
    </Fragment>
  );
}

export default BarChart;
