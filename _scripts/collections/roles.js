
var Roles = Backbone.Collection.extend({

  model: Role,
  
  initialize: function(){
    this.add([
      {
        id: 1,
        name: 'Room Manager'
      },
      {
        id: 2,
        name: 'AV'
      }
    ]);
  }
  
});
