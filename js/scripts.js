$(function () {
    initPlayers();
    initTabsBlock();
    initPhoneFunc();
    initCallForwarding();

    $('.dropdown-toggle').on('click', dropdown);
    $('.header_btn-user-status').on('click', function () {
        $(this).toggleClass('offline');
    });
    $('#routing-date').on('change', selectRoutingPeriod);
    $(document).on('click', 'a[href*=#]', anchorLinksHandler);
    $(document).on('click', '.b-unrolling_toggle', unrollingBlock);
    $('.b-filters_switcher').on('click', function () {
        $(this).parent().toggleClass('short');
    });

    $('.call-forwarding-period_period-select').on('change', selectCallForwardingPeriod);
    $('.call-forwarding-time_checkbox').on('change', callForwardingTime);
    $('.call-forwarding_btns-item .close-btn').on('click', showDeleteBlockCallForwarding);
    $('.call-forwarding-scenario_radio').on('change', callForwardingScenarioSelect);
    $('.call-forwarding_switcher-label').on('click', callForwardingEnableSwitch);
    $('.call-forwarding_btns-item').on('click', callForwardingSwitch);

    $('.select').styler();
    $('.date').pickmeup({flat: true, mode: 'range', calendars: 2});
    $('.add-new-person').on('submit', checkPersonData);
    //$('.phone-mask').mask('7-999-999-99-99');
});

function callForwardingSwitch() {
    var obj = $(this);
    var cell = obj.closest('td');
    var parent = obj.closest('.dd-call-forwarding_main');
    var items = parent.find('.call-forwarding_blocks-item');

    cell
        .addClass('current')
        .siblings()
        .removeClass('current');

    items
        .removeClass('current')
        .eq(cell.index())
        .addClass('current');
}

function callForwardingEnableSwitch() {
    var obj = $(this);
    var parent = obj.closest('.dd-call-forwarding_main');
    var item = obj.closest('.call-forwarding_blocks-item');
    var block = obj.closest('.call-forwarding_inner');
    var buttons = parent.find('.call-forwarding_btns-item');

    block.toggleClass('disabled');
    buttons.eq(item.index()).toggleClass('disabled');
}

function callForwardingScenarioSelect() {
    var obj = $(this);
    var parent = obj.closest('.call-forwarding-scenario');
    var blocks = parent.find('.call-forwarding-scenario_scheme');

    blocks
        .removeClass('selected')
        .eq(obj.val())
        .addClass('selected');
}

function showDeleteBlockCallForwarding() {
    var obj = $(this);
    var parent = obj.closest('.dd-call-forwarding_main');
    var deleteBlock = parent.find('.call-forwarding_delete-block');
    var closeButtons = deleteBlock.find('.button');

    deleteBlock.show();
    closeButtons.bind('click', function () {
        deleteBlock.hide();
    });
}

function callForwardingTime() {
    var obj = $(this);
    var parent = obj.closest('.call-forwarding-time');
    var block = parent.find('.call-forwarding-time_block');

    obj.prop('checked') ? block.addClass('disabled') : block.removeClass('disabled');
}

function selectCallForwardingPeriod() {
    var obj = $(this);
    var parent = obj.closest('.call-forwarding-period');
    var periods = parent.find('.call-forwarding-period_period-selected');

    periods
        .removeClass('selected')
        .eq(obj.val())
        .addClass('selected');
}

function initCallForwarding() {
    $('.dd-call-forwarding').each(function (i) {
        var obj = $(this);
        var mainBlock = obj.find('.dd-call-forwarding_main');
        var firstExpirienceBlock = obj.find('.dd-call-forwarding_fe');

        obj.find('.enable-call-forwarding').bind('click', function () {
            obj.addClass('enabled');
        });
    });
}

function checkPersonData() {
    var template = $.templates("#personAdded");
    var htmlOutput = template.render({});
    $(this).parent().replaceWith(htmlOutput);

    return false;
}

function selectRoutingPeriod() {
    var self = $(this);
    var parent = self.closest('.routing-date');
    var variables = parent.find('.routing-date_variables > div');

    variables
        .addClass('hidden')
        .eq(self.val() - 1)
        .removeClass('hidden');
}

function unrollingBlock() {
    var toggle = $(this);
    var block = toggle.closest('.b-unrolling');
    var wrapper = toggle.parent();
    var hiddenBlock = block.children('.b-unrolling_inner');
    var unrollHeight = wrapper.outerHeight() + hiddenBlock.outerHeight();

    if (block.hasClass('active')) {
        hiddenBlock.css('z-index', 1);
        block.removeClass('active').css({overflow: 'hidden', 'min-height': 0});
    } else {
        $('.b-unrolling').removeClass('active').css('min-height', 0);
        block.addClass('active').css('min-height', unrollHeight);
        setTimeout(function () {
            block.addClass('active').css('overflow', 'visible');
            hiddenBlock.css('z-index', 2);
        }, 200);
    }
}

function initPhoneFunc() {
    $('.phone-func-place').each(function (i) {
        var block = $(this);
        var phone = block.data('phone');
        var name = block.data('name');
        var missed = block.data('missed') ? block.data('missed') : false;

        template = $.templates("#phoneFunc");
        htmlOutput = template.render({id: i, phone: phone, name: name, missed: missed});
        block.replaceWith(htmlOutput);
    });
}

function initTabsBlock() {
    $('.b-tabs').each(function () {
        var block = $(this);
        var buttons = block.find('.b-tabs_btns').children();
        var tabs = block.find('.b-tabs_item');

        buttons.bind('click', function () {
            changeTab(buttons, tabs, $(this).index());
        });

        changeTab(buttons, tabs, 0);
    });

    function changeTab(buttons, tabs, index) {
        buttons
            .removeClass('button active')
            .addClass('link')
            .eq(index)
            .removeClass('link')
            .addClass('button active');

        tabs
            .removeClass('current')
            .eq(index)
            .addClass('current');
    }
}

function initPlayers() {
    $('.jp-player').each(function (i) {
        var player = $(this);
        var file = '';
        var template = '';
        var htmlOutput = '';

        if (!player.next('.jp-audio').length) {
            file = player.data('file');
            template = $.templates("#audioPlayer");
            htmlOutput = template.render({id: i});
            player.after(htmlOutput);
        }

        player.jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {mp3: file});
            },
            play: function () {
                $(this).jPlayer('pauseOthers');
            },
            cssSelectorAncestor: '#jp_container_' + i
        });
    });
}


function anchorLinksHandler(e) {
    if (anchor == '#') return false;
    e.preventDefault();

    var anchor = $(this).attr('href');

    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top
    }, 1000);
}

function dropdown() {
    var toggle = $(this);
    var wrapper = toggle.parent();
    var container = toggle.siblings('.dropdown-container');
    var block = container.children();
    var blockH = block.outerHeight();

    var pageSize = {
        width: $('.main-wrapper').innerWidth(),
        height: $('.main-wrapper').innerHeight()
    }

    var left = wrapper.offset().left - $('.main-wrapper').offset().left + wrapper.outerWidth() / 2;
    var right = pageSize.width - left
    var containerHalfWidth = container.outerWidth() / 2;

    if (!container.hasClass('proc')) {
        $(document).bind('click', function (e) {
            if (!$(e.target).closest('.dropdown').length) {
                wrapper.removeClass('active');
                container.removeClass('open');
            }
        });
    }

    container.removeClass('dropdown-container__right dropdown-container__left');

    if (left < containerHalfWidth) {
        container.addClass('dropdown-container__left');
    } else if (right < containerHalfWidth) {
        container.addClass('dropdown-container__right');
    }

    if (container.offset().top + blockH > pageSize.height) {
        if (container.offset().top - blockH > 0) {
            container.addClass('on-top');
            block.css({top: -blockH});
        } else {
            $('.footer').css('margin-top', container.offset().top + blockH - pageSize.height + 40);
        }
    }

    if (container.hasClass('open')) {
        wrapper.removeClass('active');
        container.removeClass('open');
    } else {
        if (toggle.parents('.dropdown').length == 1) {
            $('.dropdown-container.open').removeClass('open');
            $('.dropdown.active').removeClass('active');
        }
        wrapper.toggleClass('active');
        container.addClass('proc').toggleClass('open');
    }
}
//table attention
function tableAttention() {
    var $checkBtn = $('.js-table-norm'),
        $checkBtnInput = $checkBtn.find('input'),
        $checkTarget = $('.js-attention');
    $checkBtn.on('change', function () {

        if ($checkBtnInput.prop('checked') == true) {
            $checkTarget.addClass('attention');
        } else if ($checkBtnInput.prop('checked') == false && $checkBtn.mouseenter()) {
            $checkTarget.addClass('attention');
        }
    });

    $checkBtn.on({
        mouseenter: function () {
            if ($checkBtnInput.prop('checked') == false) {
                $checkTarget.addClass('attention');
            }
        },
        mouseleave: function () {
            if ($checkBtnInput.prop('checked') == false) {
                $checkTarget.removeClass('attention');
            }
        }
    });
}


// table row
function tableRow() {
    var $trGroup = $('.js-tr-group');
    $trGroup.on('click', function () {
        var $this = $(this),
            currentData = $this.data('tr');
        $(".js-tr[data-tr = " + currentData + "]").fadeToggle(0);
    });
}

$(document).ready(function(){
    tableAttention();
    tableRow();

    $('.js-attention').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        delay: 50,
        content: '<div class="js-tooltip table-tooltip"><div class="js-tooltip-text table-tooltip__text">Норма не более 1/1</div></div>',
        functionPosition: function(instance, helper, position){
            position.coord.top += 20;
            return position;
        }
        //Функция для передачи данных при помощи data
        //functionReady: function (instance) {
        //    var dataTitle = $(instance.elementOrigin()).data('tooltip');
        //    console.log(dataTitle);
        //    $(instance.elementTooltip()).find('.js-tooltip-text').text(dataTitle);
        //}
    });
    $('.js-phone').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        delay: 50,
        content: '<div class="js-tooltip table-tooltip table-tooltip_phone"><div class="js-tooltip-text table-tooltip__text">Позвонить</div></div>'
    });
    $('.js-agent-status').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        delay: 50,
        content: '<div class="js-tooltip table-tooltip table-tooltip_queue"><div class="js-tooltip-text table-tooltip__text">Вывести из очереди</div></div>',
        functionPosition: function(instance, helper, position){
            position.coord.top += 20;
            return position;
        }
    });

    $('.js-phone-owner').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        interactive: true,
        arrow: false,
        delay: 50,
        trigger: 'click',
        side: 'right',
        content: '<div class="js-tooltip table-tooltip table-tooltip_owner"><div class="table-tooltip__content"><input class="table-tooltip-input" type="text" placeholder="Имя абонента"><button class="table-tooltip-btn">Сохранить</button><button class="js-tooltip-close table-tooltip-close"></button></div><div class="js-tooltip-triangle table-tooltip__triangle"></div></div>',
        functionReady: function () {
            $('.js-tooltip-close').on('click', function () {
                $('.js-phone-owner').tooltipster('close');
            });
        },
        functionPosition: function(instance, helper, position){
            position.coord.top -= 10;
            return position;
        }
    });
    $('.js-phone-free').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        delay: 50,
        content: '<div class="js-tooltip table-tooltip table-tooltip_phone"><div class="js-tooltip-text table-tooltip__text">Позвонить агенту</div></div>'
    });

    $('.js-dropdown-phone').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        content: '<ul class="table-dropdown-menu table-dropdown-menu_phone">'+
        '<li class="table-dropdown-menu__item">' +
        '<a href="" target="_blank" class="table-link table-link_phone">' +
        '<span class="table-link__text">Конференция</span>' +
        '<span class="table-link__description">Слышат все</span>'+
        '</a>'+
        '</li>'+
        '<li class="table-dropdown-menu__item">'+
        '<a href="" target="_blank" class="table-link table-link_phone">'+
        '<span class="table-link__text">Суфлер</span>'+
        '<span class="table-link__description">Слышит только сотрудник</span></a></li>'+
        '<li class="table-dropdown-menu__item">'+
        '<a href="" target="_blank" class="table-link table-link_phone">' +
        '<span class="table-link__text">Пассивно</span>' +
        '<span class="table-link__description">Не слышит никто</span>' +
        '</a></li></ul>',
        functionPosition: function(instance, helper, position){
            position.coord.left += 90;
            position.coord.top -= 10;
            return position;
        },
        functionReady: function (instance) {
            $(instance.elementOrigin()).addClass('open');
        },
        functionAfter: function (instance) {
            $(instance.elementOrigin()).removeClass('open');
        }
    });
    $('.js-dropdown-download').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        content: '<ul class="table-dropdown-menu">'+
        '<li class="table-dropdown-menu__item">' +
        '<a href="" target="_blank" class="table-link">' +
        '<span class="table-link__text">csv</span>' +
        '</a>'+
        '</li>'+
        '<li class="table-dropdown-menu__item">'+
        '<a href="" target="_blank" class="table-link">'+
        '<span class="table-link__text">xls</span>'+
        '</a>'+
        '</li>'+
        '<li class="table-dropdown-menu__separate"></li>'+
        '<li class="table-dropdown-menu__description">'+
        'Скачайте статистику в&nbsp;нужном формате'+
        '</li>'+
        '</ul>',
        functionPosition: function(instance, helper, position){
            position.coord.top -= 30;
            return position;
        }
    });
});
