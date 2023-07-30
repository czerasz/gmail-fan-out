// resource:
// - https://www.youtube.com/watch?v=OFuaoeq7gSw
// - https://gist.github.com/benbjurstrom/00cdfdb24e39c59c124e812d5effa39a

const forwardEmailSearch = `in:inbox -label:${ForwardedLabelName} from:${producerEmail}`
const recipients = getSubscribers()
const recipientChunks = chunks(recipients, 50)

// forward emails - fan out
function forwardEmails() {
  console.log(forwardEmailSearch)

  const threads = GmailApp.search(forwardEmailSearch, 0, PageSize)

  console.log(recipients)
  console.log('Processing ' + threads.length + ' threads...')

  // For each thread matching our search
  for (var i = 0; i < threads.length; i++) {
    let thread = threads[i]

    console.log(thread.getFirstMessageSubject())

    let message = thread.getMessages()[0]

    for (let recipients of recipientChunks) {
      message.forward('', {bcc: recipients.join(',')})
    }

    thread.addLabel(ForwardedLabel)
  }

  if (threads.length === PageSize) {
    forwardEmails()
  }
}

// get subscribers from spreadsheet
function getSubscribers() {
  const data = subscriberSheet.getDataRange().getValues()
  const emails = []
  for (var i = 1; i < data.length; i++) {
    const row = data[i]
    const email = row[2].trim()
    const active = row[5]
    if (email != '' && active === true) {
      emails.push(email)
    }
  }

  return emails
}

// split array into chunks of maximum size
function chunks(arr, size) {
  return Array.from(
    new Array(Math.ceil(arr.length / size)),
    (_, i) => arr.slice(i * size, i * size + size)
  )
}
