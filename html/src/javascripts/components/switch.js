import $ from 'jquery';
import createPlugin from '../lib/jquery.plugin';


export default class Switch {

    constructor (el, opts) {
        const options = $.extend({
            'itemSelector': 'a',
            'activeClassName': 'active',
            'inactiveClassName': ''
        }, opts);

        const $container = $(el);
        const $items     = $container.find(options.itemSelector);
        const $input     = $container.find('input').not('[type="button"], [type="submit"]');

        this.$container = $container;
        this.$items = $items;
        this.$input = $input;
        this.index = 0;
        this.options = options;

        $items.on('tap', this.handleItemClick.bind(this));
    }

    /**
     * Add change event listener
     *
     * @param {function} callback Callback function
     */
    on (eventName, callback) {
        const name = eventName === 'change' ? 'switchChange' : eventName;
        this.$container.on(name, callback);
    }

    /**
     * Value setter / getter
     *
     * @param {number?} index Selected item index
     * @returns {number} Selected item index
     */
    val (index) {
        const prevIndex = this.index;

        if (index != null && prevIndex !== index) {
            this.uiSetIndex(prevIndex, index);

            // Get item data
            const $item = this.$items.eq(index);

            // Trigger event
            var evt = new jQuery.Event('switchChange', {'value': index, 'prevValue': prevIndex, 'target': $item});
            this.$container.triggerHandler(evt);

            // Revert if default was prevented
            if (evt.isDefaultPrevented()) {
                this.uiSetIndex(index, prevIndex);
            }
        }

        // Getter
        return this.index;
    }

    handleItemClick (e) {
        const $target = $(e.target);
        const index = this.$items.index($target);

        if (index !== -1) {
            this.val(index);
        }

        e.preventDefault();
    }

    /**
     * Returns item data
     *
     * @param {number} index Item index
     * @returns {object} Item data
     */
    getItemData (index) {
        const $items = this.$items;

        return $items.eq(index).data();
    }

    /**
     * Update UI to reflex the change
     *
     * @param {number} prevIndex Previous index
     * @param {number} index New index
     */
    uiSetIndex (prevIndex, index) {
        const $items = this.$items;
        const $input = this.$input;
        const options = this.options;

        // Save value
        this.index = index;

        // Set value on input if there is one
        if ($input.length) {
            $input.val(index).change();
        }

        // Update UI
        if (options.activeClassName) {
            $items.eq(prevIndex).removeClass(options.activeClassName);
            $items.eq(index).addClass(options.activeClassName);
        }

        if (options.inactiveClassName) {
            $items.eq(index).removeClass(options.inactiveClassName);
            $items.eq(prevIndex).addClass(options.inactiveClassName);
        }
    }

}


$.fn.switch = createPlugin(Switch);
