/**
 * Created by Jonathan on 9/17/16.
 */


var React = require("react"),
    request = require("request"),
    data = require("../../../config/demo.json");

var Analytics = React.createClass({

    render: function () {
        return (
            <div id="chart" style={{width: window.width, height: 500}}>
                This is where the graph should populate.
            </div>
        );
    },

    componentDidMount: function () {
        google.charts.load('current', {'packages':['scatter']});
        google.charts.setOnLoadCallback(this._drawChart);
    },

    _drawChart: function () {
        var data = new google.visualization.DataTable();
        data.addColumn("number", "Date");
        data.addColumn("number", "Final");

        var options = {
            title: 'Date vs. Weight comparison',
            hAxis: {title: 'Date', minValue: 0, maxValue: 15},
            vAxis: {title: 'Subject', minValue: 0, maxValue: 15},
            legend: 'none'
        };

        var chart = new google.charts.Scatter(document.getElementById('chart'));

        chart.draw(data, google.charts.Scatter.convertOptions(options));

        request("http://localhost:8080/api/getMetrics");
    }
});

module.exports = Analytics;
