// JavaScript Document

//jQuery plugin for enhance UI elements' function and behavior by their classes;
(function($) {
    $.fn.enhanceUIElements = function() {
        //calendar for input of date class
	    $(this).find('input[type=text].date').datepicker({changeYear:true});   
    }
    $.alert = function(message,title,type) {
        var messageHtml = '<div class="message"><p>' + message + '</p></div>';
        if (!this.alertBox) {
            this.alertBox = $(messageHtml).appendTo($(document)).dialog({
                modal: true,
                title: title,
                width: 400,
                minHeight:120,
                resizable:false,
                show: 'scale',
                hide: 'scale',
                buttons: { "确定": function() { 
                    $(this).dialog('close');
                }}
            });
        }else{
            this.alertBox.html(messageHtml).dialog('open');
        }
    }    
})(jQuery);

$(function(){
	//change the row style when the checkbox is checked in the row
	$('table tr td input[type=checkbox]').change(function() {
	    var inRow = $(this).closest('tr');
		if (this.checked) {
			inRow.addClass('selected');
		}
		else {
			inRow.removeClass('selected');
		}
	});
	
	//select all rows 
	$('table tr th input[type=checkbox]').change(function() {
		$(this).closest('table').find('tr td input[type=checkbox]')
		.attr('checked',this.checked)
		.trigger('change');
	});

	//display or hide the more search panel
	var searchPanel = $('div.search-panel');
	var moreSearch = searchPanel.find('div.more-search');
    moreSearch.enhanceUIElements();
	searchPanel.find('a.advanced').click(function() {
		if (moreSearch.is(':visible')) {
			$(this).removeClass('active');
			moreSearch.slideUp();
		}
		else {
			$(this).addClass('active');
			moreSearch.slideDown();
		}
	});
	
	moreSearch.find('.btn-cancel').click(function() {
		searchPanel.find('a.advanced').removeClass('active');
		moreSearch.slideUp();
	});
	
    //load content to dialog when buttons of class dialog-link is clicked.
	$('.dialog-link').click(function() {
        var dialogTitle = this.title ? this.title : $(this).html();
		$('#indicator').show();
        var dialogForm = $('#dialogForm');
		$.get(this.href,function(formHtml) {
            $('#indicator').hide();
            dialogForm.html(formHtml);
            dialogForm.enhanceUIElements();
            var dialogInnerForm = $('#dialogForm>form');
            var dialogWidth = dialogInnerForm.attr('width')? dialogInnerForm.attr('width'):'auto';
            var dialogHeight = dialogInnerForm.attr('height')? dialogInnerForm.attr('height'):'auto';
            dialogForm.dialog({
                modal: true,
                title: dialogTitle,
                show: 'scale',
                hide: 'scale',
                width: dialogWidth,
                height: dialogHeight,
                minWidth: 320,
                minHeight: 240,
                maxWidth:800,
                maxHeight:720,
                resizable: false
            });
            dialogForm.find('.btn-cancel').click(function() {
                dialogForm.dialog('close');
            });
		});
		return false;
	});

});