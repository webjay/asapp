
var Rooms = Backbone.Collection.extend({

  model: Room,
  
  initialize: function(){
    this.add([
      {
        id: 1,
        name: 'W 3002'
      },
      {
        id: 2,
        name: 'W 3003'
      },
      {
        id: 3,
        name: 'W 3004'
      }
    ]);
  }
  
});
