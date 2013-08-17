/*
written by fabiantheblind 4 JM-2011
*/

// theNumbers.jsx
// this script makes some tiny numbers for the JM Layout
// it needs the font JM Bertram
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


main();
function main() {

	var doc;
	// test for a doc
	try { var doc = app.activeDocument; } catch(e){
		alert("No no no, you have no document.\nMaybe you should drink some coffee");
		return;
		}
			
	// var myList;
	// var myPageName;
	// var myPage ;
	var obj = new Object;
	obj.strings =  ["1","2","3","4","5","6","7","8","9","0","§","q","w","e","r","t","z","u","i","o","p","a","s","d","f","g","h","j","k","l"];
	
	obj.pgnames = doc.pages.everyItem().name;
	obj.pgn = "";
	myUI( doc , obj.pgn ,obj);



}

// this function builds the numbers
function makeNumbers(myDoc,myPage,theNumber,obj){
	var styleErrorWarning = false;
	var fontErrorWarning = false;
	
		var mySuperGroup = new Array;

	var myRY1 = 10+ 0.214;
	var myRX1 = 10 + 2.586 ;
	var myRY2 = myRY1 + 2.5;
	var myRX2 = myRX1 + 2.5;
	
	var myTFY1 = 10;
	var myTFX1 = 10;
	var myTFY2 = myTFY1 + 4.515;
	var myTFX2 = myTFX1 + 7.625;
	var theValue = 5;
	var theRow;
	var theItemCounter = 0;

	
	for(var i = 0; i < theNumber + 1; i++ ){
		
		if(theItemCounter < 10){
			theRow = 0;
			
		}else if(theItemCounter > 9 && theItemCounter < 20){
			theRow = 5;	
		}else {
			theRow = 10;
			
		}
		
		if(theItemCounter%10 == 0){
			theValue = 5;
			
		}
		
		
			var myGroup = new Array;
		var myRect =  myPage.rectangles.add();
	//	set_label(myRect,"Num: "+ theNumber + " Key: " + obj.strings[i]);
		myRect.applyObjectStyle( myDoc.objectStyles.item(0));
			with(myRect){
				geometricBounds = [myRY1 + theRow , myRX1 + theValue, myRY2 + theRow ,myRX2 + theValue];
				fillColor = myDoc.swatches.item(2);
				
			}
			
			
			myGroup.push(myRect);

			var myTF =  myPage.textFrames.add();
		//set_label(myTF,"Num: "+ i + " Key: " + obj.strings[i]);
			myTF.applyObjectStyle( myDoc.objectStyles.item(0));
			
			with(myTF){
				geometricBounds = [myTFY1+ theRow ,myTFX1 + theValue, myTFY2 + theRow ,myTFX2 + theValue];
				contents = obj.strings[i];
				try {
				paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("LAUFNUMMER_am_Bild"); 
				}catch(e){
					
				if(styleErrorWarning == false){
					alert("the Paragraphstyle \"LAUFNUMMER_am_Bild\" doesnot exist.\nIwill try to build the numbers by hand");
					styleErrorWarning = true;
					}
					paragraphs.everyItem().pointSize = "12pt";
					paragraphs.everyItem().justification = Justification.CENTER_ALIGN;
					paragraphs.everyItem().fillColor = myDoc.swatches.item(1);
				}
				
				try{
					
					paragraphs.everyItem().appliedFont = "JM Bertram Symbol";
					
				}catch(e){
					
					if(fontErrorWarning == false){
					alert("Sorry the Font \"JM Bertram Symbol\" does not exist. Sry");
					fontErrorWarning = true;
					}
				}
				
				theValue = theValue + 5;
			}
					myGroup.push(myTF);
			var myMetaGroup = myPage.groups.add(myGroup);
			// if you only make one numnber there is no super group
			try{ mySuperGroup.push(myMetaGroup); }catch(e){}
			
	theItemCounter++;
	}
	
	;
	try{myPage.groups.add(mySuperGroup);}catch(e){}


	
	
}

// this is the dialoge
// panels are nice but not that easy to debug.
// InDesign dialogs are prety fast

function myUI(myDoc,myPageName,obj){
	var myDialog = app.dialogs.add({name:"Make The Numbers", canCancel:true});
	with(myDialog){
		//Add a dialog column.
		with(dialogColumns.add()){
			//Create a row 
			with(dialogRows.add()){
				var txtNum = staticTexts.add({staticLabel:"Numbers--> ",minWidth:100});				
				var myNumberDropdown = dropdowns.add({
					stringList: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16",
					"17","18","19","20","21","22","23","24","25","26","27","28","29","30"], selectedIndex:0,minWidth:75
					});
				}
				
				// another row
				with(dialogRows.add()){
				var txtPg = staticTexts.add({staticLabel:"2 Page--> ",minWidth:100});
				var myPageDropdown = dropdowns.add({stringList: myDoc.pages.everyItem().name, selectedIndex: 0,minWidth:75 });
		}

		}
		with(dialogColumns.add()){
		var gutter = staticTexts.add({staticLabel:"  ",minWidth:25});
	}
	
	//Display the dialog box.
	if(myDialog.show() == true){

			myPageName = obj.pgnames[ myPageDropdown.selectedIndex ];
		//	myPageName =  myList[myPageDropdown.selectedIndex];

		var mySelectedNumber  = myNumberDropdown.selectedIndex;
		myDialog.destroy();
		
 		var p = myDoc.pages.item(myPageName);
		
		// call the numbers function
		makeNumbers(myDoc , p ,mySelectedNumber,obj);

	}else{

 myDialog.destroy(); alert("all that thinking for nothing? Better luck nexttime!");

 }

	}	  
}

function set_label(obj,str){
	try{
		
		obj.label = str;
		
	}catch(e){
		
		
	}
	
	
}