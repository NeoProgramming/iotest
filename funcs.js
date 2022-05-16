
function getCookie(name) 
{
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

function setCookie (name, value, expires, path, domain, secure) 
{
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function treeShowLevel(item, itemtrig)
{
	item.style.display = "";
      	itemtrig.src = "./pics/stree/open.gif";
      	//setCookie(
}

function treeHideLevel(item, itemtrig)
{
	item.style.display = "none";
      	itemtrig.src = "./pics/stree/close.gif";
}

function ShowOrHideCat(idtrig,idstr) 
{
  // аргументы: idtrig - идентификатор триггера (+-)
  //            idstr  - идентификатор каталога (там где содержимое дерева)
  var a = new Array;
  var item;
  var itemtrig = document.getElementById(idtrig);
  
  // получение элемента item по его идентификатору 	
  item = null;
  if (document.getElementById) 
  {
    	item = document.getElementById(idstr);
  } 
  else if (document.all) 
  {
    	item = document.all[idstr];
  }
  
   // отображение или скрытие элемента
   if (item) 
   {
  	//alert(idstr);
    	if (item.style.display == "none")
    	{ 
      		treeShowLevel(item, itemtrig);
      		setCookie(idstr, "1");
      	//	alert("set " + idstr + " to 1");
    	} 
    	else 
    	{
      		treeHideLevel(item, itemtrig);
      		setCookie(idstr, "0", "Mon, 01-Jan-2101 00:00:00 GMT", "/");
      	//	alert("set " + idstr + " to 0");
    	}
    }
}
/*
function InitTree(idstr)
{
	// рекурсивно инициализировать уровень дерева в соответствии с куками
	
	alert("initTree");
	
    var item = document.getElementById(idstr);
    var aDivs = item.getElementsByTagName("DIV");
    if (aDivs!=null) 
    {	
    	// работает даже без рекурсии!
    	//alert(aDivs.length);
        var i=0;
        for (i=0; i<aDivs.length; i++) 
   	{
   	    //  aDivs.item(i).style.display = '';
            var id = aDivs.item(i).id;
            
            //alert(">>> "+id);
            // если это 'cat'
            var name = id.substr(0,3);
            if(name == 'cat')
            {
            	var num = id.substr(3,id.length);
            //	alert("read " + id);
            	
            	var st = getCookie(id);
            //	alert("read " + id + " readed " + st);
            	
            	var citem = document.getElementById(id);
            	var titem = document.getElementById("trig"+num);
            	
            	if(citem && titem)
            	{
            	    if(st==1)
            	        treeShowLevel(citem, titem);
            	    else
                        treeHideLevel(citem, titem);
               	}
            }
   	}
    }
}
*/


