var nationBuilderFieldsToCSVHeadersMappings = {
  "event.status": ["status"],
  "event.name": ["name", "title"],
  "event.intro": ["intro", "short description"],
  "event.time_zone": ["time_zone"],
  "event.start_time": ["start_time", "start", "begins at", "start time"],
  "event.end_time": ["end_time", "end", "finishes"],
  "event.contact.name": ["contact_name", "contact name"],
  "event.contact.phone": ["contact_phone", "contact phone"],
  "event.contact.show_phone": ["contact_show_phone"],
  "event.contact.contact_email": ["contact_email"],
  "event.contact.email": ["email"],
  "event.contact.show_email" : ["show_email"],
  "event.rsvp_form.phone": ["phone", "rsvp_form_phone"],
  "event.rsvp_form.address": ["address", "rsvp_form_address"],
  "event.rsvp_form.allow_guests": ["allow_guests", "rsvp_form_allow_guests"],
  "event.rsvp_form.accept_rsvps": ["accepts_rsvps", "rsvp_form_accept_rsvps"],
  "event.rsvp_form.gather_volunteers": ["gather_volunteers", "rsvp_form_gather_volunteers"],
  "event.show_guests": ["show_guests", "show guests"],
  "event.capacity": ["capacity"],
  "event.venue.name": ["venue", "where", "address_name"],
  "event.venue.address.address1": ["address_line_1"],
  "event.venue.address.city": ["city"],
  "event.venue.address.state": ["state", "county"]
};

var csvHeadersToNationBuilderFieldsMappings = Object.keys(nationBuilderFieldsToCSVHeadersMappings).reduce(function(map, key) {
  return nationBuilderFieldsToCSVHeadersMappings[key].reduce(function(map, field) {
    map[field.toLowerCase()] = key;
    return map;
  }, map)
}, {});

function convertCSVHeaderToNationBuilderField(text) {
  return csvHeadersToNationBuilderFieldsMappings[text.trim().toLowerCase()] || "event." + text;
};

module.exports = convertCSVHeaderToNationBuilderField;
