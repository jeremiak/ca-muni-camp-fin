#!/bin/sh

rm -f filings.db
csvs-to-sqlite data/*.csv filings.db