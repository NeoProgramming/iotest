function tree_toggle(event) 
{
	//alert('tree toggle');

	event = event || window.event
	var clickedElem = event.target || event.srcElement

	if (!hasClass(clickedElem, 'Expand')) {
		return // клик не там
	}

	// Node, на который кликнули
	var node = clickedElem.parentNode
	if (hasClass(node, 'ExpandLeaf')) {
		return // клик на листе
	}

	// определить новый класс для узла
	var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
	
	// у нас есть элемент node; пишем в куки новое состояние
	var idstr = node.id;
	
	//alert(idstr);
	
	if(newClass == 'ExpandOpen')
	{
		setCookie(idstr, "1");
	}
	else
	{
		setCookie(idstr, "0");
	}
	
	// заменить текущий класс на newClass
	// регексп находит отдельно стоящий open|close и меняет на newClass
	var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
	node.className = node.className.replace(re, '$1'+newClass+'$3')
}


function hasClass(elem, className) 
{
	return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className)
}

function tree_init()
{
    // инициализировать дерево в соответствии с куками
    //alert('tree init');
    var item = document.getElementById("globalxmltree");
    var aDivs = item.getElementsByTagName("li");
    if (aDivs!=null) 
    {	
    	//alert(aDivs.length);
    	
        var i=0;
        for (i=0; i<aDivs.length; i++) 
   	{
   	    // получаем идентификатор элемента
            var id = aDivs.item(i).id;
            
            //alert(id);
            
            var name = id.substr(0,2);
            if(name == 'id')
            {
            	
            	var st = getCookie(id);
            //	alert(id + " == " + st);	// id1 = 0, id2 = null etc.
            	
            	var citem = document.getElementById(id);
            	if(citem)
            	{
            	 	var newClass = st !=1 ? 'ExpandClosed' : 'ExpandOpen';
           		var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
			citem.className = citem.className.replace(re, '$1'+newClass+'$3')
		}
            }
   	}
    }
}
