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
    var $mainTable = $('.js-table-monitoring[data-table=monitoring-main]'),
        $trGroup = $mainTable.find('.js-tr-group');
    $trGroup.on('click', function () {
        var $this = $(this),
            currentData = $this.data('tr');
        $mainTable.find(".js-tr[data-tr = " + currentData + "]").fadeToggle(0);
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
        animationDuration: 200,
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
        animationDuration: 200,
        content: '<div class="js-tooltip table-tooltip table-tooltip_phone"><div class="js-tooltip-text table-tooltip__text">Позвонить</div></div>'
    });
    $('.js-agent-status').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        delay: 50,
        animationDuration: 200,
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
        animationDuration: 200,
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
        animationDuration: 200,
        content: '<div class="js-tooltip table-tooltip table-tooltip_phone"><div class="js-tooltip-text table-tooltip__text">Подключться&nbsp;к&nbsp;разговору</div></div>'
    });

    $('.js-dropdown-phone').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        animationDuration: 200,
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
        animationDuration: 200,
        content: $(".js-tooltip-content[data-tooltip-content='dropdown-download']").html(),
        functionPosition: function(instance, helper, position){
            position.coord.top -= 30;
            return position;
        }
    });


    $('.js-offers-btn').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'top',
        trigger: 'click',
        delay: 200,
        animationDuration: 200,
        content: $(".js-tooltip-content[data-tooltip-content='offers-btn']").html(),
        functionReady: function (instance) {
            var $formOffer = $(instance.elementTooltip()).find('.js-form-offer'),
                $formOfferSuccess =$(instance.elementTooltip()).find('.js-form-offer-success');
            $('.js-form-offer-submit').on('click', function (e) {
                e.preventDefault();
                $formOfferSuccess.css('height',$formOffer.outerHeight());
                $formOffer.css('visibility','hidden');
                $formOfferSuccess.show();
            });
            $('.js-form-offer-close').on('click', function (e) {
                e.preventDefault();
                $(instance.elementOrigin()).tooltipster('close');
            })
        }
    });
    $('.js-btn-stat-other').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        animationDuration: 200,
        content: $(".js-tooltip-content[data-tooltip-content='stat-other']").html(),
        functionPosition: function(instance, helper, position){
            position.coord.top -= 30;
            position.coord.left -= -56;

            return position;
        },
        functionReady: function (instance) {
            //
        }
    });
    $('.js-btn-stat-phones').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        animationDuration: 200,
        content: $(".js-tooltip-content[data-tooltip-content='stat-phones']").html(),
        functionPosition: function(instance, helper, position){
            position.coord.top -= 30;
            position.coord.left -= -14;

            return position;
        },
        functionReady: function (instance) {
            //
        }
    });
    $('.js-link-opt-count').tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        animationDuration: 200,
        content: $(".js-tooltip-content[data-tooltip-content='opt-count']").html(),
        functionReady: function (instance) {
            //
        }
    });

    //charts
    var $btnStat = $('.js-btn-stat'),
        $btnStatSale = $('.js-btn-stat-sale'),
        $btnStatCorporate = $('.js-btn-stat-corporate'),
        $btnStatGaranty = $('.js-btn-stat-garanty');
    google.charts.load('current', {'packages':['corechart','gauge','line'],'language': 'ru' });
    google.charts.setOnLoadCallback(drawChartStatCalls);
    google.charts.setOnLoadCallback(drawChartStatInCalls);
    google.charts.setOnLoadCallback(drawChartStatOutCalls);
    google.charts.setOnLoadCallback(drawChartStatWaitGauge);

    //График принятых/непринятых звонков
    function drawChartStatCalls() {
        var dataSale = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Непринятые',     30],
            ['Принятые',      70]
        ]);

        var options = {
            width: '165',
            height: '165',
            chartArea:{left:0,top:0,width:'100%',height:'100%'},
            pieHole: 0.5,
            legend: {position:'none'},
            colors:['#df4d41','#0abc6e'],
            tooltip: {
                ignoreBounds: true
            },
            fontSize: 12
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechartStatCalls'));

        chart.draw(dataSale, options);
        $btnStatSale.on('click', function () {
            $btnStat.removeClass('active');
            $(this).addClass('active');
            chart.draw(dataSale, options);
        });
    }

    //График принятых звонков
    function drawChartStatInCalls() {

        var dataSale = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Переведено',     20],
            ['Отключился агент',      45],
            ['Отключился звонящий',      35]
        ]);


        var options = {
            colors:['#bbc3d1','#68cda1','#0abc6f'],
            width: '165',
            height: '165',
            chartArea:{left:0,top:0,width:'100%',height:'100%'},
            pieHole: 0.5,
            legend: {position:'none'},
            tooltip: {ignoreBounds: true},
            fontSize: 12
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechartStatInCalls'));

        chart.draw(dataSale, options);
        $btnStatSale.on('click', function () {
            $btnStat.removeClass('active');
            $(this).addClass('active');
            chart.draw(dataSale, options);
        });
    }

    //График непринятых звонков
    function drawChartStatOutCalls() {

        var dataSale = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Покинули по таймингу',     45],
            ['Переведено',      20],
            ['Отказ звонящего',      35]
        ]);


        var options = {
            width: '165',
            height: '165',
            chartArea:{left:0,top:0,width:'100%',height:'100%'},
            pieHole: 0.5,
            legend: {position:'none'},
            tooltip: {ignoreBounds: true},
            fontSize: 12,
            colors:['#ea8e86','#b6bfcd','#df4d41']
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechartStatOutCalls'));

        chart.draw(dataSale, options);
        $btnStatSale.on('click', function () {
            $btnStat.removeClass('active');
            $(this).addClass('active');
            chart.draw(dataSale, options);
        });
    }

    //График среднее время ожидания в очереди спидометр
    function drawChartStatWaitGauge() {

        var dataSale = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['секунды', 60]
        ]);
        var dataCorporate = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['секунды', 40]
        ]);
        var dataGaranty = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['секунды', 30]
        ]);

        var options = {
            redFrom: 60, redTo: 80,
            minorTicks: 5,
            min: 0,
            max: 80
        };

        var chart = new google.visualization.Gauge(document.getElementById('gaugechartStat'));
        chart.draw(dataSale, options);


        var gaugeInterval = setInterval(function() {
            dataSale.setValue(0, 1, 40 + Math.round(60 * Math.random()));
            chart.draw(dataSale, options);
        }, 5000);
        $btnStatSale.on('click', function () {
            $btnStat.removeClass('active');
            $(this).addClass('active');
            chart.draw(dataSale, options);
            clearInterval(gaugeInterval);
            gaugeInterval = setInterval(function() {
                dataSale.setValue(0, 1, 40 + Math.round(60 * Math.random()));
                chart.draw(dataSale, options);
            }, 1000);
        });
        $btnStatCorporate.on('click', function () {
            $btnStat.removeClass('active');
            $(this).addClass('active');
            chart.draw(dataCorporate, options);
            clearInterval(gaugeInterval);
            gaugeInterval = setInterval(function() {
                dataCorporate.setValue(0, 1, 40 + Math.round(60 * Math.random()));
                chart.draw(dataCorporate, options);
            }, 10000);
        });
        $btnStatGaranty.on('click', function () {
            $btnStat.removeClass('active');
            $(this).addClass('active');
            chart.draw(dataGaranty, options);
            clearInterval(gaugeInterval);
            gaugeInterval = setInterval(function() {
                dataGaranty.setValue(0, 1, 40 + Math.round(60 * Math.random()));
                chart.draw(dataGaranty, options);
            }, 5000);
        });
    }

    //График среднее время ожидания в очереди линейный
    function drawChartStatWaitLine() {

        var data = new google.visualization.DataTable();
        data.addColumn('date', '');
        data.addColumn('number', 'Секунд');

        data.addRows([
            [new Date(2015, 3, 30), 90],
            [new Date(2015, 4, 30), 80],
            [new Date(2015, 5, 30), 80],
            [new Date(2015, 6, 30), 65],
            [new Date(2015, 7, 30), 60]
        ]);

        var options = {
            hAxis: {
                title: '',
                textPosition: 'none'
            },
            vAxis: {
                title: ''
            },
            chartArea: {
              width: 230
            },
            series: [
                {color: '#318bdf', visibleInLegend: false}
            ]
        };

        var chart = new google.visualization.LineChart(document.getElementById('linechartStat'));
        chart.draw(data, options);
    }


    // Modal options
    var $modalOptions = $('.js-modal-options'),
        $stat = $modalOptions.find('.js-modal-stat'),
        $norm = $modalOptions.find('.js-modal-norm'),
        $statView = $modalOptions.find('.js-modal-stat-view'),
        $normView = $modalOptions.find('.js-modal-norm-view');
    $stat.on('click', function () {
        $norm.removeClass('active');
        $(this).addClass('active');
        $normView.addClass('hidden');
        $statView.removeClass('hidden');
    });
    $norm.on('click', function () {
        $stat.removeClass('active');
        $(this).addClass('active');
        $statView.addClass('hidden');
        $normView.removeClass('hidden');
    });

    $('.js-options-btn').on('click', function () {
        $('.js-modal-options').modal({
            fadeDuration: 0
        });
        $('.jquery-modal').css({'z-index':2,'background-color':'rgba(0,0,0,.3)'});
    });
    $('.js-modal-close').on('click', function () {
        $.modal.close();
    });

    // sortable for modal options
    var el = document.getElementById('items');
    var sortable = Sortable.create(el, {
        draggable: '.js-sortable-item'
    });
    var $sortableItem = $('.js-sortable-item');
    $sortableItem.on('mouseenter', function () {
       $(this).addClass('active')
    });
    $sortableItem.on('mouseleave', function () {
        $(this).removeClass('active')
    });

    //Monitoring table tabs
    var $monitoringTab = $('.js-monitoring-tab'),
        $tableNavPeriod = $('.js-table-nav-period'),
        $tableBtnPeriod = $tableNavPeriod.find('.js-table-btn');
    //Переключение таблиц мониторинга
    $monitoringTab.on('click', function () {
        var $this = $(this),
            $tableMonitorng = $('.js-table-monitoring'),
            $tableNavOption = $('.js-table-nav-option');

        //Скрытие кнопок загрузки и нормативов при условии активации дневной или общей загрузки
        if($this.data('table')=='monitoring-daily'||$this.data('table') == 'monitoring-overall') {
            $tableNavOption.addClass('hidden');
        } else {
            $tableNavOption.removeClass('hidden');
        }

        //Деактивация кнопок навигации по периодам при условии активации дневной загрузки
        if($this.data('table') == 'monitoring-daily') {
            $tableNavPeriod.find("[data-period = 'week'],[data-period = 'month'],[data-period = 'year']").addClass('disabled');
        }else {
            $tableBtnPeriod.removeClass('disabled');
        }

        //Скрыть все таблицы
        $tableMonitorng.addClass('hidden');

        //Показать текущую таблицу
        $(".js-table-monitoring[data-table='" + $this.data('table') +"']").removeClass('hidden');
        //Убрать класс active со всех кнопок навигации таблиц
        $monitoringTab.removeClass('active');

        //Добавить класс active для нажатой кнопки
        $this.addClass('active');
    });

    var $chartGauge = $('.js-chart-gauge'),
        $chartLine = $('.js-chart-line');
    $tableBtnPeriod.on('click', function () {
        var $this = $(this);
        //Если активна кнопка навигации по периодам со значениями 'неделя', 'месяц','год'
        if($this.data('period') == 'week'|| $this.data('period') == 'month'||$this.data('period') == 'year') {
            //Удаление спидометра
            $chartGauge.hide().empty();
            //Отрисовка линейного графика
            $chartLine.show();
            google.charts.setOnLoadCallback(drawChartStatWaitLine);

            //Деактивация кнопки навигации по таблицам 'Дневная нагрузка'
            $(".js-monitoring-tab[data-table='monitoring-daily']").addClass('disabled');

            //Скрытие календаря одинарного
            $tableNavPeriod.find("[data-period='calendar-single']").addClass('hidden');

            //Показ календаря двойного
            $tableNavPeriod.find("[data-period='calendar-double']").removeClass('hidden');
        } else if($this.data('period') == 'today'|| $this.data('period') == 'yesterday'){
            //Удаление линейного графика
            $chartLine.hide().empty();
            //Отрисовка спидометра
            $chartGauge.show();
            google.charts.setOnLoadCallback(drawChartStatWaitGauge);
            //Активация кнопки навигации по таблицам 'Дневная нагрузка'
            $(".js-monitoring-tab[data-table='monitoring-daily']").removeClass('disabled');

            //Скрытие календаря двойного
            $tableNavPeriod.find("[data-period='calendar-double']").addClass('hidden');

            //Показ календаря одинарного
            $tableNavPeriod.find("[data-period='calendar-single']").removeClass('hidden');
        }
        //Убрать класс  'active' у всех кнопок навигации по периодам
        $tableBtnPeriod.removeClass('active');

        //Активировать текущую кнопку навигации по периодам если на ней нет флага disable
        if($this.not('.disabled')){
            $this.addClass('active');
        }
    });

    $tableNavPeriod.find("[data-period='calendar-single']").tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        animationDuration: 200,
        content:'<div><img src="../img/calendar/calendar-small.png" alt=""></div>'
    });
    $tableNavPeriod.find("[data-period='calendar-double']").tooltipster({
        theme: 'table-tooltip-wr',
        contentAsHTML: true,
        arrow: false,
        interactive: true,
        side: 'bottom',
        trigger: 'click',
        delay: 50,
        animationDuration: 200,
        content:'<div><img src="../img/calendar/calendar-big.png" alt=""></div>'
    });
    
});
