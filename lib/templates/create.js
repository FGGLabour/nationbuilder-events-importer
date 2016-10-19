var template = `{
  "event": {
    "status": "{{ status }}",
    "name": "{{ name }}",
    "intro": "{{ intro }}",
    "time_zone": "{{ time_zone }}",
    "start_time": "{{ start_time }}",
    "end_time": "{{ end_time }}",
    "contact": {
      "name": "{{ contact.name }}",
      "contact_phone": "{{ contact.contact_phone }}",
      "show_phone": {{ contact.show_phone }},
      "contact_email": "{{ contact.contact_email }}",
      "email": "{{ contact.email }}",
      "show_email": {{ contact.show_email }}
    },
    "rsvp_form": {
      "phone": "{{ rsvp_form.phone }}",
      "address": "{{ rsvp_form.address }}",
      "allow_guests": {{ rsvp_form.allow_guests }},
      "accept_rsvps": {{ rsvp_form .accept_rsvps}},
      "gather_volunteers": {{ rsvp_form.gather_volunteers }}
    },
    "show_guests": {{ show_guests }},
    "capacity": {{ capacity }},
    "venue": {
      "name": "{{ venue.name }}",
      "address": {
        "address1": "{{ venuea.address.address1 }}",
        "city": "{{ venuea.address.city }}",
        "state": "{{ venuea.address.state }}"
      }
    }
  }
}`

module.exports = template;
