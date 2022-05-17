"use strict";

// Fix back button cache problem
window.onunload = function () { };


(function sidebar() {
 //   var html = document.querySelector("html");
    var sidebar = document.getElementById("sidebar");
    var sidebarLinks = document.querySelectorAll('#sidebar a');
    var sidebarResizeHandle = document.getElementById("sidebar-resize-handle");
    var firstContact = null;
	
	var recentOffsetX = localStorage.getItem('recentSidebarPos');
	if(recentOffsetX < 20)
		recentOffsetX = 20;
	//document.documentElement.style.setProperty('--sidebar-width', recentOffsetX);
	console.log("function sidebar() start: ", recentOffsetX)

    sidebarResizeHandle.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
   //     html.classList.add('sidebar-resizing');
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
   //     html.classList.remove('sidebar-resizing');
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
		
		var pos = (e.clientX - sidebar.offsetLeft);
		
		console.log("stopResize: ", pos)
		localStorage.setItem('recentSidebarPos', pos);
		return true;
    }

    // Scroll sidebar to current active section
    var activeSection = document.getElementById("sidebar").querySelector(".active");
    if (activeSection) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        activeSection.scrollIntoView({ block: 'center' });
    }
})();

