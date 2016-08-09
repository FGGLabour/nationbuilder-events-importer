var nationBuilderFieldsToCSVHeadersMappings = {
  "status": ["status"],
  "name": ["name", "title"],
  "intro": ["intro", "short description"],
  "time_zone": ["time_zone"],
  "start_time": ["start_time", "start", "begins at", "start time"],
  "end_time": ["end_time", "end", "finishes"],
  "contact.name": ["contact_name", "contact name"],
  "contact.phone": ["contact_phone", "contact phone"],
  "contact.show_phone": ["contact_show_phone"],
  "contact.contact_email": ["contact_email"],
  "contact.email": ["email"],
  "contact.show_email" : ["show_email"],
  "rsvp_form.phone": ["phone", "rsvp_form_phone"],
  "rsvp_form.address": ["address", "rsvp_form_address"],
  "rsvp_form.allow_guests": ["allow_guests", "rsvp_form_allow_guests"],
  "rsvp_form.accept_rsvps": ["accepts_rsvps", "rsvp_form_accept_rsvps"],
  "rsvp_form.gather_volunteers": ["gather_volunteers", "rsvp_form_gather_volunteers"],
  "show_guests": ["show_guests", "show guests"],
  "capacity": ["capacity"],
  "venue.name": ["venue", "where", "address_name"],
  "venue.address.address1": ["address_line_1"],
  "venue.address.city": ["city"],
  "venue.address.state": ["state", "county"]
};

var csvHeadersToNationBuilderFieldsMappings = Object.keys(nationBuilderFieldsToCSVHeadersMappings).reduce(function(map, key) {
  return nationBuilderFieldsToCSVHeadersMappings[key].reduce(function(map, field) {
    map[field.toLowerCase()] = key;
    return map;
  }, map)
}, {});

function convertCSVHeadersToNationBuilderField(text) {
  return csvHeadersToNationBuilderFieldsMappings[text.trim().toLowerCase()] || text;
};

module.exports = convertCSVHeadersToNationBuilderField;
