---
title: Setup
description: How to setup Gmail fan out
---

1. Create Gmail accout
1. Create new Spreadsheet

   Example name "Newsletter List"

   Remember the Spreadsheet ID.
   Spreadsheet ID is the long string in the URL `https://docs.google.com/spreadsheets/d/<Spreadsheet ID>/edit`

1. Visit [Apps Script console](https://script.google.com/home/)
1. Create new project

   Example name "Forward Emails"

1. Add required properties

   - click on "Project Settings"
   - scroll down to "Script Properties"
   - click "Add script property" and provide key-vaue pairs

     Find required properties [here](/configuration#properties)

1. Create main script

   - go to the "Editor" section and add a new file

     call the file `index.gs`

   - populate it's content from the latest release

1. Create triggers - cronjobs

   In the top menu choose the `setTriggers` function from the drop down menu and click the "Run" button
