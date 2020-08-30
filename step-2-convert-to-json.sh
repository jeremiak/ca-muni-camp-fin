#!/bin/bash

echo "Unzipping files"
ZIP_FILES=$(ls data/*.zip)
for FILE in $ZIP_FILES; do
  unzip -o $FILE -d data
done

echo "Converting Excel files into JSON"
EXCEL_FILES=$(ls data/*.xlsx)
for FILE in $EXCEL_FILES; do
  BASENAME=$(basename -s .xlsx $FILE)
  DEST=$(echo "data/$BASENAME.json")
  npx convert-excel-to-json --config="{\"sourceFile\": \"$FILE\", \"header\": { \"rows\": 1 }, \"columnToKey\": { \"*\": \"{{columnHeader}}\" } }" > $DEST
done

echo "Step 2 done!"