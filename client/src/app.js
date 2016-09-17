/**
 * Created by Jonathan on 9/17/16.
 */

var React = require("react"),
    ReactDOM = require("react-dom"),

    chart = document.getElementById("chart"),

    Analytics = require("./components/Analytics");

window.React = React;

ReactDOM.render(<Analytics />, chart);