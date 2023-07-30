// create needed triggers
function setTriggers(){
  cleanupTriggers()

  createTrigger(ScriptApp.newTrigger('forwardEmails'))
  createTrigger(ScriptApp.newTrigger('findAndAddSubscribers'))
  createTrigger(ScriptApp.newTrigger('findAndRemoveSubscribers'))
}

// create single trigger
function createTrigger(trigger) {
  if (TEST === true) {
    trigger.timeBased().everyMinutes(1).create()
  } else {
    trigger.timeBased().everyHours(1).create()
  }
}

// delete all triggers
function cleanupTriggers(){
  var triggers = ScriptApp.getProjectTriggers()
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i])
  }
}
