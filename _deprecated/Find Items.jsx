// this looks for script labels made by the importer
// just write in some code and run it
// Copyright (C) 2011 Fabian "fabiantheblind" Morón Zirfas
// http://www.the-moron.net
// info [at] the - moron . net

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/.

//alert($.fileName);

main();
function main () {
var d;
// test for a doc
try { var d = app.activeDocument; } catch(e){
	alert("No no no, you have no document.\nMaybe you should drink some coffee");
	return;
	}

	// mix your own black
try{
	c = myColorAdd( d, "ERROR", ColorModel.PROCESS, [0,100,100,0]);
}catch (e){
c = d.swatches.item("ERROR"); // this is THE MIXED BLACK	
}

// Create a list of swatches
var list_of_swatches = d.swatches.everyItem().name;

var api = d.allPageItems;
var list = new Array();
var strlist = new Array();
var target;
var choice;
var marker;
var select;
var rmvLabel;
var edit;
var editStr;

for( var i = 0; i < api.length; i++ ){
	
//	if( api[i].label.length > 1){
	list[i] = api[i].label;
//	}
	
}

strlist = eliminateDuplicates(list);
// remove the last item in the list
// it is from the objects without a label
strlist.pop();
strlist = sort_obj_names(strlist);
//alert(strlist);



// Make dialog box for selecting the swatch
var dlg = app.dialogs.add({name:"The Item Finder", canCancel:true});
with(dlg) {
	with(dialogColumns.add()){

			with(dialogRows.add()){
			//staticTexts.add({staticLabel:"Articles:"});
			}
			with(dialogRows.add()){
			var selected_item = dropdowns.add({stringList:strlist, selectedIndex:0});
			}
			with(dialogRows.add()){
			var addMarkerChkBx = checkboxControls.add({checkedState:true, staticLabel:"add marker 2 items?"});
			}
			// with(dialogRows.add()){
			// 		staticTexts.add({staticLabel: "              "});
			// 		}
			with(dialogRows.add()){
			var add2SelChkBx = checkboxControls.add({checkedState:false, staticLabel:"add items to selection?"});
			}
			with(dialogRows.add()){
			var delItemChkBx = checkboxControls.add({checkedState:false, staticLabel:"delete selected items?"});
			}
			with(dialogRows.add()){
			var rmvItemLblChkBx = checkboxControls.add({checkedState:false, staticLabel:"remove selected labels?"});
			}
			// with(dialogRows.add()){
			// 		staticTexts.add({staticLabel: "              "});
			// 		}
			with(dialogRows.add()){
			var addTagChkBx = checkboxControls.add({checkedState:false, staticLabel:"add new tag to selection?"});
			}

			with(dialogRows.add()){
			var txtEdit = textEditboxes.add({editContents:"", minWidth:170});
			}

			
			
			
		// 	with(dialogRows.add()){
		// 	var aGutter = staticTexts.add({staticLabel:"  ",minWidth:25});
		// 	}
		// 	with(dialogRows.add()){
		// 	staticTexts.add({staticLabel:"Marker Color:"});
		// 	}
		// 	with(dialogRows.add()){
		// 	// var ndx;
		// 	// 		var j = 0;
		// 	// 		while(j < list_of_swatches.length){
		// 	// 			if(list_of_swatches[j].match("ERROR")){
		// 	// 				ndx = j;
		// 	// 				break;
		// 	// 			}else{
		// 	// 				ndx = 0;
		// 	// 			}
		// 	// 		}
		// 	try{
		// 	var selected_swatch = dropdowns.add({stringList:list_of_swatches, selectedIndex:d.swatches.length - 2,minWidth:200});
		// }catch(e){
		// 	var selected_swatch = dropdowns.add({stringList:list_of_swatches, selectedIndex:1,minWidth:200});
		// 	
		// }
		// 	}
		}
			with(dialogColumns.add()){
			var gutter = staticTexts.add({staticLabel:"  ",minWidth:25});
		}
	}
		

	//Display the dialog box.
	if(dlg.show() == true){
		
		target = selected_item.stringList[selected_item.selectedIndex];
		choice = delItemChkBx.checkedState;
		marker = addMarkerChkBx.checkedState;
		select = add2SelChkBx.checkedState;
		rmvLabel = rmvItemLblChkBx.checkedState;
		edit = addTagChkBx.checkedState;
		editStr = txtEdit.editContents;
		
		dlg.destroy();
		
		//alert(target);
		var grp = new Array();
		for( var i = api.length-1; i > 0; i -- ){

			try{
			var theThing =  api[i];
			
			if((choice == true) && (api[i].label.match(target))){
			//list[i] = api[i].label;
			theThing.remove();
			continue;
			}else if ((choice == false) && (api[i].label.match(target))){
				
						if(marker){
						var ov = api[i].parent.ovals.add();
						set_label(ov, "_00 Finder Marker");
						var apigmb = api[i].geometricBounds;

						ov.geometricBounds = [apigmb[0],apigmb[1],apigmb[0]+13.23,apigmb[1]+13.23];
						ov.nonprinting = true;
						ov.fillColor = c;
						
						}
						if(rmvLabel){
						api[i].label = "";
						}
						if(select){
						api[i].select(SelectionOptions.ADD_TO);
							
						}
						if(marker && select){
							ov.select(SelectionOptions.ADD_TO);
							
							
						}
						
						if(edit && select){
							
							api[i].label  =  editStr;
							api[i].select(SelectionOptions.ADD_TO);
							
						}
						
					}
	
			
					}catch(e){};
			}// end of first for loop
			
			if(edit){
				for(var j = 0; j < app.selection.length; j++){
				try{
					app.selection[i].label = editStr;
					
				}catch(e){}
				
				}
			}
		}else{
		
		dlg.destroy();
	}
	
}// end of main


//found here:
// http://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array
function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}


// color functions for definatly creating the right color

// found on http://bit.ly/h5EobK indisnip.wordpress.com ->
// how to apply:

// add CMYK color
//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);

// add RGB color
//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [33,66,99]);

// add HEX color
//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, "ABCDEF");

// add color directly
// add CMYK color to document
// and asign it to selected object
//app.selection[0].fillColor = myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);

function myColorAdd(myDocument, myColorName, myColorModel, myColorValue){
    if(myColorValue instanceof Array == false){
        myColorValue = [(parseInt(myColorValue, 16) >> 16 ) & 0xff, (parseInt(myColorValue, 16) >> 8 ) & 0xff, parseInt(myColorValue, 16 ) & 0xff ];
        myColorSpace = ColorSpace.RGB;
    }else{
        if(myColorValue.length == 3)
          myColorSpace = ColorSpace.RGB;
        else
          myColorSpace = ColorSpace.CMYK;
    }
    try{
        myColor = myDocument.colors.item(myColorName);
        myName = myColor.name;
    }
    catch (myError){
        myColor = myDocument.colors.add();
        myColor.properties = {name:myColorName, model:myColorModel, space:myColorSpace ,colorValue:myColorValue};
    }
    return myColor;
}


function set_label(obj,str){
	try{
		
		obj.label = str;
		
	}catch(e){
		
		
	}
	
	
}

function sort_obj_names (list)
  {
  var array = list;
  // array.shift (); array.shift (); array.shift ();  array.shift (); // exclude  [None], [Basic Graphics Frame], [Basic Text Frame], [Basic Grid]
  return array.sort (case_insensitive);
  }

function case_insensitive (a, b)
  {
  return a.toLowerCase() > b.toLowerCase()
  }