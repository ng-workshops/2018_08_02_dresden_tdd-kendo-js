define([], function() {
  let viewModel;

  beforeEach(done => {
    require(['./form/form.model'], function (vm) {
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
        viewModel.create.call(viewModel);
        expect(viewModel.get('amount')).toBe('');
      });
    });
  });
});
