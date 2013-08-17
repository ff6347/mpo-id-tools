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
	if(obj.WARNINGS)	alert("No no no, you have no document.\nMaybe you should drink some coffee");
		return;
		}
		
		
	var myItemsList = new Array;
	var myList;
	var myPageName;
	var myPage;

	myList = d.pages.everyItem().name;

	try{
	var myItemsListElement =  d.xmlElements.item(0).xmlElements.item("itemsList");
	}catch(e){
		
	if(obj.WARNINGS)	alert("you have no xml structure.\nuse the MPO_Importer");
		return;
		
	}
	try{
	
	for (var i =0 ;i < myItemsListElement.xmlElements.length;i++){
		myItemsList[i] = myItemsListElement.xmlElements.item(i).markupTag.name;	
	}
	}catch(e){
		
	if(obj.WARNINGS)	alert("you have no xml structure.\nuse the MPO_Importer");
		return;
		
	}

	
	myUI(d, myPage,myPageName, myList,myItemsList);



}


function set_label(obj,str){
	try{
		
		obj.label = str;
		
	}catch(e){
		
		
	}
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
	var myRuleSet = new Array(new placeImages(theItem, myPage, d));
	with(d){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
	
	
}

function placeImages(theItem, myPage, d){
	this.name = "placeImages";
	this.xpath = "//artikel[@iArtikelNr='Art-Nr. "+theItem +"']";
	this.apply = function(myElement, myRuleProcessor){
	
	var myNullObjStyle  = d.objectStyles.item(0);

	var myImages = myElement.xmlElements.item("images");
	var myGroup = new Array;

	var myTempBounds = new Array;
	myTempBounds =  myGetColumns(d, myPage);
	var myY1 = myTempBounds[0];
	var myX1 = myTempBounds[1];
	var myY2 = myTempBounds[2];
	var myX2 = myTempBounds[3];
	if(obj.DEBUG) alert(myImages.xmlElements.length);
	
	if(!myImages.xmlElements.length){
		
	if(obj.WARNINGS) alert("Your Article has no referenced images");
	exit();
	}

	for (var i = 0; i<myImages.xmlElements.length ; i++){
	
	
		var myImgFrame = myPage.rectangles.add();

		set_label(myImgFrame, "Art-Nr. "+theItem);
		//myImgFrame.appliedObjectStyle = d.objectStyles.item(0);
	
	
				try{
						myImgFrame.geometricBounds = [myY1+(i*10),myX1,myY2+(i*10),myX2];

						var myString =  myImages.xmlElements.item(i).xmlAttributes.item(1).value;
						myImgFrame.place(File(checkOS(myString)));
						myImgFrame.fit(FitOptions.CENTER_CONTENT);
						myImgFrame.fit(FitOptions.PROPORTIONALLY);
						myImgFrame.fit(FitOptions.FRAME_TO_CONTENT);
						myImgFrame.applyObjectStyle(myNullObjStyle);

						myGroup.push(myImgFrame);

				}catch(e){
//						alert("WARNING! \r THERE IS  AN IMAGE MISSING! " +e );
					
						myImgFrame.geometricBounds = [myY1+(i*10),myX1,myY2+(i*10),myX2];
						myImgFrame.fillColor = d.swatches.item(2);
						myImgFrame.fillTint = 42;
						myGroup.push(myImgFrame);


					}


			}
			
		var myBG = myPage.rectangles.add();
		set_label(myBG, "Delete me");
		
		with(myBG){
		geometricBounds = [myY1,myX1,20,myX2];
		fillColor = d.swatches.item(1);
		applyObjectStyle(myNullObjStyle);

	}
		//	myBG.fit(FitOptions.FRAME_TO_CONTENT);
		
		//	myUlFrame.appliedObjectStyle = d.objectStyles.item(0);
		//	myUlFrame.applyObjectStyle(myNullObjStyle);

		var myTextFrame = myPage.textFrames.add();
		set_label(myTextFrame, "Delete me");
		myTextFrame.nonprinting = true;
		
	with(myTextFrame){
		geometricBounds = [myY1,myX1,myY2,myX2];
		applyObjectStyle(myNullObjStyle);
		if (myImages.xmlElements.length == 0) {
			contents = theItem + " has no images";	
		}
		else {
			contents = theItem;
		}

	}
	
	
		myTextFrame.paragraphs.everyItem().appliedParagraphStyle = d.paragraphStyles.item("ERROR");
		myTextFrame.paragraphs.everyItem().characters.everyItem().appliedCharacterStyle = d.characterStyles.item("ERROR");
		myTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
		myGroup.push(myBG);
		myGroup.push(myTextFrame);

		
		myPage.groups.add(myGroup);
		

			
		};

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
	
	var myDialog = app.dialogs.add({name:"PLACE ALL IMAGES", canCancel:true});
	with(myDialog){
		//Add a dialog column.
		with(dialogColumns.add()){
			//Create a border panel.



	
				var itemSelector = enablingGroups.add({staticLabel: "place item ",
				 checkedState: true,minWidth :250});
			with(itemSelector){
				with(dialogColumns.add()){
					//Create a pop-up menu ("dropdown") control.
					var myArtikelDropdown = dropdowns.add({
						stringList: myItemsList
						//selectedIndex:0
						});
				}
				}
			
			//Create another border panel.
				var pageSelector = enablingGroups.add({
					staticLabel: "choose page",
					checkedState: true,
			
				});
				with (pageSelector) {
				
					with (dialogColumns.add()) {
						staticTexts.add({
							staticLabel: "chose page to place"
						});
					}
					with (dialogColumns.add()) {
						//Create a pop-up menu ("dropdown") control.
						var myPageDropdown = dropdowns.add({
							stringList: myList,
							selectedIndex: 0
						});
					}
//					var myAddPage = checkboxControls.add({
//						staticLabel: "or create a new page"
//					//				checkedState: true	
//					});
				}
			

			
		}
	
	//Display the dialog box.
	if(myDialog.show() == true){


//		var myPage;
//		var myPageName;
//		page selector box
		if(pageSelector.checkedState!=true ){
			myPage = d.pages.add();
			myPageName = myPage.name;
		}else {
//			myPage = myList[myPageDropdown.selectedIndex];
			myPageName =  myList[myPageDropdown.selectedIndex];
		}

		var preTheItem = myItemsList[myArtikelDropdown.selectedIndex];
		if(obj.DEBUG) alert(preTheItem);
		var theItem = preTheItem.substring(4);

		myDialog.destroy();
		
 		myPage = d.pages.item(myPageName);
		
		placeData(d,myPage,theItem);



	}else{
		
		myDialog.destroy();
		if(obj.DEBUG) alert("all that thinking for nothing? Better luck nexttime!");
		
	}

	}	  
}