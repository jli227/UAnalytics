/**
 * Created by Jonathan on 9/17/16.
 */

var React = require("react"),
    ReactDOM = require("react-dom"),

    main = document.getElementById("main"),
    Analytics = require("./components/Analytics");

window.React = React;

ReactDOM.render(<Analytics />, main);