require(['jquery', 'jszip', 'kendo.all.min', './form.model'], function($, JSZip, kendo, viewModel) {
  // apply the bindings
  kendo.bind(document.body.children, viewModel.init());
});
