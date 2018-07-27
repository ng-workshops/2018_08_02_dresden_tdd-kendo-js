define([], function() {
  var validation = (function() {
    function validateForm(form) {
      const result = {
        errors: []
      };

      const inputs = Array.from(form.querySelectorAll('input'));
      let isValid = true;

      for (let input of inputs) {
        if (input.dataset.validation === 'alphabetical') {
          isValid = isValid && /^[a-z]+$/i.test(input.value);
        } else if (input.dataset.validation === 'numeric') {
          isValid = isValid && /^[0-9]+$/.test(input.value);
        }
      }

      result.isValid = isValid;
      return result;
    }

    return {
      validateForm
    };
  })();

  return validation;
});
