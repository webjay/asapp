var User = Backbone.Model.extend({

  schema: {
    name: { 
      validators: ['required'] 
    },
    email: { 
      dataType: 'email',
      validators: ['required', 'email'] 
    },
    phone: {
      dataType: 'tel'
    },
    role: { 
      type: 'Select', 
      options: new Roles()
    }
  }

});
