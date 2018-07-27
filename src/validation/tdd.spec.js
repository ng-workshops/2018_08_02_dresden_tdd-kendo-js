define(['./steps/validation_0'], function(val) {
  function generateForm() {
    const form = `
    <form class="test-form">
      <input name="first-name" type="text" data-validation="alphabetical" placeholder="firstname" />
      <input name="age" type="text" data-validation="numeric" placeholder="age" />
    </form>`;

    var body = document.getElementsByTagName('body')[0];
    const container = document.createElement('div');
    container.style.display = 'none';
    container.innerHTML = form;
    body.appendChild(container);

    let formElement = document.querySelector('.test-form');
    return formElement.cloneNode(true);
  }

  describe('Testing the form', () => {
    let form;

    beforeEach(() => {
      form = generateForm();
    });

    it('STEP 1 should validate a form with all of the possible validation types', function() {
      const name = form.querySelector('input[name="first-name"]');
      const age = form.querySelector('input[name="age"]');

      name.value = 'Bob';
      age.value = '42';

      const result = val.validateForm(form);
      expect(result.isValid).toBeTruthy();
      expect(result.errors.length).toEqual(0);
    });
  });
});
