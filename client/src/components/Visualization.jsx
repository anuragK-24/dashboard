import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { fetchData } from '../services/api';

const Visualization = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();
  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      drawChart(data);
    });
  }, []);

  const drawChart = (data) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const xScale = d3.scaleBand()
      .domain(data.map(d => d._id))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => xScale(d._id))
      .attr('y', d => yScale(d.intensity))
      .attr('height', d => yScale(0) - yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('fill', 'steelblue');

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  };

  return (
    <div>
      <svg ref={svgRef} width={800} height={600}></svg>
    </div>
  );
};

export default Visualization;
