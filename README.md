# CA municipal campaign finance

Publishing campaign finance filings from around California as an API. You can see all of the entities from which we scrape filings in [`config.js`](config.js).

## Running the scripts

### Before we get started

You'll need NodeJS and Python 3+ installed. Then install dependencies from each language:

1. `npm install`
1. `pip install -r requirements.txt`

### Ready, set, download

```npm start```

You can determine which years will be downloaded from each municipality/entity by setting the `YEARS` variable to a comma separated list. By default, it will just download campaign data for 2020.

### Updating the public database

There's a public Heroku instance where this data gets updated once a day. That is done automatically with `step-5-publish-to-heroku.sh`.