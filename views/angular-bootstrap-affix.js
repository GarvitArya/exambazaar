'use strict';
angular.module('mgcrea.bootstrap.affix', []).directive('bsAffix', [
  '$window',
  function ($window) {
    var checkPosition = function (instance, el, options) {
      var scrollTop = window.pageYOffset;
      var scrollHeight = document.body.scrollHeight;
      var position = getOffset(el[0]);
      var height = getHeight(el[0]);
      var offsetTop = options.offsetTop * 1;
      var offsetBottom = options.offsetBottom * 1;
      var reset = 'affix affix-top affix-bottom';
      var affix;
      if (instance.unpin !== null && scrollTop + instance.unpin <= position.top) {
        affix = false;
      } else if (offsetBottom && position.top + height >= scrollHeight - offsetBottom) {
        affix = 'bottom';
      } else if (offsetTop && scrollTop <= offsetTop) {
        affix = 'top';
      } else {
        affix = false;
      }
      if (instance.affixed === affix)
        return;
      instance.affixed = affix;
      instance.unpin = affix === 'bottom' ? position.top - scrollTop : null;
      el.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''));
    };
    var checkCallbacks = function (scope, instance, iElement, iAttrs) {
      if (instance.affixed) {
        if (iAttrs.onUnaffix)
          eval('scope.' + iAttrs.onUnaffix);
      } else {
        if (iAttrs.onAffix)
          eval('scope.' + iAttrs.onAffix);
      }
    };
    return {
      restrict: 'EAC',
      link: function postLink(scope, iElement, iAttrs) {
        var instance = { unpin: null };
        angular.element($window).bind('scroll', function () {
          checkPosition(instance, iElement, iAttrs);
          checkCallbacks(scope, instance, iElement, iAttrs);
        });
        angular.element($window).bind('click', function () {
          setTimeout(function () {
            checkPosition(instance, iElement, iAttrs);
            checkCallbacks(scope, instance, iElement, iAttrs);
          }, 1);
        });
      }
    };
  }
]);
function getOffset(el) {
  var box = el.getBoundingClientRect();
  var docElem = el.ownerDocument.documentElement;
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
}
;
function getHeight(el, outer) {
  var computedStyle = window.getComputedStyle(el);
  var value = el.offsetHeight;
  if (outer) {
    value += parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
  } else {
    value -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom) + parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth);
  }
  return value;
}
;