function whenAll (objects, event, callback) {
  var callbackWrapper = _.after(objects.length, callback);
  _.each(objects, function (obj) {
    obj.once(event, callbackWrapper, this);
  }, this);
}
