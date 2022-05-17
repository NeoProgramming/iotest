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
	var idstr = node.id;
	localStorage.setItem(idstr, newClass == 'ExpandOpen' ? 1 : 0);
		
	// заменить текущий класс на newClass
	// регексп находит отдельно стоящий open|close и меняет на newClass
	var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
	node.className = node.className.replace(re, '$1'+newClass+'$3')
}

function tree_init()
{
    // инициализировать дерево в соответствии с куками
    
    var item = document.getElementById("globalxmltree");
    var aDivs = item.getElementsByTagName("li");
	console.log('tree init: ', aDivs);
    if (aDivs!=null) {	
        var i=0;
        for (i=0; i<aDivs.length; i++) {
            var id = aDivs.item(i).id;
			console.log("id == ", id);
            var name = id.substr(0,2);
            if(name == 'id') {
            	var st = localStorage.getItem(id);
            	var citem = document.getElementById(id);
            	if(citem) {
            	 	var newClass = st !=1 ? 'ExpandClosed' : 'ExpandOpen';
					var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
					citem.className = citem.className.replace(re, '$1'+newClass+'$3')
				}
			}
		}
    }
}
