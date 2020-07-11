const SVGChrt = require('svgchrt');
const d3 = Object.assign({}, require('d3-selection'), require('d3-scale'), require('d3-axis'));

class SVGChrtAxes extends SVGChrt {
  plot() {
    const domains = {
      bottom : this.settings.chart.axes.bottom.display
               ? this.data // callbacks like sort and map
               : undefined,
      left   : this.settings.chart.axes.left.display
               ? this.settings.chart.type === 'clustered'
                 ? [0, d3.max(data, d => d.value)]
                 : this.settings.chart.type === 'stacked'
                   ? [0, d3.max(sum)]
                   : this.settings.chart.type === 'stacked100'
                     ? [0, 100]
                     : undefined
               : undefined,
      top    : this.settings.chart.axes.top.display
               ? this.data
               : undefined,
      right  : this.settings.chart.axes.left.display
               ? this.settings.chart.type === 'clustered'
                 ? [0, d3.max(data, d => d.value)]
                 : this.settings.chart.type === 'stacked'
                   ? [0, d3.max(sum)]
                   : this.settings.chart.type === 'stacked100'
                     ? [0, 100]
                     : undefined
               : undefined
    };
    const ranges = {
      bottom : domains.bottom
               ? [
                   0,
                   this.getChartArea().width
                 ]
               : undefined,
      left   : domains.left
               ? [
                   this.getChartArea().height,
                   0
                 ]
               : undefined,
      top    : domains.top
               ? [
                   0,
                   this.getChartArea().width
                 ]
               : undefined,
      right  : domains.right
               ? [
                   this.getChartArea().height,
                   0
                 ]
               : undefined
    };
    const scales = {
      bottom : ranges.bottom
               ? d3.scaleBand()
                   .domain(domains.bottom)
                   .range(ranges.bottom)
                   .padding(0.1) // Variable for padding?
               : undefined,
      left   : ranges.left
               ? d3.scaleLinear() // Options for things like scaleLog etc.
                   .domain(domains.left)
                   .range(ranges.left)
                   .nice()
               : undefined,
      top    : ranges.top
               ? d3.scaleBand()
                   .domain(domains.top)
                   .range(ranges.top)
                   .padding(0.1)
               : undefined,
      right  : ranges.right
               ? d3.scaleLinear() // Same options as on left
                   .domain(domains.right)
                   .range(ranges.right)
                   .nice()
               : undefined
    };
    const axisFuncs = {
      bottom : scales.bottom
               ? d3.axisBottom(scales.bottom)
                   .ticks(domains.bottom.length)
               : undefined,
      left   : scales.right
               ? d3.axisLeft(scales.left) // Callbacks like tickFormat
               : undefined,
      top    : scales.top
               ? d3.axisTop(scales.top)
               : undefined,
      right  : scales.right
               ? d3.axisRight(scales.right)
               : undefined
    };

    const axes = {
      bottom : axisFuncs.bottom
               ? this.appendSVGChild('g', this.chartArea, {
                   'class' : 'axis x-axis bottom-axis'
                 })
               : undefined,
      left   : axisFuncs.left
               ? this.appendSVGChild('g', this.chartArea, {
                   'class' : 'axis y-axis left-axis'
                 })
               : undefined,
      top    : axisFuncs.top
               ? this.appendSVGChild('g', this.chartArea, {
                   'class' : 'axis x-axis top-axis'
                 })
               : undefined,
      right  : axisFuncs.right
               ? this.appendSVGChild('g', this.chartArea, {
                   'class' : 'axis y-axis right-axis'
                 })
               : undefined
    };

    const axisScales = {
      bottom : axes.bottom
               ? this.appendSVGChild('g', axes.bottom, {
                   'class' : 'axis-scale x-axis-scale bottom-axis-scale'
                 })
               : undefined,
      left   : axes.left
               ? this.appendSVGChild('g', axes.left, {
                   'class' : 'axis-scale y-axis-scale left-axis-scale'
                 })
               : undefined,
      top    : axes.top
               ? this.appendSVGChild('g', axes.top, {
                   'class' : 'axis-scale x-axis-scale top-axis-scale'
                 })
               : undefined,
      right  : axes.right
               ? this.appendSVGChild('g', axes.right, {
                   'class' : 'axis-scale y-axis-scale right-axis-scale'
                 })
               : undefined
    };

    if (axisScales.bottom) {
      d3.select(axisScales.bottom)
        .call(axisFuncs.bottom);
    }
    if (axisScales.left) {
      d3.select(axisScales.left)
        .call(axisFuncs.left);
    }
    if (axisScales.right) {
      d3.select(axisScales.right)
        .call(axisFuncs.right);
    }
    if (axisScales.top) {
      d3.select(axisScales.top)
        .call(axisFuncs.top);
    }

    const axisLabels = {
      bottom : axes.bottom &&
               settings.chart.axes.bottom.label.display &&
               settings.chart.axes.bottom.label.text
               ? this.appendSVGChild('text', axes.bottom, {
                   'class'         : 'axis-label x-axis-label bottom-axis-label',
                   'dy'            : '1em',
                   'text-anchor'   : 'middle',
                   'transform'     : `translate(0,${axisScales.bottom.getBBox().height + 4})`
                 }, 'Bottom Label')
               : undefined,
      left   : axes.left &&
               settings.chart.axes.left.label.display &&
               settings.chart.axes.left.label.text
               ? this.appendSVGChild('text', axes.left, {
                   class         : 'axis-label y-axis-label left-axis-label',
                   dy            : '1em',
                   'text-anchor' : 'middle',
                   transform     : `rotate(270)`
                 }, 'Left Label')
               : undefined,
      top    : axes.top &&
               settings.chart.axes.top.label.display &&
               settings.chart.axes.top.label.text
               ? this.appendSVGChild('text', axes.top, {
                   'class'         : 'axis-label x-axis-label top-axis-label',
                   'dy'            : '1em',
                   'text-anchor'   : 'middle',
                   'transform'     : `translate(0,0)`
                 }, 'Top Label')
               : undefined,
      right  : axes.right &&
               settings.chart.axes.right.label.display &&
               settings.chart.axes.right.label.text
               ? this.appendSVGChild('text', axes.right, {
                   'class'         : 'axis-label y-axis-label right-axis-label',
                   'dy'            : '1em',
                   'text-anchor'   : 'middle',
                   'transform'     : `rotate(270)`
                 }, 'Right Label')
               : undefined
    };

    if (axes.bottom) {
      // Nothing needs doing, not yet anyway
    }
    if (axes.left) {
      axisScales.left.setAttribute('transform', `translate(${axisLabels.left.getBBox().height + 4 + axisScales.left.getBBox().width},0)`);
    }
    if (axes.top) {
      axisScales.top.setAttribute('transform', `translate(0,${axisLabels.top.getBBox().height + 4})`);
    }
    if (axes.right) {
      axisLabels.right.setAttribute('transform', `translate(0,${axisScales.right.getBBox().width + 4})`);
    }

    if (axes.bottom) {
      if (axes.left) {
        ranges.left[1] = axes.bottom.getBBox().height;
        scales.left.range(ranges.left);
      }
      if (axes.right) {
        ranges.right[1] = axes.bottom.getBBox().height;
        scales.right.range(ranges.right);
      }
    }
    if (axes.left) {
      if (axes.top) {
        ranges.top[0] = axes.left.getBBox().width;
        scales.top.range(ranges.top);
      }
      if (axes.bottom) {
        ranges.bottom[0] = axes.left.getBBox().width;
        scales.bottom.range(ranges.bottom);
      }
    }
    if (axes.top) {
      if (axes.left) {
        ranges.left[0] = axes.top.getBBox().height;
        scales.left.range(ranges.left);
      }
      if (axes.right) {
        ranges.right[0] = axes.top.getBBox().height;
        scales.right.range(ranges.right);
      }
    }
    if (axes.right) {
      if (axes.top) {
        ranges.top[1] = axes.right.getBBox().width;
        scales.top.range(ranges.top);
      }
      if (axes.bottom) {
        ranges.bottom[1] = axes.right.getBBox().width;
        scales.bottom.range(ranges.bottom);
      }
    }

    if (axisScales.bottom) {
      d3.select(axisScales.bottom).call(axisFuncs.bottom);
      axisLabels.bottom.setAttribute('transform', `translate(${(ranges.bottom[0] + ranges.bottom[1]) / 2},${axisScales.bottom.getBBox().height})`);
      axes.bottom.setAttribute('transform', `translate(0,${this.getChartArea().height - axes.bottom.getBBox().height})`);
    }
    if (axisScales.left) {
      d3.select(axisScales.left).call(axisFuncs.left);
      axisLabels.left.setAttribute('transform', `translate(0,${(ranges.left[0] + ranges.left[1]) / 2}) rotate(270)`);
    }
    if (axisScales.right) {
      d3.select(axisScales.right).call(axisFuncs.right);
      axisLabels.left.setAttribute('transform', `translate(0,${(ranges.right[0] + ranges.right[1]) / 2}) rotate(270)`);
      axes.right.setAttribute('transform', `translate(${this.getChartArea().width - axes.right.getBBox().width},0)`)
    }
    if (axisScales.top) {
      d3.select(axisScales.top).call(axisFuncs.top);
      axisLabels.bottom.setAttribute('transform', `translate(${(ranges.top[0] + ranges.top[1]) / 2},0)`);
    }
  }
}

module.exports = SVGChrtAxes; // Could use this in svgchrt to export the bits I and the user need to add stuff?
