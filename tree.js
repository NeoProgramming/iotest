function hasClass(elem, className) 
{
	return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className)
}

function tree_toggle(event) 
{
	event = event || window.event
	var clickedElem = event.target || event.srcElement
	console.log('tree toggle: ', clickedElem);
	
	if (!hasClass(clickedElem, 'Expand')) 
		return;
	
	var node = clickedElem.parentNode
	if (hasClass(node, 'ExpandLeaf')) 
		return;

	var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
	var idstr = clickedElem.id;
	var idval = newClass == 'ExpandOpen' ? 1 : 0;
	console.log('set item: ', idstr, ' == ', idval);
	localStorage.setItem(idstr, idval);
		
	var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
	node.className = node.className.replace(re, '$1'+newClass+'$3')
}

function tree_init()
{
    var item = document.getElementById("globalxmltree");
    var aDivs = item.getElementsByTagName("li");
	console.log('tree init: ', aDivs);
    if (aDivs!=null) {	
        var i=0;
        for (i=0; i<aDivs.length; i++) {
			var citem = aDivs.item(i);
			var ch = citem.querySelector('.Expand')
			var id = ch.id;
			var st = localStorage.getItem(id);
			console.log("id == ", id, " st == ", st);           
            var newClass = st !=1 ? 'ExpandClosed' : 'ExpandOpen';
			var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
			citem.className = citem.className.replace(re, '$1'+newClass+'$3')
		}
    }
}
