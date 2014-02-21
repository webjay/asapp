
var Cases = Backbone.Collection.extend({

  model: Case,
  
  initialize: function(){
    this.add([
      {
        id: 1,
        name: 'AV'
      },
      {
        id: 2,
        name: 'Recording'
      },
      {
        id: 3,
        name: 'pc'
      }
    ]);
  }
  
});
