define([], function() {
  let viewModel;

  beforeEach(done => {
    require(['./form/form.model'], function(vm) {
      viewModel = vm.init();

      done();
    });
  });

  describe('GIVEN there is a form model', () => {
    it('THEN it should have some initial values', () => {
      expect(viewModel.get('expenses').length).toBe(0);
      expect(viewModel.type.length).toBe(4);
      expect(viewModel.get('type')[0].get('name')).toBe('Food');
    });

    describe('AND the user wants to create a new item', () => {
      it('THEN a new item should be created', () => {
        expect(viewModel.get('amount')).toBeNull();
        expect(viewModel.get('expenses').length).toBe(0);
        viewModel.create.call(viewModel);
        
        expect(viewModel.get('expenses').length).toBe(1);
        expect(viewModel.get('expenses')[0].toJSON()).toEqual({ Type: 'food', Merchant: null, Amount: null });
        expect(viewModel.get('amount')).toBe('');
        expect(viewModel.get('expenseType')).toBe('food');
        expect(viewModel.get('merchant')).toBe('');
      });
    });
  });
});
