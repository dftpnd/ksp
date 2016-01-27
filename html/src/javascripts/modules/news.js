"use strict";
import $ from 'jquery';
import './../lib/jquery.transitionend';

class News {
    constructor () {
        this.modal = $('.news-modal');
    }

    getNewsUrl () {
        return window.location.hash.substring(1);
    }

    addViewModal (view) {
        return this.modal.append(view);
    }

    wrapView (view) {
        return $(view).wrap("<div class='modal-news-content'></div>").parent();
    }

    hideModal () {
        location.hash = '';
        this.modal.removeClass('active');
    }

    showModal () {
        return this.modal.addClass('active');
    }

    setAnchorUrl (newUrl) {
        location.hash = newUrl;
    }

    get (newsUrl) {
        return $.ajax({
            url: '/news-item.html',
            type: 'GET',
            dataType: 'html',
            data: {
                "url": newsUrl
            }
        });
    }
}

class NewsPage extends News {
    constructor () {
        super();

        this.modalView = null;

        $(window).bind('hashchange', this.update.bind(this));

        this.create();
    }

    update () {
        var url = this.getNewsUrl();

        if (!url) this.hideModal();

        this.create(url);
    }

    create (newsUrl) {
        var url = newsUrl || this.getNewsUrl();

        if (!url) return;

        this.get(url).done(this.openModal.bind(this));
    }

    openModal (view) {
        new NewsModal(view);
    }


}
class NewsModal extends News {
    constructor (view) {
        super();


        this.modalView = this.wrapView(view);
        this.addViewModal(this.modalView);
        this.showModal();

        this.modalNext = $('#modal-news-next');
        this.modalPrev = $('#modal-news-prev');
        this.modalClose = $('#modal-news-close');


        this.animationOld = '';
        this.animationNew = '';
        this.isAnimated = false;
        this.addListeners();
    }

    prev () {
        var url = this.getNewsUrl();
        this.animationOld = 'slide-right';
        this.animationNew = 'slide-in-left';
        this.get(url, 'prev').done(this.changeView.bind(this));
    }

    next () {
        var url = this.getNewsUrl();
        this.animationOld = 'slide-left';
        this.animationNew = 'slide-in-right';
        this.get(url, 'prev').done(this.changeView.bind(this));
    }

    close () {
        this.hideModal();
        this.modalView.remove();
        this.removeListeners();
    }

    addListeners () {
        this.modalPrev.on('tap', this.prev.bind(this));
        this.modalNext.on('tap', this.next.bind(this));
        this.modalClose.on('tap', this.close.bind(this));
    }

    removeListeners () {
        this.modalPrev.unbind('tap');
        this.modalNext.unbind('tap');
        this.modalClose.unbind('tap');
    }

    changeView (view) {
        if (this.isAnimated) return;

        this.isAnimated = true;

        var newView = this.wrapView(view);
        this.addViewModal(newView);

        var oldView = this.modalView;

        oldView.addClass(this.animationOld).transitionend().done(() => {
            oldView.remove();
            this.isAnimated = false;
        });

        newView.addClass(this.animationNew).transitionend().done(() => {
            newView.removeClass(this.animationNew);
            this.isAnimated = false;
        });


        this.modalView = newView;
        this.setAnchorUrl(this.modalView.find('[name="newsUrl"]').val());
    }


}


$(() => {

    new NewsPage();

});

