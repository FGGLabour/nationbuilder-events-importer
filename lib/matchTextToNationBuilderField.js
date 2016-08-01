var nationBuilderFieldsToTextMappings = {
  "status": ["Status"],
  "name": ["Title", "Name"],
  "intro": ["Short description"],
  "start_time": ["Start", "Begins at", "start time"],
  "end_time" : ["End", "Finishes"]
};

var textToNationBuilderFieldsMappings = Object.keys(nationBuilderFieldsToTextMappings).reduce(function(map, key) {
  return nationBuilderFieldsToTextMappings[key].reduce(function(map, field) {
    map[field.toLowerCase()] = key;
    return map;
  }, map)
}, {});

function matchTextToNationBuilderField(text) {
  return textToNationBuilderFieldsMappings[text.toLowerCase()];
};

module.exports = matchTextToNationBuilderField;
