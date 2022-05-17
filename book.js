"use strict";

// Fix back button cache problem
window.onunload = function () { };

function createScrollStopListener(element, callback, timeout) {
    var handle = null;
    var onScroll = function() {
        if (handle) {
            clearTimeout(handle);
        }
        handle = setTimeout(callback, timeout || 200); // default 200 ms
    };
    element.addEventListener('scroll', onScroll);
    return function() {
        element.removeEventListener('scroll', onScroll);
    };
}

(function sidebar() {
    var html = document.querySelector("html");
    var sidebar = document.getElementById("sidebar");
    var sidebarResizeHandle = document.getElementById("sidebar-resize-handle");
	var sidebarScrollbox = document.getElementById("sidebar-scrollbox");
	var firstContact = null;
		
	// get params
	var recentOffsetX = sessionStorage.getItem('recentSidebarPos');
	var recentScrollY = sessionStorage.getItem('recentSidebarScrollPos');
	if(recentOffsetX==null || recentOffsetX < 20)
		recentOffsetX = 200;
	if(recentScrollY==null || recentScrollY<0)
		recentScrollY = 0;
	
	recentOffsetX = recentOffsetX + "px";
	console.log("rx = ", recentOffsetX, " ry = ", recentScrollY);
	document.documentElement.style.setProperty('--sidebar-width', recentOffsetX);
	
	sidebarScrollbox.scrollTop = recentScrollY;

	// breaks!!!
    sidebarResizeHandle.addEventListener('mousedown', initResize);//, false);
	
	createScrollStopListener(sidebarScrollbox, function() {
		var scroll_pos = sidebarScrollbox.scrollTop;
		console.log("onScrollStop", scroll_pos);
		sessionStorage.setItem('recentSidebarScrollPos', scroll_pos);
    });
	
    function initResize(e) {
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
        html.classList.add('sidebar-resizing');
		return true;
    }
	
	// visual resize
    function resize(e) {
        var pos = (e.clientX - sidebar.offsetLeft);

		pos = Math.min(pos, window.innerWidth - 100);
        document.documentElement.style.setProperty('--sidebar-width', pos + 'px');
		return true;
    }
	
    // on mouseup remove windows functions mousemove & mouseup
    function stopResize(e) {
        html.classList.remove('sidebar-resizing');
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
		
		var pos = (e.clientX - sidebar.offsetLeft);
		
		console.log("stopResize: ", pos)
		sessionStorage.setItem('recentSidebarPos', pos);
		return true;
    }
})();

