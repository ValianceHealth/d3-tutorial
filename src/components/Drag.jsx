import * as d3 from "d3";
import { Fragment } from "react";

import { useD3 } from "../hooks/useD3";

function Drag() {
  const ref = useD3((svg) => {
    let data = [],
      width = 600,
      height = 400,
      numPoints = 10;

    let drag = d3.drag().on("drag", handleDrag);

    function handleDrag(e) {
      console.log(e);
      e.subject.x = e.x;
      e.subject.y = e.y;
      update();
    }

    function initDrag() {
      svg.selectAll("circle").call(drag);
    }

    function updateData() {
      data = [];
      for (let i = 0; i < numPoints; i++) {
        data.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
        });
      }
    }

    function update() {
      svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        })
        .attr("r", 10);
    }

    updateData();
    update();
    initDrag();
  }, []);

  return (
    <Fragment>
      <svg ref={ref} />
    </Fragment>
  );
}

export default Drag;
