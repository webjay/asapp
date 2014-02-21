var Request = Backbone.Model.extend({

  schema: {
    problem: { 
      type: 'Select', 
      options: new Cases(),
      validators: ['required'] 
    },
    location: { 
      type: 'Select', 
      options: ['W 3002', 'W 3003', 'W 3004'],
      validators: ['required'] 
    },
    description: { 
      validators: ['required'] 
    },
    urgent: { 
      type: 'Radio',
      options: {
        false: 'No',
        true: 'Yes'
      }
    }
  }

});
