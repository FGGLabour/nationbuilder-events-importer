var request = require("request");
var Converter = require("csvtojson").Converter;
var convertCSVHeaderToNationBuilderField = require("./lib/convertCSVHeaderToNationBuilderField")
var config = require("./config");

config.access_token = process.env.ACCESS_TOKEN;

var args = process.argv.slice(2);
var pathToCSV = args[0];

var csvToNationBuilderConverter = new Converter({ constructResult:false });

csvToNationBuilderConverter.preProcessLine = convertHeadersToNationBuilderFields;

csvToNationBuilderConverter.transform = removeEmptyValues;

csvToNationBuilderConverter.on("record_parsed", function(json, row, index) {
  json = { event: json }
  console.log(json);
});

require("fs").createReadStream(pathToCSV).pipe(csvToNationBuilderConverter).pipe(putToNationBuilder());

function convertHeadersToNationBuilderFields(line,lineNumber){
  if (lineNumber === 1){
    line = line.split(',').map(function(header) {
      return convertCSVHeaderToNationBuilderField(header);
    }).join(',')
  }
  return line;
}

function removeEmptyValues(json) {
  Object.keys(json).forEach(function(key) {
    if (isEmpty(json[key])) delete(json[key])

    function isEmpty(value) {
      return !((typeof value == 'string' || value instanceof String) ? value.trim().replace(/[\-_]/g, '') : value);
    }
  })
}

function putToNationBuilder() {
  return request.put(createEventURL())
}

function createEventURL() {
  return "https://" + config.nation_slug + ".nationbuilder.com/api/v1/sites/" + config.site_slug + "/pages/events?access_token=" + config.access_token;
}
