var Type = Backbone.Model.extend({

  idAttribute: '_id',

  toString: function(){
    return this.get('name');
  }

});