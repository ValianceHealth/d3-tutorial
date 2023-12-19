import * as d3 from "d3";
import { Fragment } from "react";

import { useD3 } from "./hooks/useD3";

function App() {
  const ref = useD3((svg) => {
    //svg.selectAll("*").remove();
    svg.selectAll("foreignObject").remove();
    svg.selectAll("text").remove();

    svg
      .attr("width", 1280)
      .attr("height", 800)
      .style("outline", "thin solid grey");

    let data = [];

    function updateData() {
      data = [];
      for (let i = 0; i < 1; i++) {
        data.push(Math.random() * 20);
      }
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

    svg
      .append("text")
      .attr("x", 20)
      .attr("y", 150)
      .attr("width", 200)
      .attr("class", "dotme")
      .text("Hello I am a very long text that needs ellipsis");

    svg
      .append("text")
      .attr("x", 20)
      .attr("y", 200)
      .attr("width", 150)
      .attr("text-anchor", "start")
      .attr("class", "wrapme")
      .text("Hello I am a very long text that needs to be wrapped");

    function dot(text) {
      text.each(function () {
        const text = d3.select(this);
        const words = text.text().split(/\s+/);

        const ellipsis = text
          .text("")
          .append("tspan")
          .attr("class", "elip")
          .text("...");
        const width =
          parseFloat(text.attr("width")) -
          ellipsis.node().getComputedTextLength();
        const numWords = words.length;

        const tspan = text
          .insert("tspan", ":first-child")
          .text(words.join(" "));

        while (tspan.node().getComputedTextLength() > width && words.length) {
          words.pop();
          tspan.text(words.join(" "));
        }

        if (words.length === numWords) {
          ellipsis.remove();
        }
      });
    }

    function wrap(text) {
      text.each(function () {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        const lineHeight = 20;
        const width = parseFloat(text.attr("width"));
        const y = parseFloat(text.attr("y"));
        const x = text.attr("x");
        const anchor = text.attr("text-anchor");

        let tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("text-anchor", anchor);
        let lineNumber = 0;
        let line = [];
        let word = words.pop();

        while (word) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            lineNumber += 1;
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", x)
              .attr("y", y + lineNumber * lineHeight)
              .attr("anchor", anchor)
              .text(word);
          }
          word = words.pop();
        }
      });
    }

    svg.selectAll(".dotme").call(dot);
    svg.selectAll(".wrapme").call(wrap);
  }, []);

  return (
    <Fragment>
      <svg ref={ref} />
    </Fragment>
  );
}

export default App;
