function findAndAddSubscribers() {
  for (let text of SubscribeTopics) {
    const findSubscriberSearch = `in:inbox subject:"${text}" -label:${ConsumedLabelName} -from:${producerEmail}`

    console.log(findSubscriberSearch)
    const threads = GmailApp.search(findSubscriberSearch, 0, PageSize)

    console.log('processing ' + threads.length + ' threads...')

    // For each thread matching our search
    for (var i = 0; i < threads.length; i++) {
      let thread = threads[i]

      let message = thread.getMessages()[0]
      // subscriber email
      const email = parseFrom(message.getFrom())

      console.log('subscribe', email)

      if ((email.trim() !== '') && (subscriberExists(email) === false)) {
        addSubscriber(email)
      }

      // message.moveToTrash()
      thread.addLabel(ConsumedLabel)
    }

    if (threads.length === PageSize) {
      findAndAddSubscribers()
    }
  }
}

function findAndRemoveSubscribers() {
  for (let text of UnsubscribeTopics) {
    const findUnsubscriberSearch = `in:inbox subject:"${text}" -label:${ConsumedLabelName} -from:${producerEmail}`

    console.log(findUnsubscriberSearch)
    const threads = GmailApp.search(findUnsubscriberSearch, 0, PageSize)

    console.log('processing ' + threads.length + ' threads...')

    // For each thread matching our search
    for (var i = 0; i < threads.length; i++) {
      let thread = threads[i]

      let message = thread.getMessages()[0]
      // subscriber email
      const email = parseFrom(message.getFrom())

      console.log('unsubscribe', email)

      if ((email.trim() !== '') && (subscriberExists(email) === true)) {
        unsubscribe(email)
      }

      // message.moveToTrash()
      thread.addLabel(ConsumedLabel)
    }

    if (threads.length === PageSize) {
      findAndRemoveSubscribers()
    }
  }
}

function addSubscriber(email, name = 'Unknown', surname = 'Unknown', phone = 'Unknown', group = -1) {
  if (subscriberExists(email) === false) {
    const now = new Date()
    subscriberSheet.appendRow([name, surname, email, phone, group, true, formatDate(now)])
  }
}

function unsubscribe(email) {
  const rowID = subscriberRow(email);

  if (rowID !== -1) {
    const rowNumber = rowID + 1;
    // set "Active" column to false
    ss.getRange(`${subscriberSheetName}!${activeColumnID}${rowNumber}:${activeColumnID}${rowNumber}`).setValues([[false]])

    updateUpdatedAt(rowNumber)
  }
}

function subscriberExists(email) {
  return subscriberMatch(email, function (_, matched) {
    return matched
  })
}

function subscriberRow(email) {
  return subscriberMatch(email, function(rowID, matched) {
    return rowID
  })
}

function subscriberMatch(email, matchFn) {
  // get last row filled with content
  const lastRow = subscriberSheet.getLastRow()

  // get column with emails
  // format: sheetName!C1:D5
  const emailColumn = ss.getRange(`${subscriberSheetName}!${emailColumnID}1:${emailColumnID}${lastRow}`)

  if (emailColumn === null) {
    throw new Error('no result found with getRange')
  }

  // get column values in format [['value 0'], ['value 1'], ...]
  const emails = emailColumn.getValues()

  // Logger.log(emails)

  // iterate over column values, skip the header
  for(let i = 1; i < emails.length; i++) {
    // check if email equals the one we are looking for
    if (emails[i][0] === email) {
      // the email was not found
      return matchFn(i, true)
    }
  }

  // the email was not found
  return matchFn(-1, false)
}

function updateUpdatedAt(rowNumber) {
  const now = new Date()

  ss.getRange(`${subscriberSheetName}!${updatedAtColumnID}${rowNumber}:${updatedAtColumnID}${rowNumber}`).setValues([[formatDate(now)]])
}

// @returns string formatted date in format YYYY.MM.DD hh:mm:ss
function formatDate(date) {
  const d = [
    date.getFullYear(), // year
    ('0' + (date.getMonth() + 1)).slice(-2), // month
    ('0' + date.getDate()).slice(-2), // day
  ]
  const t = [
    ('0' + date.getHours()).slice(-2), // hour
    ('0' + date.getMinutes()).slice(-2), // minutes
    ('0' + date.getSeconds()).slice(-2), // seconds
  ]
  return d.join('.') + " " + t.join(':')
}

// Possible formats:
// Node Weekly <node@cooperpress.com>
// "Node Weekly" <node@cooperpress.com>
// <node@cooperpress.com>
function parseFrom(text) {
  const regex = /^(.*)<([^>]+)>$/
  const match = text.match(regex)

  if ( match ) {
    // const name = match[1].trim().replace(/^"/, '').replace(/"$/, '')
    const email = match[2]

    return email
  }

  return text
}
