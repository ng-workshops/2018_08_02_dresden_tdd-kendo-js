define([], function() {
  var validation = (function() {
    const validationRules = new Map([['alphabetical', /^[a-z]+$/i], ['numeric', /^[0-9]+$/]]);

    function validateItem(validation, validationRules) {
      if (!validationRules.has(validation.type)) {
        return false;
      }

      return validationRules.get(validation.type).test(validation.value);
    }

    function createValidationQueries(inputs) {
      return Array.from(inputs).map(input => ({
        name: input.name,
        type: input.dataset.validation,
        value: input.value
      }));
    }

    function validateForm(form) {
      const result = {
        get isValid() {
          return this.errors.length === 0;
        },

        errors: []
      };

      for (let validation of createValidationQueries(form.querySelectorAll('input'))) {
        let isValid = validateItem(validation, validationRules);

        if (!isValid) {
          result.errors.push(new Error(`${validation.value} is not a valid ${validation.name} value`));
        }
      }

      return result;
    }

    return {
      validateForm,
      createValidationQueries,
      validateItem,
      validationRules
    };
  })();

  return validation;
});
