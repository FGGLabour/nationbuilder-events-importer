var assert = require("chai").assert;
var validateEvent = require("../../lib/validateEvent");

describe("an event", function() {

  describe("that is valid", function() {
  
    it("promises an event", function() {

      var validEvents = [
        { "event": { "name" : "example.name", "venue": "example.venue", "start_time" : "04-01-2016", "end_time": "04-01-2016"  } }
      ]

      validEvents.forEach(function(event) {
        validateEvent(event).then(function(result) { 
          assert.equal(event, result);
        }).catch(function(errors) {
          assert.equal(errors, []);
        })
      })

    })

  });

  describe("that is invalid", function() {

    it("promises a collection of errors", function() {

      validateEvent({ "invalid": {} }).then(function(result) {
        assert.equal(event, null);
      }).catch(function(errors) {
        assert.equal(errors[0].message, "Invalid format")
      })

      validateEvent({ "event": { "statuses": {} } }).then(function(result) { 
        assert.equal(event, null);
      }).catch(function(errors) {
        assert.equal(errors[0].message, "'name' field is missing from event")
        assert.equal(errors[errors.length-1].message, "'statuses' is an invalid event field")
      })

    })

  })

})
