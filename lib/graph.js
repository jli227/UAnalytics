/**
 * Created by Jonathan on 9/17/16.
 */

var _ = require("lodash"),
    googleConfig = require("../config/appEngineKey"),
    google = require("google-cloud")({
            projectId: googleConfig.project_id,
            keyFilename: "../config/appEngineKey.json"
         }),
    storage = require("@google-cloud/storage"),
    bigQuery = require("@google-cloud/bigquery");

module.exports = {
    getData : function(cb) {

        cb();
    }
};