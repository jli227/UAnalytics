/**
  * Created by Jonathan Li
  * Basic web scraper that fetches information from specified subreddit and attempts to format information
  */

var redditUrl = "udub";

function scrapeReddit() {

  // Process 100 Reddit posts in a batch
  var url = "http://www.reddit.com/r/" + redditUrl + "/new.xml?limit=100";

  // Fetch XML format of Reddit page for easier parsing
  var xml = UrlFetchApp.fetch(url).getContentText();
  var doc = XmlService.parse(xml);
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');

  var entries = doc.getRootElement().getChildren("entry", atom);

  var data = new Array();

  for (var i = 0; i < entries.length; i++) {

    /* Extract post date, title, description and link from Reddit */

    var date = entries[i].getChild('updated', atom).getText().substr(0, 10);
    var title = entries[i].getChild('title', atom).getText();
    var desc = entries[i].getChild('content', atom).getText();
    var link = entries[i].getChild('link', atom).getText();

    data[i] = new Array(date, title, getTextFromHtml(desc.substr(desc.length > 34 ? 34 : 0).replace(/<\/?[^>]+(>|$)/g, ""), true), link);
  }

  if (data.length == 0) {
    deleteTriggers();
  } else {
    writeData(data);
  }
}

function getTextFromHtml(html) {
  return getTextFromNode(Xml.parse(html, true).getElement());
}

function getTextFromNode(x) {
  switch(x.toString()) {
    case 'XmlText': return x.toXmlString();
    case 'XmlElement': return x.getNodes().map(getTextFromNode).join('');
    default: return '';
  }
}

/* Single batch write to Google Sheets */
function writeData(data) {

  if (data.length === 0) {
    return;
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = sheet.getLastRow();
  var col = sheet.getLastColumn();

  var range = sheet.getRange(row + 1, 1, data.length, 4);

  try {
    range.setValues(data);
  } catch (e) {
    Logger.log(e.toString());
  }
}

/* Use the ID of the last processed post from Reddit as new starting token */
function getLastID() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets[0];
  var row = sheet.getLastRow();
  var col = sheet.getLastColumn();

  var url = sheet.getRange(row, col).getValue().toString();
  var pattern = /.*comments\/([^\/]*).*/;
  var id = url.match(pattern);

  return id ? "&after=t3_" + id[1] : "";

}

// Pause in-between requests
function extractAll() {
  deleteTriggers();
  ScriptApp.newTrigger("scrapeReddit").timeBased().everyMinutes(1).create();
}

/* All entries have been extracted, so delete the Triggers */
function deleteTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
