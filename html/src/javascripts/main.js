import 'common';
import ScreenController from 'components/screen';
import Switch from 'components/switch';
import CircularDiagram from 'components/diagram-circular';


$(() => {

    const $container  = $('.js-main');
    const $navigation = $('.js-navigation');

    const screens = new ScreenController($container);
    const navigation = new Switch($navigation);

    screens.on('change', function (e) {
        navigation.val(e.value);
    });

    navigation.on('change', function (e) {
        screens.val(e.value).fail(() => {
            // Couldn't change screen
            e.preventDefault();
        });
    });

    // "Needs" button group
    const $diagramSwitch = $('.js-button-group');
    const $diagram       = $('.js-circular-diagram');

    $diagramSwitch
        .switch({
            'itemSelector': '.btn',
            'activeClassName': 'btn-primary disabled',
            'inactiveClassName': 'btn-hollow'
        })
        .on('switchChange', (event) => {
            const values = $(event.target).data('values');
            $diagram.circularDiagram('values', values);
        });

    $diagram.circularDiagram();

});
