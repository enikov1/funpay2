$(document).ready(function () {
   
	if($('.scrollbar-inner')) $('.scrollbar-inner').scrollbar();
	

	$('.select-pay').customSelect({
		priceOn: true,
	});

	$('.select-default').customSelect();
	
	$('.field-number .minus').click(function() {
		let $input = $(this).parent().find('.number');
		let count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
	});

	$('.field-number .plus').click(function() {
		let $input = $(this).parent().find('.number');
		let count = parseInt($input.val()) + 1;
		count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
		$input.val(parseInt(count));
	});

	$('.field-number .number').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
		if (this.value == "") {
			this.value = 1;
		}
		if (this.value > parseInt($(this).data('max-count'))) {
			this.value = parseInt($(this).data('max-count'));
		}    
	});

	$('#mod-change button').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	$('.pay-system_items button').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	$('#active-order').on('click', function() {
		$('#popup-order').addClass('active');
	});

	$('#close-order').on('click', function(e) {
		e.preventDefault();
		$('#popup-order').removeClass('active');
	});

	$(document).mouseup(function (e) {
		var container = $("#popup-order");
		if (container.has(e.target).length === 0){
			container.removeClass('active');
		}
	});

	$('.burger').on('click', function() {
		$(this).toggleClass('active');
		$('.header_nav').toggleClass('active');
	});

	// $('.carousel').owlCarousel({
	// 	items: 1,
	// 	nav:false,
	// 	// autoplay:true,
	// });

	var swiper = new Swiper('.swiper-container', {
		autoplay: true,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// order comment

	function mediaMove(insert, block) {
		if($(window).width() <= 768) {

			if(insert.find(block).length == 0) {
				insert.append(block);
			}
			
		}
	}

	let block_comment = $('.order-comment'),
		block_inser = $('#insert_comment');
	
	$(window).on('resize', function() {
		mediaMove(block_inser, block_comment);
	});

	mediaMove(block_inser, block_comment);

	(function ($) {
        // ???????????? ?????????????? ??????????????
        $.fn.getCursorPosition = function () {
            var input = this.get(0);
            if (!input) return;
            if ('selectionStart' in input) {
                return input.selectionStart;
            } else if (document.selection) {
                input.focus();
                var sel = document.selection.createRange();
                var selLen = document.selection.createRange().text.length;
                sel.moveStart('character', -input.value.length);
                return sel.text.length - selLen;
            }
        }
        // ???????????????????? ?????????????? ??????????????
        $.fn.setCursorPosition = function (pos) {
            if ($(this).get(0).setSelectionRange) {
                $(this).get(0).setSelectionRange(pos, pos);
            } else if ($(this).get(0).createTextRange) {
                var range = $(this).get(0).createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }
        // ?????????????? ???????????????????? ??????????
        $.fn.delSelected = function () {
            var input = $(this);
            var value = input.val();
            var start = input[0].selectionStart;
            var end = input[0].selectionEnd;
            input.val(
                    value.substr(0, start) + value.substring(end, value.length)
            );
            return end - start;
        };

        $.fn.priceFormat = function () {

            function priceFormatted(element) {
                element = String(element).replace(/[^\d]/g, '');
                if(!element) return '';
                return (String(parseInt(element))).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }

            $(this)
                // ???????????? ???????????????????????????? ???????????? ?? ?????????????? ?????????? ?????????????????????? ????????
                    .bind('contextmenu', function (event) {
                        event.preventDefault();
                    })
                    .bind('drop', function (event) {
                        var value = $(this).val();
                        $(this).val(''); // ?????? ?????? ??????????
                        $(this).val(value);
                        event.preventDefault();
                    })
                    .keydown(function (event) {
                        var cursor = $(this).getCursorPosition();
                        var code = event.keyCode;
                        var startValue = $(this).val();
                        if ((event.ctrlKey === true && code == 86) || // Ctrl+V | Shift+insert
                            (event.metaKey === true && code == 86) || 
                                (event.shiftKey === true && code == 45)) {
                            return false;
                        } else if (
                                code == 9 || // tab
                                        code == 27 || // ecs
                                        event.ctrlKey === true || // ?????? ?????? ???????????? ?? ctrl
                                        event.metaKey === true ||
                                        event.altKey === true || // ?????? ?????? ???????????? ?? alt
                                        event.shiftKey === true || // ?????? ?????? ???????????? ?? shift
                                        (code >= 112 && code <= 123) || // F1 - F12
                                        (code >= 35 && code <= 39)) // end, home, ??????????????
                        {
                            return;

                        } else if (code == 8) {// backspace

                            var delCount = $(this).delSelected();
                            if (!delCount) {
                                if (startValue[cursor - 1] === ' ') {
                                    cursor--;
                                }
                                $(this).val(startValue.substr(0, cursor - 1) + startValue.substring(cursor, startValue.length));
                            }
                            $(this).val(priceFormatted($(this).val()));
                            $(this).setCursorPosition(cursor - (startValue.length - $(this).val().length - delCount));

                        } else if (code == 46) { // delete

                            var delCount = $(this).delSelected();
                            if (!delCount) {
                                if (startValue[cursor] === ' ') {
                                    cursor++;
                                }
                                $(this).val(startValue.substr(0, cursor) + startValue.substring(cursor + 1, startValue.length));
                            }
                            if (!delCount)delCount = 1;
                            $(this).val(priceFormatted($(this).val()));
                            $(this).setCursorPosition(cursor - (startValue.length - $(this).val().length - delCount));

                        } else {
                            $(this).delSelected();
                            startValue = $(this).val();
                            var key = false;
                            // ???????????????? ??????????????
                            if ((code >= 48 && code <= 57)) {
                                key = (code - 48);
                            }
                            // numpad
                            else if ((code >= 96 && code <= 105 )) {
                                key = (code - 96);
                            } else {
                                $(this).val(priceFormatted($(this).val()));
                                $(this).setCursorPosition(cursor);
                                return false;
                            }
                            var length = startValue.length
                            var value = startValue.substr(0, cursor) + key + startValue.substring(cursor, startValue.length);
                            $(this).val(priceFormatted(value));
                            $(this).setCursorPosition(cursor + $(this).val().length - startValue.length);
                        }
                        event.preventDefault();
                    });
        };
    })(jQuery);

	$('.money-format').priceFormat();

});
