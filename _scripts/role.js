var Role = Backbone.Model.extend({

  toString: function(){
    return this.get('name');
  }

});
