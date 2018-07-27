define(['kendo.all.min'], function(kendo) {
  var viewModel = () => {
    return kendo.observable({
      // the expenses array will hold the grid values
      expenses: [],

      // the type array populates the drop down
      type: [
        { name: 'Food', value: 'food' },
        { name: 'Clothing', value: 'clothing' },
        { name: 'Bills', value: 'bills' },
        { name: 'Drinks', value: 'drinks' }
      ],

      // the expenseType holds the currently selected value of the dropdown list
      expenseType: 'food',

      // the values are bound to the merchant and amount fields
      merchant: null,
      amount: null,

      // the event executes on clicking the Add button
      create: function(e) {
        // add the items to the array of expenses
        this.get('expenses').push({ Type: this.get('expenseType'), Merchant: this.get('merchant'), Amount: this.get('amount') });

        // reset the form
        this.set('expenseType', 'food');
        this.set('merchant', '');
        this.set('amount', '');
      }
    });
  };

  return {
    init: () => viewModel()
  };
});
