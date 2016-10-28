(function ($) {
    $(document).ready(function () {

        function countSecondsBetweenDates(startTime, endTime) {
            return Math.abs(endTime - startTime) / 1000;
        }

        function convertSecToHrsMinsSec (totalSec, type) {
            var hours = parseInt( totalSec / 3600 ) % 24;
            var minutes = parseInt( totalSec / 60 ) % 60;
            var seconds = totalSec % 60;
            if(type == 'hm') {
                var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
                return result;
            }else {
                var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes)+ ":" + (seconds  < 10 ? "0" + seconds : seconds);
                return result;
            }
        }

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
                $(this).append("<div style='width: 728px'><div data-timeline='"+ group +"User" + i++ + "' class='time-line'></div></div>")
            });
        }

        //

        //Добавление в график временных отрезков для пользователей для графика Overall
        function addUserOverall(timeline, group) {
            var $timeline = $(timeline);
            var i = 1;
            $timeline.find(".js-tr[data-tr='" + group + "']").find('.td.timeline').each(function () {
                $(this).append("<div data-timeline='"+ group +"User" + i++ + "' class='time-line'></div>")
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
                    'salesUser1': [
                        ['callout', '07:00:15', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'salesUser2': [
                        ['callin', '09:00', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'salesUser3': [
                        ['callinadd', '07:20', '08:50'],
                        ['free', '09:30', '10:00'],
                        ['callinadd', '10:00', '11:50'],
                        ['callout', '12:20', '12:50'],
                        ['callin', '12:50', '14:00'],
                        ['callout', '14:20', '15:00']
                    ],
                    'salesUser4': [
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
                width: 728
            });

            timeLineChart.drawLegendBar();
            timeLineChart.drawTimeBar();
            timeLineChart.drawLines();
            /**
             * Custom selectors
             */
                // timeLineChart.drawLegendBar('.legend-top');
                // timeLineChart.drawTimeBar('.time-bar-bottom');
                // timeLine.drawLine('user1', '.user-1');

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
                    'corporateUser1': [
                        ['callout', '06:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'corporateUser2': [
                        ['callin', '09:00', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'corporateUser3': [
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
                width: 728
            });

            timeLineChart.drawLegendBar();
            timeLineChart.drawTimeBar();
            timeLineChart.drawLines();
            /**
             * Custom selectors
             */
                // timeLineChart.drawLegendBar('.legend-top');
                // timeLineChart.drawTimeBar('.time-bar-bottom');
                // timeLine.drawLine('user1', '.user-1');
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
                    'salesUser1': [
                        ['callout', '07:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'salesUser2': [
                        ['callin', '09:00', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'salesUser3': [
                        ['callinadd', '07:20', '08:50'],
                        ['free', '09:30', '10:00'],
                        ['callinadd', '10:00', '11:50'],
                        ['callout', '12:20', '12:50'],
                        ['callin', '12:50', '14:00'],
                        ['callout', '14:20', '15:00']
                    ],
                    'salesUser4': [
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
                width: 728
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
            timeLineChart.drawLineCommonGroupedByLegend('.common-grouped[data-common-grouped=' + group + ']', 'legend',{
                callout: 5,
                callin: 4,
                callinadd : 3,
                free: 2,
                unknown: 1
            });
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
                    'corporateUser1': [
                        ['callout', '07:00:00', '8:00'],
                        ['callin', '11:00', '11:30'],
                        ['callinadd', '11:30', '11:50'],
                        ['free', '11:50', '12:40'],
                        ['callinadd', '12:40', '13:50'],
                        ['callout', '13:50', '14:00']
                    ],
                    'corporateUser2': [
                        ['callin', '10:30', '10:50'],
                        ['callout', '10:50', '11:50'],
                        ['free', '11:50', '12:00'],
                        ['callinadd', '12:30', '13:50']
                    ],
                    'corporateUser3': [
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
                width: 728
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
            timeLineChart.drawLineCommonGroupedByLegend('.common-grouped[data-common-grouped=' + group + ']', 'legend', {
                callout: 5,
                callin: 4,
                callinadd : 3,
                free: 2,
                unknown: 1
            });
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
                    timeStart = $trigger.data('timeline-start-time'),
                    timeEnd = $trigger.data('timeline-end-time'),
                    legend = $trigger.data('timeline-legend'),
                    $number = $trigger.closest('.js-tr').find('.phone-number').text(),
                    $name = $trigger.closest('.js-tr').find('.td.first').text(),
                    $legendBar = $('.js-timeline-overall').find('.legend-bar'),

                    startTimeParse = timeStart.split(':'),
                    endTimeParse   = timeEnd.split(':'),

                    convertStartTime = new Date(1970, 0, 1, startTimeParse[0], startTimeParse[1], (startTimeParse[2] !== undefined ? startTimeParse[2] : 0)),
                    convertEndTime   = new Date(1970, 0, 1, endTimeParse[0], endTimeParse[1], (endTimeParse[2] !== undefined ? endTimeParse[2] : 0)),

                    timeDuration = convertSecToHrsMinsSec(countSecondsBetweenDates(convertStartTime, convertEndTime), 'hm');



                $tooltip.find('.js-timeline-tooltip-time').text('в ' + timeStart + ', ' + timeDuration + ' мин');
                $tooltip.find('.js-timeline-tooltip-name').text($name);

                if($number == '') {
                    $tooltip.find('.js-timeline-tooltip-number').remove();
                } else {
                    $tooltip.find('.js-timeline-tooltip-number').text($number + ',');

                }
                if(legend == 'unknown') {
                    $tooltip.find('.js-timeline-tooltip-text').text('Офлайн');
                }else {
                    $tooltip.find('.js-timeline-tooltip-text').text($legendBar.find(".legend-item_"+legend+"").text());
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
            content: '<div class="timeline-tooltip"><div class="js-timeline-tooltip-text timeline-tooltip__text">Исходящие</div><div class="js-timeline-tooltip-time timeline-tooltip__time" >4:55:03 ч</div></div>',
            functionReady: function (instance) {
                var $tooltip = $(instance.elementTooltip()),
                    $trigger = $(instance.elementOrigin()),
                    $time = $trigger.data('timeline-total-seconds'),
                    $legend = $trigger.data('timeline-legend'),
                    $legendBar = $('.js-timeline-overall').find('.legend-bar');
                $tooltip.find('.js-timeline-tooltip-time').text(convertSecToHrsMinsSec($time) + ' ч');

                if($legend == 'unknown') {
                    $tooltip.find('.js-timeline-tooltip-text').text('Офлайн');
                }else {
                    $tooltip.find('.js-timeline-tooltip-text').text($legendBar.find(".legend-item_"+$legend+"").text());
                }
            }
        });
    })
})(jQuery);