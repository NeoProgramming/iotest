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
	
	var node = clickedElem.parentNode;	// from <div class=Expand> to <li>
	if (hasClass(node, 'ExpandLeaf')) 
		return;

	var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
	var idstr = node.id;
	var idval = newClass == 'ExpandOpen' ? 1 : 0;
	console.log('set item: ', idstr, ' == ', idval);
	sessionStorage.setItem(idstr, idval);
		
	var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
	node.className = node.className.replace(re, '$1'+newClass+'$3')
}

function tree_init()
{
    var tree = document.getElementById("globalxmltree");
    var aListItems = tree.getElementsByTagName("li");
	console.log('tree init: ', aListItems);
    if (aListItems!=null) {	
        var i=0;
        for (i=0; i<aListItems.length; i++) {
			var citem = aListItems.item(i);
			var id = citem.id;
			var st = sessionStorage.getItem(id);
			console.log("id == ", id, " st == ", st);           
            var newClass = st !=1 ? 'ExpandClosed' : 'ExpandOpen';
			var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
			citem.className = citem.className.replace(re, '$1'+newClass+'$3')
		}
    }
}
