"use strict";

// Fix back button cache problem
window.onunload = function () { };
/*
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
}*/

(function sidebar() {
    var html = document.querySelector("html");
	console.log("html is ",  html ? "ok" : "null");
    var sidebar = document.getElementById("sidebar");
	console.log("sidebar is ", sidebar ? "ok" : "null");
    var sidebarResizeHandle = document.getElementById("sidebar-resize-handle");
	console.log("sidebarResizeHandle is ", sidebarResizeHandle ? "ok" : "null");
	var sidebarScrollbox = document.getElementById("sidebar-scrollbox");
	console.log("sidebarScrollbox is ", sidebarScrollbox ? "ok" : "null");
	
	var firstContact = null;
		
	// get params
	var recentOffsetX = sessionStorage.getItem('recentSidebarPos');
	var recentScrollY = sessionStorage.getItem('recentSidebarScrollPos');
	if(recentOffsetX==null || recentOffsetX < 20)
		recentOffsetX = 100;
	if(recentScrollY==null || recentScrollY<0)
		recentScrollY = 0;
	
	console.log("rx = ", recentOffsetX, " ry = ", recentScrollY);
	document.documentElement.style.setProperty('--sidebar-width', recentOffsetX);
	
//2	sidebarScrollbox.scrollTop = recentScrollY;

	// breaks!!!
    sidebarResizeHandle.addEventListener('mousedown', initResize);//, false);
	
//1	createScrollStopListener(sidebarScrollbox, function() {
//1		var scroll_pos = sidebarScrollbox.scrollTop;
//1		console.log("onScrollStop", scroll_pos);
//1		sessionStorage.setItem('recentSidebarScrollPos', scroll_pos);
//1   });
	
    function initResize(e) {
    //7    window.addEventListener('mousemove', resize, false);
    //7    window.addEventListener('mouseup', stopResize, false);
    //7    html.classList.add('sidebar-resizing');
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
    //    html.classList.remove('sidebar-resizing');
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
		
		var pos = (e.clientX - sidebar.offsetLeft);
		
		console.log("stopResize: ", pos)
		sessionStorage.setItem('recentSidebarPos', pos);
		return true;
    }

    // Scroll sidebar to current active section
//3    var activeSection = document.getElementById("sidebar").querySelector(".active");
//3    if (activeSection) {
//3        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
//3        activeSection.scrollIntoView({ block: 'center' });
//3    }
})();

