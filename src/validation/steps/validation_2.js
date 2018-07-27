define([], function() {
  var validation = (function() {
    function validateForm(form) {
      const result = {
        get isValid() {
          return this.errors.length === 0;
        },

        errors: []
      };

      const inputs = Array.from(form.querySelectorAll('input'));

      for (let input of inputs) {
        if (input.dataset.validation === 'alphabetical') {
          let isValid = /^[a-z]+$/i.test(input.value);

          if (!isValid) {
            result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`));
          }
        } else if (input.dataset.validation === 'numeric') {
          // TODO: we'll consume this in the next test
          let isValid = /^[0-9]+$/.test(input.value);
        }
      }

      return result;
    }

    return {
      validateForm
    };
  })();

  return validation;
});
