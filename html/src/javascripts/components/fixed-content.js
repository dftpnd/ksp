import responsive from './../lib/responsive';
import debounce from './../lib/debounce';


function onScrollChange () {
    if (responsive.matches('(width: 568px) and (height: 320px)')) { // iPhone5 landscape
        $(window).scrollTop(43);
    } else {
        $(window).scrollTop(0);
    }
}

function init () {
    const onScrollChangeDebounced = debounce(onScrollChange, 16);

    $(window).on('resize', onScrollChangeDebounced);

    onScrollChangeDebounced();
    onScrollChange();

    // Disable scrolling using touch
    $('html, body').on('touchmove', e => e.preventDefault());
}

export default init;
