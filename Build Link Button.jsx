/*
written by fabiantheblind 4 JM-2011
*/
#include "./meta/glue code.jsx";
var obj = new Object();

obj.DEBUG = false;
obj.WARNINGS = true;
main();
function main() {

	var d;
	// test for a doc
	try { var d = app.activeDocument; } catch(e){
	if(obj.WARNINGS) alert("No no no, you have no document.\nMaybe you should drink some coffee");
		return;
		}
			
	
	var myItemsList = new Array;
	var myList;
	var myPageName;
	var myPage;
	try{
	d.paragraphStyles.item("ERROR").appliedFont = "Arial";
	}catch(e){
	
	}
	myList = d.pages.everyItem().name;

	try{
	var myItemsListElement =  d.xmlElements.item(0).xmlElements.item("itemsList");
	}catch(e){
	if(obj.WARNINGS) alert("You need to import an xml with the importer");
		return;
	}
	try{
		
		for (var i =0 ;i < myItemsListElement.xmlElements.length;i++){
			myItemsList[i] = myItemsListElement.xmlElements.item(i).markupTag.name;	
		}
			
	}catch(e){
		
	if(obj.WARNINGS) alert("you have no xml structure.\nuse the MPO_Importer");
		return;
		
	}

	
	myUI(d, myPage,myPageName, myList,myItemsList);



}

function myGetColumns(dument, myPage){
	var myPageWidth = dument.documentPreferences.pageWidth;
	var myPageHeight = dument.documentPreferences.pageHeight
	var myPageColumnCount= myPage.marginPreferences.columnCount;
	var myPageColumnGutterWidth= myPage.marginPreferences.columnGutter;

	var myX1 = myPage.marginPreferences.left;
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myX1
		+((myPageWidth-myPage.marginPreferences.left
		-myPage.marginPreferences.right
		-(myPageColumnGutterWidth* (myPageColumnCount-1))) /myPageColumnCount);
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}


function myGetBounds(dument, myPage){
	var myPageWidth = dument.documentPreferences.pageWidth;
	var myPageHeight = dument.documentPreferences.pageHeight
	if(myPage.side == PageSideOptions.leftHand){
		var myX2 = myPage.marginPreferences.left;
		var myX1 = myPage.marginPreferences.right;
	}
	else{
		var myX1 = myPage.marginPreferences.left;
		var myX2 = myPage.marginPreferences.right;
	}
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myPageWidth - myX2;
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}


function placeData(d , myPage , theItem){
	var myRuleSet = new Array(new makeButton(theItem, myPage, d));
	with(d){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
	
	
}


function makeButton(theItem, myPage, d){
	if(obj.DEBUG) alert("DEBUG1: " + theItem + " in makeButton.\nlength of the item: "+theItem.length );
	
	this.name = "placeButtons";
	this.xpath = "//artikel[@iArtikelNr='Art-Nr. " + theItem + "']";
	this.apply = function(myElement, myRuleProcessor){
	
		var myGroup = new Array;
		var myNullObjStyle = d.objectStyles.item(0);
		var myPriceObjStyle = d.objectStyles.item("PREIS_schatten");

		var myTempBounds = new Array;
		myTempBounds = myGetColumns(d, myPage);
		var myY1 = myTempBounds[0];
		var myX1 = myTempBounds[1];
		var myY2 = myTempBounds[2];
		var myX2 = myTempBounds[3];
		var myImages = myElement.xmlElements.item("images");

		
		
		var OY1 = 19;//myY1 + 7.5;
		var OX1 = 19.5;//myX1 + 7.5 ;
		var OY2 = OY1 + 30;
		var OX2 = OX1 + 30;
		var myOV01 = myPage.ovals.add();
		
		set_label(myOV01,"Art-Nr. " + theItem);
		with (myOV01) {
			geometricBounds = [OY1, OX1 ,OY2 , OX2];
			applyObjectStyle(myNullObjStyle);	
		}
		try{
		var myString =  myImages.xmlElements.item(0).xmlAttributes.item(1).value;
		}catch(e){
			
			if(obj.WARNINGS) alert("there is no image available!");
			
			exit();
		}
		try {

		
		myOV01.place(File(checkOS(myString)));
		myOV01.fit(FitOptions.CENTER_CONTENT);
		myGroup.push(myOV01);
		} catch (e) {
			if(obj.WARNINGS) alert("there is no image available!");
			exit();
		}
		
		
		
		
		
		var RY1 = myY1;
		var RX1 = myX1;
		var RY2 = RY1 + 53.166;
		var RX2 = RX1 + 84.279;
				
		var myRect01 = myPage.rectangles.add();
		
				set_label(myRect01,"Art-Nr. " + theItem);
		with (myRect01) {
			geometricBounds = [RY1, RX1, RY2, RX2];
			applyObjectStyle(myNullObjStyle);
		}
		
		try{
		var myFile  = File.openDialog("Choose the File \"Button_Lupe_Hintergrund.bmp\"");
		if(!myFile){
			if(obj.WARNINGS) alert("Are you shure?\nWithout the \"Button_Lupe_Hintergrund.bmp\" it looooooooks sillyyyyyy"); 
			
		}
		myRect01.place(myFile);
		myRect01.fit(FitOptions.CENTER_CONTENT);
		//myRect01.fit(FitOptions.PROPORTIONALLY);
		myRect01.fit(FitOptions.FRAME_TO_CONTENT);

		myGroup.push(myRect01);
		}catch(e){
			
			
		}

		
		
		
		var TY1 = 18.861;
		var TX1 = 32.217;
		var TY2 = 100;
		var TX2 = myX2*2;
		
		
		
		var myTF01 = myPage.textFrames.add();
		if (obj.DEBUG) alert("DEBUG2: " + theItem + " in makeButton.\nlength of the item: "+theItem.length );
		
		set_label(myTF01,"Art-Nr. " + theItem);
		
		with (myTF01) {
			geometricBounds = [TY1, TX1, TY2, TX2];
			applyObjectStyle(myNullObjStyle);
			
		}
		
		//var myContentElement = myElement.xmlElements.add("buttontext");
		
		//myContentElement.insertTextAsContent("Dazu passt:\n", XMLElementPosition.elementStart);
		var myContentString = "Dazu passt:"+"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iHersteller").contents +"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iArtikelBezeichnung").contents +"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iArtikelBeschreibung").contents +"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iArtikelNr").contents +"\r"+
		"Dies und mehr findet Ihr auf Seite XXX";

		myTF01.contents = myContentString;

		
		myTF01.paragraphs.item(0).appliedParagraphStyle = d.paragraphStyles.item("BUTTON_Headline");
		myTF01.paragraphs.item(1).appliedParagraphStyle = d.paragraphStyles.item("BUTTON_Hersteller");
		myTF01.paragraphs.item(2).appliedParagraphStyle = d.paragraphStyles.item("BUTTON_Bezeichnung");
		myTF01.paragraphs.item(3).appliedParagraphStyle = d.paragraphStyles.item("BUTTON_Beschreibung");
		myTF01.paragraphs.item(4).appliedParagraphStyle = d.paragraphStyles.item("BUTTON_Artikelnummer");
		myTF01.paragraphs.item(5).appliedParagraphStyle = d.paragraphStyles.item("BUTTON_Unterzeile");
		myTF01.characters.everyItem().appliedCharacterStyle = d.characterStyles.item(0);
		myTF01.texts.everyItem().clearOverrides(OverrideType.all);

		myTF01.fit(FitOptions.FRAME_TO_CONTENT);
		myGroup.push(myTF01);

		var myNewPriceElement = myElement.xmlElements.item("preis").duplicate();
		
		var PY1 = 42.411;
		var PX1 = 28.729 ;
		var PY2 = PY1 + 50;
		var PX2 =  PX1 + 50;
		
		var myPF01 = myPage.textFrames.add();
		set_label(myPF01,"Art-Nr. " + theItem);
		
		with (myPF01) {
			geometricBounds = [PY1, PX1, PY2, PX2];
			applyObjectStyle(myPriceObjStyle);
			
		}
		myNewPriceElement.placeXML(myPF01);
		myNewPriceElement.untag();
		myPF01.paragraphs.item(0).appliedParagraphStyle = d.paragraphStyles.item("PREIS_KLEIN");
		myPF01.fit(FitOptions.FRAME_TO_CONTENT);

		
		
		myGroup.push(myPF01);
		
		
		myPage.groups.add(myGroup);
		
		
	}
	
}


/*
 * a function to check the operating system
 * 
 * @returns true if the OS is windows
 */
function checkOS(myString){
	var myOS = $.os;
	var myOSSubString = myOS.charAt(0);
	var myOSBoolean;
	if (myOSSubString == "w" || myOSSubString == "W") {
		myOSBoolean = true;
	}
	else {
		myOSBoolean = false;
	}

	if (myOSBoolean == true) {
		//this is for windows

		var myHREFString = myString;
		var myHREFSubString = myHREFString.substring(8);

		return myHREFSubString;
	
	} else {
		// this is for macintosh
		return myString;
	}

}

function myUI(d, myPage,myPageName, myList,myItemsList){
	var myNumOItems = 0;
	
	var myDialog = app.dialogs.add({name:"the Link Button", canCancel:true,minWidth:300});
	with(myDialog){
		//Add a dialog column.
		with(dialogColumns.add()){
			//Create a border panel.

				with(dialogRows.add()){
									staticTexts.add({
										staticLabel: "Article --> ",minWidth:125});
					//Create a pop-up menu ("dropdown") control.
					var myArtikelDropdown = dropdowns.add({
						stringList: myItemsList, selectedIndex: 0,minWidth:125 });
				
				}
			
			//Create another border panel.
				
					with (dialogRows.add()) {
						staticTexts.add({
							staticLabel: "To Page --> ",minWidth:125});

						//Create a pop-up menu ("dropdown") control.
						var myPageDropdown = dropdowns.add({
							stringList: myList,
							selectedIndex: 0, minWidth:125});
					}

						with(dialogColumns.add()){
						var gutter = staticTexts.add({staticLabel:"  ",minWidth:25});
					}
			

			
		}
	
	//Display the dialog box.
	if(myDialog.show() == true){
			myPageName =  myList[myPageDropdown.selectedIndex];
		
		var preTheItem = myItemsList[myArtikelDropdown.selectedIndex];
		var theItem = preTheItem.substring(4);
		if (obj.DEBUG) alert("DEBUG: "+ theItem);
		myDialog.destroy();
		
 		myPage = d.pages.item(myPageName);
		
		placeData(d,myPage,theItem);


		alert("Done");
	}else{
		
		myDialog.destroy();
		
	}

	}	  
}


function set_label(obj,str){
	try{
		
		obj.label = str;
		
	}catch(e){
		
		
	}
	
	
}