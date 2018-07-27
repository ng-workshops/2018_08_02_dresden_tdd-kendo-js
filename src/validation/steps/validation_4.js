define([], function() {
  var validation = (function() {
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

      const inputs = Array.from(form.querySelectorAll('input'));

      for (let validation of createValidationQueries(form.querySelectorAll('input'))) {
        if (validation.type === 'alphabetical') {
          let isValid = /^[a-z]+$/i.test(validation.value);

          if (!isValid) {
            result.errors.push(new Error(`${validation.value} is not a valid ${validation.name} value`));
          }
        } else if (validation.type === 'numeric') {
          let isValid = /^[0-9]+$/.test(validation.value);

          if (!isValid) {
            result.errors.push(new Error(`${validation.value} is not a valid ${validation.name} value`));
          }
        }
      }

      return result;
    }

    return {
      validateForm,
      createValidationQueries
    };
  })();

  return validation;
});
