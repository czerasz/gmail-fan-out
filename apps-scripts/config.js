// maximum number of message threads to process per run.
const PageSize = 5;

// get property store
const scriptProperties = PropertiesService.getScriptProperties();

const TEST = getPropertyWithDefault(scriptProperties, 'TEST', 'false').trim().toLowerCase() === 'true';

// the email which will be forwarded
var producerEmail = scriptProperties.getProperty('PRODUCER_EMAIL').trim();

if (TEST === true) {
  producerEmail = scriptProperties.getProperty('TEST_PRODUCER_EMAIL').trim();
}

var subscriberSheetName = scriptProperties.getProperty('SUBSCRIBER_SHEET_NAME').trim();
if (TEST === true) {
  subscriberSheetName = scriptProperties.getProperty('TEST_SUBSCRIBER_SHEET_NAME').trim();
}

const emailColumnID = getPropertyWithDefault(scriptProperties, 'EMAIL_COLUMN_ID', 'A').trim().toUpperCase();
const activeColumnID = getPropertyWithDefault(scriptProperties, 'ACTIVE_COLUMN_ID', 'B').trim().toUpperCase();
const updatedAtColumnID = getPropertyWithDefault(scriptProperties, 'UPDATED_AT_COLUMN_ID', 'C').trim().toUpperCase();

const spreadsheetID = scriptProperties.getProperty('SPREADSHEET_ID').trim();

const ForwardedLabelName = getPropertyWithDefault(scriptProperties, 'FORWARDED_LABEL_NAME', 'forwarded').trim();
const ForwardedLabel = GmailApp.getUserLabelByName(ForwardedLabelName);
const ConsumedLabelName = getPropertyWithDefault(scriptProperties, 'CONSUMED_LABEL_NAME', 'consumed').trim();
const ConsumedLabel = GmailApp.getUserLabelByName(ConsumedLabelName);

const SubscribeTopics = getPropertyWithDefault(scriptProperties, 'SUBSCRIBE_SUBJECTS', 'subscribe').trim().split('|');
const UnsubscribeTopics = getPropertyWithDefault(scriptProperties, 'UNSUBSCRIBE_SUBJECTS', 'unsubscribe').trim().split('|');

const ss = SpreadsheetApp.openById(spreadsheetID);
// or SpreadsheetApp.openByUrl()

const subscriberSheet = ss.getSheetByName(subscriberSheetName);

// get property value and fall back to default
function getPropertyWithDefault(properties, name, defaultValue) {
  const property = properties.getProperty(name);

  if (property === null) {
    return defaultValue;
  }

  return property;
}
