# UAnalytics (Work-in-Progress)

### Analytics extraction for the sake of correlation identification and comparisons

_This project is nowhere near complete - I will be continuing to work on it!_

Utilizing a Google Apps Script, users are able to scrape information from subreddits in order to perform sentiment and entity analysis in order to identify trending topics and positive/negative associations with particular topics. For instance, a use case can be comparing trending topics at different universities: "uwaterloo" and "udub" subreddits likely would have a stark contrast in content. Once the information is formatted into a Google Sheets spreadsheet, the idea was for the information to be stored in Google Cloud Storage and then to utilize BigQuery to fetch cached subreddits and/or create new tables for new queries. In the future, comparison graphs can be utilized to convey the differences in popularity amongst topics, and compare sentiments across numerous universities. The idea is that this tool would be able to be used for general subreddit analysis, and other dataset analysis, so long as it's formatted in a readable format.
