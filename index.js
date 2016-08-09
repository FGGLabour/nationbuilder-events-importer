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

csvToNationBuilderConverter.on("record_parsed", function(data, row, index) {
  var eventData = { "event": data }
  console.log(eventData);
  request({
    url: createEventURL(),
    method: "POST",
    json: true,
    headers:  { "content-type": "application/json" },
    body: eventData
  },function(err, res, body) {
    console.log(err);
    console.log(body)
  })

});

require("fs").createReadStream(pathToCSV).pipe(csvToNationBuilderConverter); //.pipe(putToNationBuilder());

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
  return request.post(createEventURL())
}

function createEventURL() {
  return "https://" + config.nation_slug + ".nationbuilder.com/api/v1/sites/" + config.site_slug + "/pages/events?access_token=" + config.access_token;
}
