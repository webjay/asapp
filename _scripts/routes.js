Backbone.Router.extend({

  routes: {
    'search/:query':        'search',  // #search/kiwis
    'search/:query/p:page': 'search'   // #search/kiwis/p7
  },

  search: function (query, page) {
  }

});
