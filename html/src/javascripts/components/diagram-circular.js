import $ from 'jquery';
import createPlugin from '../lib/jquery.plugin';


export default class CircularDiagram {

    constructor (el, opts) {
        const options = $.extend({
            'labelSelector': 'label small',
            'lineSelector': '.line-front'
        }, opts);

        const $container = $(el);
        const $labels    = $container.find(options.labelSelector);
        const $lines     = $container.find(options.lineSelector);

        this.$container = $container;
        this.$labels = $labels;
        this.$lines = $lines;
    }

    values (values) {
        const $labels = this.$labels;
        const $lines = this.$lines;

        // Animate label texts
        $labels.each((index, label) => {
            const $label = $(label);

            $label

            $label
                .css({
                    'x': parseInt($label.text())
                })
                .animate({
                    'x': values[index] * 100
                }, {
                    duration: $.durationNormal,
                    step: (value) => {
                        $label.text(Math.round(value) + '%');
                    }
                });
        });

        // Animate lines, using CSS transitions
        $lines.each((index, line) => {
            $(line).css('strokeDashoffset', this.getDashArray(index) * (1 - values[index]) + 'px');
        });
    }

    /**
     * Returns stroke dasharray of the line
     *
     * @param {number} index Line index
     * @returns {number} Stroke dasharray
     */
    getDashArray (index) {
        const $lines = this.$lines;
        const $line  = $lines.eq(index);
        let value = $line.data('strokeDasharray');

        if (!value) {
            value = parseFloat($line.css('strokeDasharray'));
            $line.data('strokeDasharray', value);
        }

        return value;
    }

}


$.fn.circularDiagram = createPlugin(CircularDiagram);
