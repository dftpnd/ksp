import $ from 'jquery';


class Sitemap {

    constructor () {
        this.$main    = $('.js-main');
        this.$sitemap = $('.js-sitemap');
        this.visible = false;

        // Delegate
        $(document).on('tap keypress', '.js-sitemap-toggle', this.toggle.bind(this));
    }

    toggle () {
        const $main = this.$main;
        const $sitemap = this.$sitemap;
        const visible = !this.visible;

        if (visible) {
            const height = $main.height();
            const position = height - 100;

            $sitemap
                .removeClass('hidden');

            $main
                .addClass('move in')
                .css('transform', 'translate3d(0, ' + position + 'px, 0) scale(0.9444)');
        } else {
            $main
                .removeClass('in')
                .css('transform', '')
                .transitionend().done(this.transitionOutComplete.bind(this));
        }

        this.visible = visible;
    }

    transitionOutComplete () {
        this.$main.removeClass('move in');
        this.$sitemap.addClass('hidden');
    }

}

$(() => {

    new Sitemap();

});
