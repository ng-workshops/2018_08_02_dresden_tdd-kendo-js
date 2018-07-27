define(['../src/index.js', './validation/validation'], function(index, val) {
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

    it('STEP 2 should return an error when a name is invalid', function() {
      const name = form.querySelector('input[name="first-name"]');
      const age = form.querySelector('input[name="age"]');

      name.value = '!!!';
      age.value = '42';

      const result = val.validateForm(form);

      expect(result.isValid).toBeFalsy();
      expect(result.errors[0]).toBeDefined();
      expect(result.errors[0].message).toEqual('!!! is not a valid first-name value');
    });

    it('STEP 3 should return an error when an age is invalid', function() {
      const name = form.querySelector('input[name="first-name"]');
      const age = form.querySelector('input[name="age"]');

      name.value = 'Greg';
      age.value = 'a';

      const result = val.validateForm(form);

      expect(result.isValid).toBeFalsy();
      expect(result.errors[0]).toBeDefined();
      expect(result.errors[0].message).toEqual('a is not a valid age value');
    });

    it('STEP 3.1 should return multiple errors if more than one field is invalid', function() {
      const name = form.querySelector('input[name="first-name"]');
      const age = form.querySelector('input[name="age"]');

      name.value = '!!!';
      age.value = 'a';

      const result = val.validateForm(form);

      expect(result.isValid).toBeFalsy();
      expect(result.errors[0]).toBeDefined();
      expect(result.errors[0].message).toEqual('!!! is not a valid first-name value');
      expect(result.errors[1]).toBeDefined();
      expect(result.errors[1].message).toEqual('a is not a valid age value');
    });
  });

  describe('STEP 4 the createValidationQueries function', function() {
    let form;
    beforeEach(() => {
      form = generateForm();
    });

    it('should map input elements with a data-validation attribute to an array of validation objects', function() {
      const name = form.querySelector('input[name="first-name"]');
      const age = form.querySelector('input[name="age"]');

      name.value = 'Bob';
      age.value = '42';

      const validations = val.createValidationQueries([name, age]);

      expect(validations.length).toBe(2);

      expect(validations[0].name).toBe('first-name');
      expect(validations[0].type).toBe('alphabetical');
      expect(validations[0].value).toBe('Bob');

      expect(validations[1].name).toBe('age');
      expect(validations[1].type).toBe('numeric');
      expect(validations[1].value).toBe('42');
    });
  });

  describe('STEP 5 the validateItem function', function() {
    const validationRules = new Map([['alphabetical', /^[a-z]+$/i]]);

    it('should return true when the passed item is deemed valid against the supplied validation rules', function() {
      const validation = {
        type: 'alphabetical',
        value: 'Bob'
      };

      const isValid = val.validateItem(validation, validationRules);
      expect(isValid).toBeTruthy();
    });

    it('STEP 5.1 should return false when the passed item is deemed invalid', function() {
      const validation = {
        type: 'alphabetical',
        value: '42'
      };

      const isValid = val.validateItem(validation, validationRules);
      expect(isValid).toBeFalsy();
    });

    it('STEP 6 should return false when the specified validation type is not found', function() {
      const validation = {
        type: 'foo',
        value: '42'
      };

      const isValid = val.validateItem(validation, validationRules);
      expect(isValid).toBeFalsy();
    });
  });
});

