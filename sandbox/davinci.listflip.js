//	
// davinci.listflip -- STÜBER SYSTEMS
//
	var reloadFlag = false;
//  var showCount = 12; // rows per page
//	var newPageTime = 10000; // next page time in 1/1000sec
	
	$.fn.scrollUp=function(masterTable){
		// set vars
		var tableRows = $(this).children(); // this = tbody
		var rowCount = tableRows.length;
		
		// check rowCount
		//if (rowCount <= showCount) return;
		
		// set pageNo, pageCount
		var pageNo = 1;
		var pageCount = Math.ceil(rowCount/showCount);
		
		if (rowCount > showCount) {
			
			if(rowCount < (pageCount * showCount)) {
				for(var r = rowCount; r < (pageCount * showCount); r++) {
					$(this).append('<tr><td colspan="' + $(tableRows[0]).children().length + '">&nbsp;</td></tr>');
				}
				rowCount = (pageCount * showCount);
				tableRows = $(this).children();
			}

			var startNo = 0, endNo = showCount;

			// hide all rows, show startNo...endNo and set pageInfo
			tableRows.slice(0).hide();
			tableRows.slice(startNo, endNo).fadeIn();
		}
		
		if(masterTable)
			$('#PageInfo').text(pageNo + "/" + pageCount); // TODO: redesign - implement in containing html
		
		// set timer
		setInterval(
			function(){
				if (rowCount > showCount) {
					// shown rows go out with fadeOut
					tableRows.slice(startNo, endNo).fadeOut(500);
					
					// set new values for startNo and endNo
					if (endNo >= rowCount){
						startNo = 0; 
						endNo = showCount;
						pageNo = 1;
						// reload page
						
						if ((reloadFlag == true) && masterTable)
						{
							// alert('Reload!');
							window.location.reload(true);
						}
					}
					else{
						startNo = endNo;
						if ((endNo + showCount) > rowCount) endNo = rowCount;
						else endNo += showCount;
						pageNo++;
					}
					
					// next startNo...endNo show with fadeIn
					tableRows
						.slice(startNo, endNo)
						.delay(500)
						.fadeIn(500, function(){
							if(masterTable) {
								$('#PageInfo').text(pageNo + "/" + pageCount);
							}
						});				
				} else {
					if ((reloadFlag == true) && masterTable) {
						// TODO: redesign - implement in containing html
						// reload only the table instead of full page reload
						window.location.reload(true);
					}
				}
			}, newPageTime);
	}

	$(function(){
	
		var tabs = $('tbody');
		var tabMax = 0;
		var tabMaxI = 0;
		for(var i=0; i<tabs.length; i++) {
			if(tabMax < $(tabs[i]).children().length) {
				tabMax = $(tabs[i]).children().length;
				tabMaxI = i;
			}
		}

		for(var i=0; i<tabs.length; i++) {
			$(tabs[i]).scrollUp(tabMaxI == i);
		}
		
		// set timer for reload flag
		setInterval(
			function(){
				reloadFlag = true;
			}, 
			1*60*1000
		);
	})
	
