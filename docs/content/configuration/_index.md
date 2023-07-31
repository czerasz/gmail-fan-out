---
title: Configuration
weight: 2
---

{{< lead >}}Customize and tweak using Apps Script Properties.{{< /lead >}}

## Properties

{{< table style="table-striped" >}}
| Name | Description | Default | Required |
| --- | --- | --- | --- |
| `EMAIL_COLUMN_ID` | Column used to store subscriber emails | `A` | `false` |
| `ACTIVE_COLUMN_ID` | Column used to store subscriber status (set to `TRUE` means subscription is enabled) | `B` | `false` |
| `UPDATED_AT_COLUMN_ID` | Column used to store date when the record was updated | `C` | `false` |
| `PRODUCER_EMAIL` | The email address for which messages should be distributed<br /><br />Example `test@example.com` | - | `true` |
| `SPREADSHEET_ID` | Spreadsheet ID. <br />Go to the spreadsheet and click Tools/Script Editor and execute:<br /><br /><pre>console.log(SpreadsheetApp.getActiveSpreadsheet().getId())</pre>Example `1GuA3WNksr5rTi6gzYHYBSUYn276izDfCbGaLvIBgkKK` | - | `true` |
| `SUBSCRIBER_SHEET_NAME` | Name of the sheet used to store subscriber emails<br /><br />Example `Subscribers 2023` | - | `true` |
| `TEST` | Set to `true` to run in "test" mode | `false` | `false` |
| `TEST_PRODUCER_EMAIL` | The email address for which messages should be distributed in **test mode**.<br />Overwrites `PRODUCER_EMAIL` | - | `true` if `TEST` set to `true` |
| `TEST_SUBSCRIBER_SHEET_NAME` | Name of the sheet used to store subscriber emails in **test mode**.<br />Overwrites `SUBSCRIBER_SHEET_NAME` | - | `true` if `TEST` set to `true` |
| `SUBSCRIBE_SUBJECTS` | Email subject(s) separated by `\|` used to recognize subscribe "requests" | `subscribe` | `false` |
| `UNSUBSCRIBE_SUBJECTS` | Email subject(s) separated by `\|` used to recognize unsubscribe "requests" | `unsubscribe` | `false` |
| `FORWARDED_LABEL_NAME` | Label used to mark emails as forwarded | `forwarded` | `false` |
| `CONSUMED_LABEL_NAME` | Label used to mark emails as already consumed | `consumed` | `false` |
{{< /table >}}
