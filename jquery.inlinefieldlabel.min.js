/*
 * jQuery Inline Field Label Plugin v1.0
 *
 * Copyright 2012 Elias Dawson
 * Licensed under the MIT license
 *
 */

(function(a){a.fn.inlineLabel=function(c){var b={cssClass:"inlineFieldLabelValue"};if(c){a.extend(b,c)}this.each(function(){var e,d=a(this),f=a(document.getElementById(d.attr("for")));if(f.length){d.hide();if(f.is("textarea")||f.attr("type")==="text"){f.val(d.text()).addClass(b.cssClass);f.focus(function(){if(f.val()===d.text()){f.val("").removeClass(b.cssClass)}}).blur(function(){if(f.val()===""){f.val(d.text()).addClass(b.cssClass)}})}else{if(f.attr("type")==="password"){e=a("<input>").attr("type","text").addClass(f.attr("class"));e.val(d.text()).addClass(b.cssClass);f.hide();e.insertBefore(f);e.focus(function(){e.hide();f.show().focus()});f.blur(function(){if(f.val()===""){e.show();f.hide()}})}}}});return this}}(jQuery));