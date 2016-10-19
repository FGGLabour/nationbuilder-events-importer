function NationBuilder(nation_slug, site_slug, access_token) {
  this.nation_slug = nation_slug || (function() { throw new Error("Missing argument: nation_slug") })();
  this.site_slug = site_slug || (function() { throw new Error("Missing argument: site_slug") })();
  this.access_token = access_token || (function() { throw new Error("Missing argument: access_token") })();
}

NationBuilder.prototype.createEvent = function(event) {

  var that = this;
  
  return promiseTo(createEventRequest(event));

  function promiseTo(details) {
    var request = require("request");
    return new Promise(function(resolve, reject) { 
      request(details, function(err, res, body) {
        if (err) return reject(err);
        if (res.statusCode != 200) { return reject(body) };
        return resolve(body);
      })
    })
  }

  function createEventRequest(event) {
    return {
      url: completeURL("/pages/events"),
      method: "POST",
      json: true,
      headers: { 'content-type': "application/json" },
      body: event
    }        
  }

  function completeURL(path) {
    return "https://" + that.nation_slug + ".nationbuilder.com/api/v1/sites/" + that.site_slug + path + "?access_token=" + that.access_token;
  }

};

module.exports = NationBuilder;
