(function( $ ) {

	$.fn.ypFlowGrid = function(option) {

		if ('string' === typeof option) {

			if ($.fn.ypFlowGrid.methods[option]) {
				// Call method
				var methodName = option;
				
				return $.fn.ypFlowGrid.methods[methodName].apply(this, Array.prototype.slice.call(arguments, 1))
			} else {
				console.log('Method is not defined');
				return null;
			}

		} else {

			// Set up plugin
			if ('undefined' == typeof options) {
				options = {};
			}
	        var settings = $.extend({}, $.fn.ypFlowGrid.defaults, options );
	        this.data('jpFlowGrid_settings', settings);

	        $(window).resize(function(obj){return function(){
	        	obj.ypFlowGrid('render');
	        }}(this));

	        this.ypFlowGrid('render');

	        return this;
	    }
	}

	function getShortestCol(cols)
	{
		var shortestCol = null;
		for (var i = 0; i < cols.length; i++) {
			var col = $(cols[i]);
			if (null == shortestCol || shortestCol.height() > col.height()) {
				shortestCol = col;
			}
		}
		return shortestCol;
	}

	$.fn.ypFlowGrid.defaults = {

		// Options
    	colClass: "ypfg-col",
    	itemClass: "ypfg-item",
    	minColWidth: 280,

    	// Callbacks
    	onResize: function() {}

    };

    $.fn.ypFlowGrid.methods = {
    	render: function() {
    		
    		// Retrieve settings
    		var settings = this.data('jpFlowGrid_settings');

    		// Memorize all current items
    		var items = $(this).find('.' + settings.itemClass);

    		$(this).html('');

    		var colsCount = Math.ceil($(this).width() / settings.minColWidth);
    		var colWidth = Math.floor($(this).width() / colsCount);
    		var $cols = [];
    		for (var i = 0; i < colsCount; i++) {
    			$cols[i] = $('<div>').addClass(settings.colClass).css('width', colWidth);
    			$(this).append(
    				$cols[i]
    			);
    		}

    		items.each(function(){
    			getShortestCol($cols).append(
    				$(this)
    			);
    		});

    	},
    	appendItem: function(item) {
    		
    		// Retrieve settings
    		var settings = this.data('jpFlowGrid_settings');

    		var $cols = $(this).find('.' + settings.colClass);

    		getShortestCol($cols).append(
				$(item)
			);
    	}
    };

}(jQuery))