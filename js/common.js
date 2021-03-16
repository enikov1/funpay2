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

});
