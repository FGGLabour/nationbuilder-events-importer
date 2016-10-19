function validateEvent(json) {

  return new Promise(function(resolve, reject) {
    var errors = [];

    if (!(Object.keys(json).every(function(key) { return key == 'event' }))) { 
      errors.push(new Error("Invalid format")) 
    }

    missingRequiredEventFields(Object.keys(json['event'] || [])).forEach(function(field) {
      errors.push(new Error("'" + field + "' field is missing from event"));
    })

    Object.keys(json['event'] || []).forEach(function(key) { 
      if (!isValidEventField(key)) { errors.push(new Error("'" + key + "' is an invalid event field")) }
    })


    if (errors.length > 0) { 
      return reject(errors);
    }

    return resolve(json);

  })

}

function isValidEventField(fieldName) {
  var validEventFields = ["status", "name", "intro", "time_zone", "start_time", "end_time", "contact", "rsvp_form", "show_guests", "capacity", "venue"];
  return validEventFields.indexOf(fieldName) > -1; 
}

function missingRequiredEventFields(fields) {
  var requiredEventFields = [ "name", "start_time", "end_time", "venue"];
  return requiredEventFields.filter(function(field) {
    return fields.indexOf(field) < 0;
  }) 

}

module.exports = validateEvent;
