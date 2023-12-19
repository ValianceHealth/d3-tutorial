import { Fragment } from "react";

import { useD3 } from "../hooks/useD3";

function Circle() {
  const ref = useD3((svg) => {
    let data = [];

    function updateData() {
      data = [];
      data.push(Math.random() * 20);
    }

    function update() {
      svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cy", 50)
        .attr("cx", 40)
        .transition()
        .duration(1000)
        .attr("r", function (d) {
          return d;
        });
    }

    function updateAll() {
      updateData();
      update();
    }

    updateAll();

    svg
      .append("foreignObject")
      .attr("width", 500)
      .attr("height", 30)
      .append("xhtml:div")
      .html("<button>Click Me</button>")
      .on("click", () => updateAll());
  }, []);

  return (
    <Fragment>
      <svg ref={ref} />
    </Fragment>
  );
}

export default Circle;
