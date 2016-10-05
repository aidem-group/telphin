(function ($) {
    $(document).ready(function (e) {
        $('.js-btn-stat-other').tooltipster({
            theme: 'table-tooltip-wr',
            contentAsHTML: true,
            arrow: false,
            interactive: true,
            side: 'bottom',
            trigger: 'click',
            delay: 50,
            content: '<ul class="table-dropdown-menu table-dropdown-menu_tl table-dropdown-menu_stat">'+
            '<li class="table-dropdown-menu__item">' +
            '<button class="table-btn table-btn_stat">' +
            '<span class="table-btn__text">Тех. поддержка</span>' +
            '</button>'+
            '</li>'+
            '<li class="table-dropdown-menu__item">'+
            '<button class="table-btn table-btn_stat">'+
            '<span class="table-link__text">Рекламный отдел</span>'+
            '</button>'+
            '</li>'+
            '</ul>',
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
            content: '<ul class="table-dropdown-menu table-dropdown-menu_tl table-dropdown-menu_stat">'+
            '<li class="table-dropdown-menu__item">' +
            '<button class="table-btn table-btn_stat">' +
            '<span class="table-btn__text">+ 7 921 879-82-92</span>' +
            '</button>'+
            '</li>'+
            '<li class="table-dropdown-menu__item">'+
            '<button class="table-btn table-btn_stat">'+
            '<span class="table-btn__text">+ 7 921 879-82-92</span>' +
            '</button>'+
            '</li>'+
            '</ul>',
            functionPosition: function(instance, helper, position){
                position.coord.top -= 30;
                position.coord.left -= -14;

                return position;
            },
            functionReady: function (instance) {
                //
            }
        });


        var $btnStat = $('.js-btn-stat'),
            $btnStatSale = $('.js-btn-stat-sale'),
            $btnStatCorporate = $('.js-btn-stat-corporate'),
            $btnStatGaranty = $('.js-btn-stat-garanty');
        google.charts.load('current', {'packages':['corechart','gauge']});
        google.charts.setOnLoadCallback(drawChart);
        google.charts.setOnLoadCallback(drawChart1);
        google.charts.setOnLoadCallback(drawChart2);
        google.charts.setOnLoadCallback(drawChart3);
        function drawChart() {

            var dataSale = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     30],
                ['Eat',      70]
            ]);

            var dataCorporate = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     20],
                ['Eat',      80]
            ]);

            var dataGaranty = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     50],
                ['Eat',      50]
            ]);

            var options = {
                width: '165',
                height: '165',
                chartArea:{left:0,top:0,width:'100%',height:'100%'},
                pieHole: 0.5,
                legend: {position:'none'},
                colors:['#df4d41','#0abc6e'],
                tooltip: {ignoreBounds: true},
                fontSize: 12
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechartStatCalls'));

            chart.draw(dataSale, options);
            $btnStatSale.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataSale, options);
            });
            $btnStatCorporate.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataCorporate, options);
            });
            $btnStatGaranty.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataGaranty, options);
            });
        }
        function drawChart1() {

            var dataSale = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     20],
                ['Eat',      45],
                ['Other',      35]
            ]);
            var dataCorporate = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     10],
                ['Eat',      90]
            ]);

            var dataGaranty = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     90],
                ['Eat',      10]
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

            var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

            chart.draw(dataSale, options);
            $btnStatSale.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataSale, options);
            });
            $btnStatCorporate.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataCorporate, options);
            });
            $btnStatGaranty.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataGaranty, options);
            });
        }
        function drawChart2() {

            var dataSale = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Отключился агент',     45],
                ['Eat',      20],
                ['Other',      35]
            ]);
            var dataCorporate = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     30],
                ['Eat',      70]
            ]);

            var dataGaranty = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work',     60],
                ['Eat',      40]
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

            var chart = new google.visualization.PieChart(document.getElementById('piechart3'));

            chart.draw(dataSale, options);
            $btnStatSale.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataSale, options);
            });
            $btnStatCorporate.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataCorporate, options);
            });
            $btnStatGaranty.on('click', function () {
                $btnStat.removeClass('active');
                $(this).addClass('active');
                chart.draw(dataGaranty, options);
            });
        }
        function drawChart3() {

            var dataSale = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['секунд', 60]
            ]);
            var dataCorporate = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['секунд', 40]
            ]);
            var dataGaranty = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['секунд', 30]
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
    });
})(jQuery);


