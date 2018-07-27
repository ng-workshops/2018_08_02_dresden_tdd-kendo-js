require(['jquery', 'jszip', 'kendo.all.min', './validation/validation'], function($, JSZip, kendo, val) {
  window.JSZip = JSZip;
  $('#grid').kendoGrid({
    toolbar: ['excel'],
    dataSource: {
      data: [{ name: 'Jane Doe 123131' }, { name: 'John Doe' }]
    }
  });
});
