$(function(){
    initPlayers();
    initTabsBlock();
    initPhoneFunc();

	$('.dropdown-toggle').on('click', dropdown);
	$('.header_btn-user-status').on('click', function(){$(this).toggleClass('offline');});
    $(document).on('click', 'a[href*=#]', anchorLinksHandler);
    $(document).on('click', '.b-unrolling_toggle', unrollingBlock);

    $('.select').styler();
    $('.date').pickmeup({flat: true, mode: 'range', calendars: 2});
});

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
    var block = {};
    var buttons = {};
    var tabs = {};

    $('.b-tabs').each(function(){
        block = $(this);
        buttons = block.children('.b-tabs_btns').children();
        tabs = block.children('.b-tabs_inner').children('.b-tabs_item');

        buttons.bind('click', function(){
            changeTab($(this).index());
        });

        changeTab(0);
    });

    function changeTab( index )
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

    var left = wrapper.offset().left + wrapper.outerWidth()/2;
    var right = $('.main-wrapper').innerWidth() - left
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

    if(container.hasClass('open')) {
        wrapper.removeClass('active');
        container.removeClass('open');
    } else {
        $('.dropdown-container.open').removeClass('open');
        wrapper.toggleClass('active');
        container.addClass('proc').toggleClass('open');
    }
}