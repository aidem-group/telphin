(function ($) {
    $(document).ready(function () {

        function convertMinsToHrsMins (minutes) {
            var h = Math.floor(minutes / 60);
            var m = minutes % 60;

            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;

            return h + ':' + m;
        }

        var r = convertMinsToHrsMins(85);

        //График звонков в таблице

        //Добавление в график общего временного отрезка пользователей

        function addCommonGrouped(timeline, group) {
            var $timeline = $(timeline);
            $timeline.find(".js-tr-group[data-tr='" + group + "']").find('.td.timeline').append('<div class="common-grouped" data-common-grouped="' + group + '"></div>');
        }

        //Добавление в график временных отрезков
        function addTimeBar(timeline, group) {
            var $timeline = $(timeline);
            $timeline.find(".js-tr-group[data-tr='" + group + "']").find('.td.timeline').append('<div class="js-time-bar time-bar" data-time-bar="' + group + '"></div>');
        }

        //

        //Добавление в график разметки временных отрезков
        function addTimeBarLine(group) {
            $(".js-time-bar[data-time-bar='" + group + "']").find('.time-bar-item').not(':first,:last').append("<span class='time-bar-line' style='height: " + $('.js-table-monitoring[data-table=monitoring-daily]').find('.js-tr[data-tr=' + group + ' ]').length * 100 + '%' + "'></span>");
        }

        //
        //Добавление в график временных отрезков для пользователей для графика Daily
        function addUserDaily(timeline, group) {
            var $timeline = $(timeline);
            var i = 1;
            $timeline.find(".js-tr[data-tr='" + group + "']").find('.td.timeline').each(function () {
                $(this).append("<div data-timeline='user-" + group + i++ + "' class='time-line'></div>")
            });
        }

        //

        //Добавление в график временных отрезков для пользователей для графика Overall
        function addUserOverall(timeline, group) {
            var $timeline = $(timeline);
            var i = 1;
            $timeline.find(".js-tr[data-tr='" + group + "']").find('.td.timeline').each(function () {
                $(this).append("<div data-timeline='user" + i++ + "' class='time-line'></div>")
            });
        }

        //

        // Дневная загрузка Отдел продаж

        function drawTimelineDailySales(group) {
            var data = {
                legends: {
                    callout: {
                        name: 'Исходящий',
                        class: 'callout'
                    },
                    callin: {
                        name: 'Входящий',
                        class: 'callin'
                    },
                    callinadd: {
                        name: 'Входящий на доб.',
                        class: 'callinadd'
                    },
                    free: {
                        name: 'Свободен',
                        class: 'free'
                    },
                    offline: {
                        name: 'Офлайн',
                        class: 'offline'
                    }
                },
                lines: {
                    'user1': [
                        ['callout', '07:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'user2': [
                        ['callin', '09:00', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'user3': [
                        ['callinadd', '07:20', '08:50'],
                        ['free', '09:30', '10:00'],
                        ['callinadd', '10:00', '11:50'],
                        ['callout', '12:20', '12:50'],
                        ['callin', '12:50', '14:00'],
                        ['callout', '14:20', '15:00']
                    ],
                    'user4': [
                        ['callout', '07:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ]
                }
            };

            addTimeBar('.js-timeline-daily', group);
            addUserDaily('.js-timeline-daily', group);
            var timeLineChart = $('.js-timeline-daily').glavwebTimeLineChart(data, {
                timeBarSelector: '.time-bar[data-time-bar=' + group + ']',
                legendBarSelector: '.legend-bar',
                step: 60,
                width: 683
            });

            timeLineChart.drawLegendBar();
            timeLineChart.drawTimeBar();
            //timeLineChart.drawLines();
            /**
             * Custom selectors
             */
                // timeLineChart.drawLegendBar('.legend-top');
                // timeLineChart.drawTimeBar('.time-bar-bottom');
                // timeLine.drawLine('user1', '.user-1');

            timeLineChart.drawLine('user1', '[data-timeline=user-sales1]');
            timeLineChart.drawLine('user2', '[data-timeline=user-sales2]');
            timeLineChart.drawLine('user3', '[data-timeline=user-sales3]');
            timeLineChart.drawLine('user4', '[data-timeline=user-sales4]');
            addTimeBarLine(group);
        }

        drawTimelineDailySales('sales');

        // Дневная загрузка Корпоративный отдел

        function drawTimelineDailyCorporate(group) {
            var data = {
                legends: {
                    callout: {
                        name: 'Исходящий',
                        class: 'callout'
                    },
                    callin: {
                        name: 'Входящий',
                        class: 'callin'
                    },
                    callinadd: {
                        name: 'Входящий на доб.',
                        class: 'callinadd'
                    },
                    free: {
                        name: 'Свободен',
                        class: 'free'
                    },
                    offline: {
                        name: 'Офлайн',
                        class: 'offline'
                    }
                },
                lines: {
                    'user1': [
                        ['callout', '06:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'user2': [
                        ['callin', '09:00', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'user3': [
                        ['callinadd', '07:20', '08:50'],
                        ['free', '09:30', '10:00'],
                        ['callinadd', '10:00', '11:50'],
                        ['callout', '12:20', '12:50'],
                        ['callin', '12:50', '14:00'],
                        ['callout', '14:20', '15:00']
                    ]
                }
            };
            addTimeBar('.js-timeline-daily', group);
            addUserDaily('.js-timeline-daily', group);
            var timeLineChart = $('.js-timeline-daily').glavwebTimeLineChart(data, {
                timeBarSelector: '.time-bar[data-time-bar=' + group + ']',
                legendBarSelector: '.legend-bar',
                step: 60,
                width: 683
            });

            timeLineChart.drawLegendBar();
            timeLineChart.drawTimeBar();
            //timeLineChart.drawLines();
            /**
             * Custom selectors
             */
                // timeLineChart.drawLegendBar('.legend-top');
                // timeLineChart.drawTimeBar('.time-bar-bottom');
                // timeLine.drawLine('user1', '.user-1');
            timeLineChart.drawLine('user1', '[data-timeline=user-corporate1]');
            timeLineChart.drawLine('user2', '[data-timeline=user-corporate2]');
            timeLineChart.drawLine('user3', '[data-timeline=user-corporate3]');
            addTimeBarLine(group);
        }


        drawTimelineDailyCorporate('corporate');

        // Общая загрузка Отдел продаж

        function drawTimelineOverallSales(group) {
            var data = {
                legends: {
                    callout: {
                        name: 'Исходящий',
                        class: 'callout'
                    },
                    callin: {
                        name: 'Входящий',
                        class: 'callin'
                    },
                    callinadd: {
                        name: 'Входящий на доб.',
                        class: 'callinadd'
                    },
                    free: {
                        name: 'Свободен',
                        class: 'free'
                    },
                    offline: {
                        name: 'Офлайн',
                        class: 'offline'
                    }
                },
                lines: {
                    'user1': [
                        ['callout', '07:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'user2': [
                        ['callin', '09:00', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'user3': [
                        ['callinadd', '07:20', '08:50'],
                        ['free', '09:30', '10:00'],
                        ['callinadd', '10:00', '11:50'],
                        ['callout', '12:20', '12:50'],
                        ['callin', '12:50', '14:00'],
                        ['callout', '14:20', '15:00']
                    ]
                }
            };

            addCommonGrouped('.js-timeline-overall', group);
            addUserOverall('.js-timeline-overall', group);
            var timeLineChart = $('.js-timeline-overall').glavwebTimeLineChart(data, {
                timeBarSelector: '.time-bar[data-time-bar=' + group + ']',
                legendBarSelector: '.legend-bar',
                step: 60,
                width: 683
            });

            timeLineChart.drawLegendBar();
            timeLineChart.drawTimeBar();
            timeLineChart.drawLines();
            timeLineChart.drawGroupedLinesByLegend('legend', {
                callout: 5,
                callin: 4,
                callinadd : 3,
                free: 2,
                unknown: 1
            });
            timeLineChart.drawLineCommonGroupedByLegend('.common-grouped[data-common-grouped=' + group + ']', 'desc');
            /**
             * Custom selectors
             */
            // timeLineChart.drawLegendBar('.legend-top');
            // timeLineChart.drawTimeBar('.time-bar-bottom');
            // timeLine.drawLine('user1', '.user-1');

        }

        drawTimelineOverallSales('sales');

        // Общая загрузка Корпоративный отдел

        function drawTimelineOverallCorporate(group) {
            var data = {
                legends: {
                    callout: {
                        name: 'Исходящий',
                        class: 'callout'
                    },
                    callin: {
                        name: 'Входящий',
                        class: 'callin'
                    },
                    callinadd: {
                        name: 'Входящий на доб.',
                        class: 'callinadd'
                    },
                    free: {
                        name: 'Свободен',
                        class: 'free'
                    },
                    offline: {
                        name: 'Офлайн',
                        class: 'offline'
                    }
                },
                lines: {
                    'user1': [
                        ['callout', '07:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'user2': [
                        ['callin', '10:30', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'user3': [
                        ['callinadd', '07:20', '09:00'],
                        ['free', '09:30', '10:00'],
                        ['callinadd', '10:00', '11:50'],
                        ['callout', '12:20', '12:50'],
                        ['callin', '12:50', '14:00'],
                        ['callout', '14:20', '15:00']
                    ],
                    'user4': [
                        ['callout', '07:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ]
                }
            };

            addCommonGrouped('.js-timeline-overall', group);
            addUserOverall('.js-timeline-overall', group);

            var timeLineChart = $('.js-timeline-overall').glavwebTimeLineChart(data, {
                timeBarSelector: '.time-bar[data-time-bar=' + group + ']',
                legendBarSelector: '.legend-bar',
                step: 60,
                width: 683
            });

            timeLineChart.drawLegendBar();
            timeLineChart.drawTimeBar();
            timeLineChart.drawLines();
            timeLineChart.drawGroupedLinesByLegend('legend', {
                 callout: 5,
                 callin: 4,
                 callinadd : 3,
                 free: 2,
                 unknown: 1
             });
            timeLineChart.drawLineCommonGroupedByLegend('.common-grouped[data-common-grouped=' + group + ']', 'desc');
            /**
             * Custom selectors
             */
                // timeLineChart.drawLegendBar('.legend-top');
                // timeLineChart.drawTimeBar('.time-bar-bottom');
                // timeLine.drawLine('user1', '.user-1');
            addTimeBarLine(group);
        }

        drawTimelineOverallCorporate('corporate');

        $('.js-timeline-daily').find('.timeline-item').tooltipster({
            theme: 'table-tooltip-wr',
            contentAsHTML: true,
            arrow: false,
            side: 'top',
            delay: 50,
            animationDuration: 200,
            minWidth: 265,
            content: '<div class="timeline-tooltip timeline-tooltip_daily"><span class="js-timeline-tooltip-text timeline-tooltip__text">Исходящие</span><span class="js-timeline-tooltip-time timeline-tooltip__time" >4:55:03 ч</span><br><span class="js-timeline-tooltip-number timeline-tooltip__number"></span><span class="js-timeline-tooltip-name timeline-tooltip__name"></span></div>',
            functionReady: function (instance) {
                var $tooltip = $(instance.elementTooltip()),
                    $trigger = $(instance.elementOrigin()),
                    $time = $trigger.data('timeline-start-time'),
                    $legend = $trigger.data('timeline-legend'),
                    $number = $trigger.closest('.js-tr').find('.phone-number').text(),
                    $name = $trigger.closest('.js-tr').find('.td.first').text(),
                    $legendBar = $('.js-timeline-overall').find('.legend-bar');
                $tooltip.find('.js-timeline-tooltip-time').text('в ' + $time);
                $tooltip.find('.js-timeline-tooltip-name').text($name);
                console.log($number);
                if($number == '') {
                    $tooltip.find('.js-timeline-tooltip-number').remove();
                } else {
                    $tooltip.find('.js-timeline-tooltip-number').text($number);

                }
                if($legend == 'unknown') {
                    $tooltip.find('.js-timeline-tooltip-text').text('Офлайн');
                }else {
                    $tooltip.find('.js-timeline-tooltip-text').text($legendBar.find(".legend-item_"+$legend+"").text());
                }
            }
        });

        $('.js-timeline-overall').find('.timeline-item').tooltipster({
            theme: 'table-tooltip-wr',
            contentAsHTML: true,
            arrow: false,
            side: 'top',
            delay: 50,
            animationDuration: 200,
            minWidth: 'auto',
            content: '<div class="timeline-tooltip"><div class="js-timeline-tooltip-text timeline-tooltip__text">Исходящие</div><div class="js-timeline-tooltip-time timeline-tooltip__time" >4:55:03 ч</div></div>',
            functionReady: function (instance) {
                var $tooltip = $(instance.elementTooltip()),
                    $trigger = $(instance.elementOrigin()),
                    $time = $trigger.data('timeline-total-minutes'),
                    $legend = $trigger.data('timeline-legend'),
                    $legendBar = $('.js-timeline-overall').find('.legend-bar');
                $tooltip.find('.js-timeline-tooltip-time').text(convertMinsToHrsMins($time) + ' ч');

                if($legend == 'unknown') {
                    $tooltip.find('.js-timeline-tooltip-text').text('Офлайн');
                }else {
                    $tooltip.find('.js-timeline-tooltip-text').text($legendBar.find(".legend-item_"+$legend+"").text());
                }
            }
        });
    })
})(jQuery);