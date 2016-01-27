import $ from 'jquery';

const transitionEventName = ('WebkitTransition' in document.body.style ? 'webkitTransitionEnd' : 'transitionend');
const animationEventName  = ('WebkitAnimation'  in document.body.style ? 'webkitAnimationEnd'  : 'animationend');
var uniqueId = 0;

function getDuration (duration) {
    if (duration) {
        var value = parseFloat(duration);
        if (value) {
            if (duration.substr(-2) === 'ms') {
                return value;
            } else if (duration.substr(-1) === 's') {
                return value * 1000;
            }
        }
    }

    return 0;
}

/**
 * Returns promise, which is resolved when all elements have finishsed
 * their transitions / animations
 */
$.fn.transitionend = function () {
    return $.when.apply($, $.map(this, function (element) {
        const $element = $(element);
        const uid = ++uniqueId;
        const event = transitionEventName + '.ns' + uid + ' ' + animationEventName + '.ns' + uid;
        const deferred = $.Deferred();

        const duration = getDuration($element.css('transition-duration')) ||
                         getDuration($element.css('animation-duration')) ||
                         0;

        var timer = setTimeout(() => {
            deferred.resolve();
        }, duration + 16 /* 1 frame */);

        $element.on(event, function (e) {
            if ($element.is(e.target)) {
                clearTimeout(timer);
                $element.off(event);
                deferred.resolve();
            }
        });

        return deferred.promise();
    }));
};
