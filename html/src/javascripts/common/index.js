import $ from 'jquery';
import 'jquery.finger';

import easings from '../lib/easings';
import support from '../lib/support';

import '../lib/jquery.transitionend';

import 'modules/sitemap';


// Expose jQuery
window.$ = window.jQuery = $;

// Attach easings
$.extend($.easing, easings);

// Default animation durations
$.durationFast =   200;
$.durationNormal = 400;
$.durationSlow =   600;

// Default animation names
$.easeIn = 'easeInExpo';
$.easeOut = 'easeOutExpo';
$.easeInOut = 'easeInOutExpo';


// JS support classname for CSS
$('html').removeClass('no-js').addClass('js');

// Touch support classname for CSS
if (support.getTouchSupport()) {
    $('html').removeClass('has-hover').addClass('no-hover');
}
