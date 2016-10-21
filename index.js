require('dotenv').config();
var fs = require("fs");
var Converter = require("csvtojson").Converter;

var convertCSVHeaderToNationBuilderField = require("./lib/convertCSVHeaderToNationBuilderField");
var validateEvent = require("./lib/validateEvent");
var NationBuilder = require("./lib/NationBuilder");

var nb = new NationBuilder(process.env.NATION_SLUG, process.env.SITE_SLUG, process.env.ACCESS_TOKEN);

var pathsToCSVfiles = [].concat(process.argv.slice(2));

var csvToNationBuilderConverter = new Converter({ constructResult:false });
    csvToNationBuilderConverter.preProcessLine = convertCSVHeadersToNationBuilderFields;

pathsToCSVfiles.forEach(function(pathToCSVFile) {

  var csvStream = fs.createReadStream(pathToCSVFile);

  csvToNationBuilderConverter.on("record_parsed", function(json) {

    Promise.resolve(removeEmptyValues(json))
    .then(validateEvent)
    .then(nb.createEvent)
    .then(function(event) { return console.log(event) })
    .catch(function(errors) { return console.log(errors) })

  });

  csvStream.pipe(csvToNationBuilderConverter)

})

function removeEmptyValues(json) {
  Object.keys(json['event']).forEach(function(key) {

    if (isEmpty(json['event'][key])) delete(json['event'][key])

    function isEmpty(value) {
      return !((typeof value == 'string' || value instanceof String) ? value.trim().replace(/[\-_]/g, '') : value);
    }

  })
  return json;
}

function convertCSVHeadersToNationBuilderFields(line,lineNumber){
  if (lineNumber === 1){
    line = line.split(',').map(function(header) {
      return convertCSVHeaderToNationBuilderField(header);
    }).join(',')
  }
  return line;
}
