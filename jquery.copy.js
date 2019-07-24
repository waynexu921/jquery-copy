/*!
 * jQuery Copy Plugin v1.1.1
 * https://github.com/by-syk/jquery-copy
 *
 * Copyright 2017 By_syk
 */

(function($) {
  $.extend({
    copy: function(obj) {
      return copyText(obj);
    }
  });
} (jQuery));

function copyText(obj) {
  if (!obj) {
    return false;
  }
  var text;
  if (typeof(obj) == 'object') {
    if (obj.nodeType) { // DOM node
      obj = $(obj); // to jQuery object
    }
    if (obj instanceof $) {
      if (!obj.length) { // nonexistent
        return false;
      }
      text = obj.text();
      if (!text) { // Maybe <textarea />
        text = obj.val();
      }
    } else { // as JSON
      text = JSON.stringify(obj);
    }
  } else { // boolean, number, string
    text = obj;
  }
  //var $temp = $('<input>'); // Line feed is not supported
  var $temp = $('<textarea>');
  $('body').append($temp);
  $temp.val(text)
  select($temp);//ios
  var res = document.execCommand('copy');
  $temp.remove();
  return res;
}
function select(element) {
    var selectedText;
    element=element.get(0);
    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }
        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}
