import $ from 'jquery';

import './../lib/jquery.transitionend';
import fixedContent from './fixed-content';
import debounce from '../lib/debounce';
import support from '../lib/support';


export default class Screen {

    constructor (el) {
        const $container = $(el);
        const $screens   = $container.find('.js-screen');
        const $next      = $container.find('.js-next');
        const $targets   = $container.find('.js-theme-target');
        const $doc       = $(document);

        this.$container = $container;
        this.$screens   = $screens;
        this.$next      = $next;
        this.$targets   = $targets;

        this.animating  = false;
        this.index      = 0;
        this.count      = $screens.length;
        this.theme      = this.getScreenTheme(this.index);

        // Prevent scrolling
        fixedContent();

        // Tapping on "Next" arrow open next screen
        $next.on('tap', this.next.bind(this));

        // Swipe / flick
        if (support.getTouchSupport()) {
            $screens.on('flick', this.handleFlick.bind(this));
        }

        // Using mousewheel open next / previous screens
        $doc.on('mousewheel DOMMouseScroll', debounce(this.handleMouseWheel.bind(this), 160, true));
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
     * Open next screen
     *
     * @returns {object} Promise, which is resolved when animation ends
     */
    next () {
        const count = this.count;
        const index = this.index + 1;

        if (index < count) {
            return this.open(index);
        }
    }

    /**
     * Open previous screen
     *
     * @returns {object} Promise, which is resolved when animation ends
     */
    previous () {
        const count = this.count;
        const index = this.index - 1;

        if (index >= 0) {
            return this.open(index, 'Top');
        }
    }

    /**
     * Transtion between screens
     *
     * @param {number} index Screen index, which will be opened
     * @param {string} direction Animation direction, either 'Top' or 'Bottom' (default)
     * @returns {object} Promise, which is resolved when animation ends
     */
    open (index, direction = 'Bottom') {
        const oldIndex = this.index;

        if (index !== oldIndex) {
            if (!this.animating) {
                this.animating = true;

                // Save value
                this.index = index;

                // Update UI
                this.updateNavNext(index);
                this.updateNavSecondary(index);
                this.updateThemeTargets(index);

                // Trigger event
                var evt = new jQuery.Event('switchChange', {'value': index, 'prevValue': oldIndex});
                this.$container.triggerHandler(evt);

                return $.when(
                    this.transitionScreenOut(oldIndex),
                    this.transitionScreenIn(index, direction)
                ).then(() => {
                    this.animating = false;
                });
            } else {
                // Animating, can't do anything
                return $.Deferred().reject().promise();
            }
        } else {
            // Nothing changed
            return $.Deferred().resolve().promise();
        }
    }

    /**
     * Alias of open
     */
    val (index, direction = 'Bottom') {
        return this.open(index, direction);
    }

    /**
     * Handle flick gesture
     * Depending on direction open next or previous screen
     *
     * @param {object} e Event
     * @protected
     */
    handleFlick (e) {
        if (e.orientation === 'vertical') {
            if (e.direction === 1) {
                this.previous();
            } else {
                this.next();
            }
        }
    }

    /**
     * On mouse wheel scroll up or down
     *
     * @param {object} e Event
     * @protected
     */
    handleMouseWheel (e) {
        console.log(e);
        var delta = e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail;

        if (delta < 0) {
            this.next();
        } else {
            this.previous();
        }
    }

    /**
     * Returns screen theme
     *
     * @param {number} index Screen index
     * @returns {boolean} True if screen is inversed, otherwise false
     */
    getScreenTheme (index) {
        return this.$screens.eq(index).data('screenTheme');
    }

    /**
     * Show or hiden navigation "Next" element
     *
     * @param {number} index Screen index
     * @protected
     */
    updateNavNext (index) {
        const $next = this.$next;

        if (index >= this.count - 1) {
            $next.addClass('hidden');
        } else {
            $next.removeClass('hidden');
        }
    }

    /**
     * Update secondary navigation
     *
     * @param {number} index Screen index
     * @protected
     */
    updateNavSecondary (index) {

    }


    /**
     * Update secondary navigation
     *
     * @param {number} index Screen index
     * @protected
     */
    updateThemeTargets (index) {
        const theme = this.getScreenTheme(index);

        this.setTheme(theme);
    }

    setTheme (theme) {
        const prevTheme = this.theme;
        const $targets  = this.$targets;

        if (theme !== prevTheme) {
            this.theme = theme;

            $targets
                .removeClass('theme-' + prevTheme)
                .addClass('theme-' + theme);
        }
    }

    /**
     * Transition screen out of view
     *
     * Because we are using animations we disable all children transitions
     * to prevent children animations running after main content has finished
     * hiding in Chrome
     *
     * @param {number} index Screen index
     * @returns {object} Promise, which is resolved when animation ends
     * @protected
     */
    transitionScreenOut (index) {
        const screen    = this.$screens.eq(index);
        const className = 'screen-transition-scaleDown';
        const transitionClassName = 'disable-transitions';

        return screen
            .addClass(`${className} ${transitionClassName}`)
            .transitionend().then(() => {
                screen.removeClass(`screen-active ${className}`);
            });
    }

    /**
     * Transition screen into view
     *
     * @param {number} index Screen index
     * @param {string} direction Animation direction, either 'Top' or 'Bottom' (default)
     * @returns {object} Promise, which is resolved when animation ends
     * @protected
     */
    transitionScreenIn (index, direction = 'Bottom') {
        const screen    = this.$screens.eq(index);
        const className = `screen-on-top screen-transition-moveFrom${direction}`;
        const transitionClassName = 'disable-transitions';

        return screen
            .addClass(`screen-active ${className}`)
            .transitionend().then(() => {
                screen.removeClass(`${className} ${transitionClassName}`);
            });
    }

}
