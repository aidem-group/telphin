$(function(){
    initPlayers();
    initTabsBlock();
    initPhoneFunc();

	$('.dropdown-toggle').on('click', dropdown);
	$('.header_btn-user-status').on('click', function(){$(this).toggleClass('offline');});
    $('#routing-date').on('change', selectRoutingPeriod);
    $(document).on('click', 'a[href*=#]', anchorLinksHandler);
    $(document).on('click', '.b-unrolling_toggle', unrollingBlock);

    $('.select').styler();
    $('.date').pickmeup({flat: true, mode: 'range', calendars: 2});
    $('.add-new-person').on('submit', checkPersonData);
});

function checkPersonData()
{
    var template = $.templates("#personAdded");
    var htmlOutput = template.render({});
    $(this).parent().replaceWith(htmlOutput);

    return false;
}

function selectRoutingPeriod()
{
    var self = $(this);
    var parent = self.closest('.routing-date');
    var variables = parent.find('.routing-date_variables > div');

    variables
        .addClass('hidden')
        .eq(self.val() - 1)
        .removeClass('hidden');
}

function unrollingBlock()
{
    var toggle = $(this);
    var block = toggle.closest('.b-unrolling');
    var wrapper = toggle.parent();
    var hiddenBlock = block.children('.b-unrolling_inner');
    var unrollHeight = wrapper.outerHeight() + hiddenBlock.outerHeight();

    if(block.hasClass('active')){
        block.removeClass('active').css('min-height', 0);
    } else {
        $('.b-unrolling').removeClass('active').css('min-height', 0);
        block.addClass('active').css('min-height', unrollHeight);
    }
}

function initPhoneFunc()
{
    $('.phone-func-place').each(function(i){
        var block = $(this);
        var phone = block.data('phone');
        var name = block.data('name');
        var missed = block.data('missed') ? block.data('missed') : false;

        template = $.templates("#phoneFunc");
        htmlOutput = template.render({id: i, phone: phone, name: name, missed: missed});
        block.replaceWith(htmlOutput);
    });
}

function initTabsBlock()
{
    $('.b-tabs').each(function(){
        var block = $(this);
        var buttons = block.children('.b-tabs_btns').children();
        var tabs = block.find('.b-tabs_item');

        buttons.bind('click', function(){
            changeTab(buttons, tabs, $(this).index());
        });

        changeTab(buttons, tabs, 0);
    });

    function changeTab( buttons, tabs, index )
    {
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

function initPlayers()
{
    $('.jp-player').each(function(i){
        var player = $(this);
        var file = '';
        var template = '';
        var htmlOutput = '';

        if(!player.next('.jp-audio').length) {
            file = player.data('file');
            template = $.templates("#audioPlayer");
            htmlOutput = template.render({id: i});
            player.after(htmlOutput);
        }

        player.jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {mp3: file});
            },
            play: function() {
                $(this).jPlayer('pauseOthers');
            },
            cssSelectorAncestor: '#jp_container_' + i
        });
    });
}


function anchorLinksHandler( e )
{
	if (anchor == '#') return false;
	e.preventDefault();

    var anchor = $(this).attr('href');

    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top
    }, 1000);
}

function dropdown()
{
    var toggle = $(this);
    var wrapper = toggle.parent();
    var container = toggle.siblings('.dropdown-container');
    var block = container.children();
    var blockH = block.outerHeight();

    var pageSize = {
        width: $('.main-wrapper').innerWidth(),
        height: $('.main-wrapper').innerHeight()
    }

    var left = wrapper.offset().left - $('.main-wrapper').offset().left + wrapper.outerWidth()/2;
    var right = pageSize.width - left
    var containerHalfWidth = container.outerWidth()/2;

    if(!container.hasClass('proc')){
        $(document).bind('click', function(e){
            if(!$(e.target).closest('.dropdown').length){
                wrapper.removeClass('active');
                container.removeClass('open');
            }
        });
    }

    container.removeClass('dropdown-container__right dropdown-container__left');

    if(left < containerHalfWidth){
        container.addClass('dropdown-container__left');
    } else if(right < containerHalfWidth){
        container.addClass('dropdown-container__right');
    }

    if(container.offset().top + blockH > pageSize.height){
        container.addClass('on-top');
        block.css({top: -blockH});
    }

    if(container.hasClass('open')) {
        wrapper.removeClass('active');
        container.removeClass('open');
    } else {
        if(toggle.parents('.dropdown').length == 1){
            $('.dropdown-container.open').removeClass('open');
            $('.dropdown.active').removeClass('active');
        }
        wrapper.toggleClass('active');
        container.addClass('proc').toggleClass('open');
    }
}