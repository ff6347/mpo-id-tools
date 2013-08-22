/*
 * written for JustMusic 2011
 *
 * @author fabiantheblind
 *
 *
 */
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

/**
 * This is the structure of the info object
 */
/*
           * {
           *   importid: 23344455556,
           *   artnr : "J01233445",
           *   type: "image",
           *    imagedata : {
           *    path:"",
           *    folder:""
           *    }
           * }
*/

// function Info (_current_import_id, _artnr, _type){
//   this.importid = _current_import_id;
//   this.artnr = _artnr;
//   this.type = _type;
//   this.imagedata = null;
//   function set_imagedata(_path, _folder){
//     var obj = {
//       "path":_path,
//       "folder":_folder
//     };
//     this.imagedata = obj;
//   }
// }


function prcs_countItems(myRoot){

  var myElement = myRoot.xmlElements.item(0).xmlElements.everyItem();

  return myElement.xmlElements.length -2;
}

// This is the main thing that gets called
function prcsXMLv02_placeData(myDoc, myPage, count, placeAllBool, focusBool, normalBool, smallBool,itemBool,theItem,myErrorLog,myLogFile){
  var itemCounter = 0;

  var myRuleSet = new Array(new prcs_getGroupData(myDoc,myPage,count,itemCounter, placeAllBool, focusBool, normalBool, smallBool,itemBool,theItem ,myErrorLog,myLogFile));
  // with(myDoc){
  var elements = myDoc.xmlElements;
  __processRuleSet(elements.everyItem(), myRuleSet);
  // }

}



function prcs_getXPath(xpathChoice ,errorLog, count){
  var xpath;
      if(xpathChoice.placeAll === true){
        xpath = "//artikel";
        errorLog = errorLog+ "selected the following elements(xPath) " + xpath.toString() + "\n";

      }

      if((xpathChoice.focus === true)){
          xpath = "//group[@id ='"+count+"']/focus/artikel[@iPrioritaet='fokus']";
          errorLog = errorLog+ "selected the following elements(xPath) " + xpath.toString() + "\n";
      }
      if((xpathChoice.normal ===true)){
          xpath = "//group[@id ='"+count+"']/normal/artikel[@iPrioritaet='normal']";
          errorLog = errorLog+ "selected the following elements(xPath) " + xpath.toString() + "\n";

        }
      if((xpathChoice.small === true)){
          xpath = "//group[@id ='"+count+"']/small/artikel[@iPrioritaet='klein']";
          errorLog = errorLog+ "selected the following elements(xPath) " + xpath.toString() + "\n";

        }

      if((xpathChoice.item === true)){
          xpath = "//artikel[@iArtikelNr='Art-Nr. "+xpathChoice.theItemNum +"']";
          errorLog = errorLog+ "selected the following elements(xPath) " + xpath.toString() + "\n";
        }

  return xpath;
}


function set_label(obj,str){
  try{

    obj.label = str;

  }catch(e){


  }


}
function prcs_getGroupDatav02(myDoc,myPage,count,itemCounter, placeAllBool, focusBool, normalBool, smallBool,itemBool,theItem,myErrorLog,myLogFile){

  this.name = "getGroupDatav02";

  // this holds the choices coming from the UI
  var xpathChoice = {};
  xpathChoice.placeAll = placeAllBool;
  xpathChoice.focus = focusBool;
  xpathChoice.normal = normalBool;
  xpathChoice.small = smallBool;
  xpathChoice.item = itemBool;
  xpathChoice.theItemNum = theItem;


  // select the xpath exprrssion
  this.xpath = prcs_getXPath(xpathChoice, myErrorLog, count);
  var metaData = {};
  metaData.scrptLabel = "";
  metaData.ArtNr = "";
  metaData.id = "";


}

/*
 * this is the RuleSet for makeAttributesFromInfo
 *
 * @returns nothing
 */
function prcs_getGroupData(myDoc,myPage,count,itemCounter, placeAllBool, focusBool, normalBool, smallBool,itemBool,theItem,myErrorLog,myLogFile){

  this.name = "getGroupData";

  // this holds the choices coming from the UI
  var xpathChoice = {};
  xpathChoice.placeAll = placeAllBool;
  xpathChoice.focus = focusBool;
  xpathChoice.normal = normalBool;
  xpathChoice.small = smallBool;
  xpathChoice.item = itemBool;
  xpathChoice.theItemNum = theItem;

  // select the xpath exprrssion
  this.xpath = prcs_getXPath(xpathChoice, myErrorLog, count);

  var metaData = {};
  metaData.scrptLabel = "";
  metaData.ArtNr = "";
  metaData.id = "";

  var myLine = 0;
  var myItemImgHeight = [];
  myItemImgHeight[0] = 40;
  myItemImgHeight[1] = 30;
//  myItemImgHeight[2] = 25;
//  myItemImgHeight[3] = 15;

  var myItemTxtHeight = [];
  myItemTxtHeight[0] = myItemImgHeight[0] + 20;
  myItemTxtHeight[1] = myItemImgHeight[1] + 20;
//  myItemTxtHeight[2] = myItemImgHeight[2] = + 20;
//  myItemTxtHeight[3] = myItemImgHeight[3] = + 20;

  var ULHeight = 20;

  var myLineHeight = [];
  myLineHeight[0] = myItemImgHeight[0] + myItemTxtHeight[0];

  var myLineController;
  var errorLog = myErrorLog;


    this.apply = function(myElement, myRuleProcessor){
      errorLog = errorLog+ "processing Element " + myElement.xmlAttributes.item("iArtikelNr").value.toString() + "\n";

      metaData.scrptLabel = myElement.xmlAttributes.item("iArtikelNr").value;
      metaData.ArtNr = metaData.scrptLabel;
      metaData.scp = myElement.xmlAttributes.item("iPrioritaet").value.toString();
      metaData.id = "";

      var id;
      var myParentGroup;
      if (placeAllBool === true){


        myParentGroup = myElement.parent.parent;
//        count = myElement.parent.parent.xmlAttributes.item("id").value;
        id = myElement.parent.parent.xmlAttributes.item("id").value;
        metaData.id = id;


      }else{


        myParentGroup = myElement.parent.parent;
        id = count;

      }
      var myItemsNum = myParentGroup.xmlElements.length;
      if(myItemsNum < 10){

        myLineController = 0;

      }else if((myItemsNum >10) &&( myItemsNum < 17)){

        myLineController = 1;
      }else{

      }

      var myColumnNum = myPage.marginPreferences.columnCount;
      var myLeftMargin = myPage.marginPreferences.left;
      var myRightMargin= myPage.marginPreferences.right;
      var myCGutterWidth = myPage.marginPreferences.columnGutter;
      var myPageWidth = myDoc.documentPreferences.pageWidth;

      var myOffset = myPageWidth - myLeftMargin - myRightMargin - myCGutterWidth; //*2  ;// - myCGutterWidth;

      var myGroup = [];
      var mySubGroup  = [];

      // tets where on the page we are
      try{
      var myTestFrame = myPage.rectangles.add();
      set_label(myTestFrame,"Delete Me");
      var myTestBounds = [];
      myTestBounds = prcs_myGetColumns(myDoc,myPage,itemCounter);

      var testTempY1 = (myTestBounds[0])+(myLine*myLineHeight[myLineController]);
      var testTempX1 = myTestBounds[1]-( myOffset*myLine);
      var testTempY2 = testTempY1 + myItemImgHeight[myLineController];
      var testTempX2 = myTestBounds[3]-( myOffset*myLine);

      myTestFrame.geometricBounds = [testTempY1,testTempX1,testTempY2,testTempX2];


      if(myTestFrame.geometricBounds[0] >= 300){

        myPage = myDoc.pages.add();
        itemCounter = 0;
        myLine = 0;

        //alert("made a new Page");

      }
      myTestFrame.remove();
      }catch(e){
        errorLog = errorLog + e.toString() + "\n";

      }




      var myImages = myElement.xmlElements.item("images");
      var myImgCounter;
       if(myImages.xmlElements.length > 4){
      myImgCounter = 4;

       }else{
         myImgCounter =  myImages.xmlElements.length;
       }

      for(var i = 0;i< myImgCounter; i++){
        var myImgFrame = myPage.rectangles.add();
        //set the Script label
        set_label(myImgFrame, metaData.scrptLabel);

        myImgFrame.appliedObjectStyle = myDoc.objectStyles.item(0);


        var myIMGBounds = [];
        myIMGBounds = prcs_myGetColumns(myDoc,myPage,itemCounter);


        var tempY1 = (myIMGBounds[0] +(i*10))+(myLine*myLineHeight[myLineController]);
        var tempX1 = myIMGBounds[1]-( myOffset*myLine);
        var tempY2 = tempY1 + myItemImgHeight[myLineController] -(i*(10));
        var tempX2 = myIMGBounds[3]-( myOffset*myLine);

        try{
          myImgFrame.geometricBounds = [tempY1,tempX1,tempY2,tempX2];// = myGetColumns(myDoc,myPage,itemCounter);
        }catch(e){

          myImgFrame.geometricBounds = [tempY1,tempY1,10,10];// = myGetColumns(myDoc,myPage,itemCounter);
          errorLog = errorLog + e.toString() + "\n";


        }

/**
 * 2013_08_21 - 22_22_13
 * This is where I have to look for the images placing. Error message is:
 * E/A-Fehler: Der Ordner "/Volumes/Users/fabiantheblind/Documents/_projects/just-music/jm-katalog-2014/katalog-workspace/files/7918_hkaudio/j0108335_01_n_1f62106b.jpg" kann nicht gefunden werden.
 */

        // try{
            var myString =  myImages.xmlElements.item(i).xmlAttributes.item(1).value;
            // alert(myString);
             // alert(File( myString.substring(8)).name);
            var info = new Info(id = 0,metaData.ArtNr ,"image");
            info.set_imagedata(myString.substring(8), "");
            myImgFrame.label = info.toSource();
            // myImgFrame.place( File( myString.substring(8)) );
            // myImgFrame.fit(FitOptions.CENTER_CONTENT);
            // myImgFrame.fit(FitOptions.PROPORTIONALLY);
            myGroup.push(myImgFrame);

        // }catch(e){
//            alert("WARNING! \r THERE IS  AN IMAGE MISSING! " +e );


            // myImgFrame.fillColor = myDoc.swatches.item(2);
            // myImgFrame.fillTint = 42;
            // errorLog = errorLog + e.toString() + "\n";
            // myGroup.push(myImgFrame);


          // }
        var myImgObjStyle  = myDoc.objectStyles.item("BILD_schatten");

        try{
        myImgFrame.applyObjectStyle(myImgObjStyle);
        }catch(e){

          alert("DEBUG: applyObjectstyle error");
          errorLog = errorLog + e.toString() + "\n";
        }
      } // end of images loop


      var myTextBounds = [];
      myTextBounds = prcs_myGetColumns(myDoc,myPage,itemCounter);
      var Y1 = myTextBounds[0] + myItemImgHeight[myLineController] +(myLine*myLineHeight[myLineController]);
      var X1 = myTextBounds[1]-( myOffset*myLine);
      var Y2 = Y1 + myItemTxtHeight[myLineController];
      var X2 = myTextBounds[3]-( myOffset*myLine);

      var myFrame = myPage.textFrames.add();

      //set the Script label
      set_label(myFrame, metaData.scrptLabel);

      var myNullObjStyle  = myDoc.objectStyles.item(0);
      try{
      myFrame.applyObjectStyle(myNullObjStyle);
      }catch(e){
        alert("DEBUG: applyObjectstyle error");
        errorLog = errorLog + e.toString() + "\n";


      }
      myFrame.geometricBounds = [Y1,X1,Y2,X2];//  myGetColumns(myDoc,myPage,itemCounter);
      var myTextContent = myElement.xmlElements.item("textPlatzieren").duplicate();

      myTextContent.placeXML(myFrame);
      myTextContent.untag();
      myGroup.push(myFrame);
      myFrame.paragraphs.item(0).remove();
      var myULBounds = [];
      myULBounds = prcs_myGetColumns(myDoc,myPage,itemCounter);
      var ULY1 = myULBounds[0] + myItemImgHeight[myLineController] +(myLine*myLineHeight[myLineController])+myItemTxtHeight[myLineController];
      var ULX1 = myULBounds[1]-( myOffset*myLine);
      var ULY2 = ULY1 + ULHeight;
      var ULX2 = myULBounds[3]-( myOffset*myLine);

      var myUlFrame = myPage.textFrames.add();

      //set the Script label
      set_label(myUlFrame, metaData.scrptLabel);

      myUlFrame.appliedObjectStyle = myDoc.objectStyles.item(0);
      try{
      myUlFrame.applyObjectStyle(myNullObjStyle);
      }catch(e){

        alert("DEBUG: applyObjectstyle error");
        errorLog = errorLog + e.toString() + "\n";
      }
      myUlFrame.geometricBounds = [ULY1,ULX1,ULY2,ULX2];//  myGetColumns(myDoc,myPage,itemCounter);
      var myULTextContent = myElement.xmlElements.item("artikelZeileANBPohneLN").duplicate();

      myULTextContent.placeXML(myUlFrame);
      myULTextContent.untag();
      myGroup.push(myUlFrame);


// From here on we have the meta objects like group colors and so on
//
//
//
//

      var myFocusText = myPage.textFrames.add();
      //set the Script label
      set_label(myFocusText, "meta: grp-" +metaData.id + " scp-"+ metaData.scp );
      try{
      myFocusText.applyObjectStyle(myNullObjStyle);
      }catch(e){

        alert("DEBUG: applyObjectstyle error");
        errorLog = errorLog + e.toString() + "\n";
      }
      myFocusText.geometricBounds =  [Y1-21,X1-1,Y1-12,X1+31];

      myFocusText.fillColor = myDoc.swatches.item(2);
      myFocusText.fillTint = 11;
      myFocusText.nonprinting = true;


      mySubGroup.push(myFocusText);

      var myGrText = myPage.textFrames.add();
      //set the Script label
      set_label(myGrText,  "meta: grp-" +metaData.id + " scp-"+ metaData.scp );
      myGrText.appliedObjectStyle = myDoc.objectStyles.item(0);
      try{
      myGrText.applyObjectStyle(myNullObjStyle);
      }catch(e){


        alert("DEBUG: applyObjectstyle error");
        errorLog = errorLog + e.toString() + "\n";
      }

      myGrText.geometricBounds =[Y1-20,X1,Y1-13,X1+30];
      myGrText.contents = id+". Gruppe"+"\n"+  myElement.xmlAttributes.item("iPrioritaet").value.toString();
      myGrText.nonprinting = true;
      try{
      myGrText.fillColor = myDoc.swatches.item("Gr_0" + id);
      }catch(e){

        alert("DEBUG: fillColor error");
        errorLog = errorLog + e.toString() + "\n";
      }
      myGrText.paragraphs.everyItem().characters.everyItem().appliedCharacterStyle = myDoc.characterStyles.item("ERROR");
      myGrText.paragraphs.everyItem().clearOverrides(OverrideType.all);
      mySubGroup.push(myGrText);

      var subMetaGroup = myPage.groups.add(mySubGroup);
      set_label(subMetaGroup, "meta: grp-" +metaData.id + " scp-"+ metaData.scp );
      var objGroup = null;
      try{
      objGroup = myPage.groups.add(myGroup);
      set_label(objGroup,metaData.scrptLabel);
      objGroup.sendToBack();
      }catch(e){
        errorLog = errorLog + e.toString() + "\n";
      }
      var finalGroup = [];
      finalGroup.push(subMetaGroup);
      if (objGroup !==  null ) {finalGroup.push(objGroup);}
      myPage.groups.add(finalGroup);
      set_label(finalGroup,metaData.scrptLabel);


      itemCounter++;
      if(itemCounter%myColumnNum===0){
        myLine++;

      }

//      write ErrorLog
      var myFile = myLogFile;
      var myData = errorLog;
      prcs_writeData (myFile, myData );
  };




}// end GroupData

/*
 * basic get columns needs an iterator
 */
function prcs_myGetColumns(myDoc, myPage,itemCounter){
  var pw = myDoc.documentPreferences.pageWidth;
  var ph = myDoc.documentPreferences.pageHeight;
  var pcc = myPage.marginPreferences.columnCount;
  var pcgw = myPage.marginPreferences.columnGutter;
  var tm = myPage.marginPreferences.top;
  var bm = myPage.marginPreferences.bottom;
  var lm =  myPage.marginPreferences.left;
  var rm = myPage.marginPreferences.right;
  var pcsw = pw - lm - rm - ( pcgw * ( pcc-1 ) );

  var pcw = pcsw / pcc;

//  alert(" a column has :"+pcw_2 + "mm");

  var myFocusHeight = (ph - tm - bm)/2;
  var myNormalHeight = (ph - tm - bm)/4;
  var mySmallHeight;

  if(pcc === 3){

//    alert("there are 3 colums");

  }else if(pcc === 4){


  }
    var myX1, myY1, myX2, myY2;


  if(itemCounter === 0){
    myX1 = lm;
  }else{
    myX1 = lm + ( ( pcw * itemCounter ) + ( pcgw * ( itemCounter ) ) );
  // alert("DEBUG: myX1--> " + myX1);
  }

  myY1 = tm;

  myX2 = myX1 + ((pw - lm - rm -( pcgw * (pcc-1))) / pcc);


  myY2 = ph - bm;

//  alert("top "+tm+" Left "+lm+" bottom "+bm+" right "+rm);
//  return[tm,lm,bm,rm];
  return [myY1, myX1, myY2, myX2];
}


/*
 * Set the xml import preferences
 */
function prcs_xmlImportPref(myDoc){

  myXMLImportPreferences = myDoc.xmlImportPreferences;
  myXMLImportPreferences.allowTransform = false;
  myXMLImportPreferences.createLinkToXML = false;
  myXMLImportPreferences.ignoreUnmatchedIncoming = false;
  myXMLImportPreferences.ignoreWhitespace = false;
  myXMLImportPreferences.importCALSTables = false;
  myXMLImportPreferences.importStyle = XMLImportStyles.mergeImport;
  myXMLImportPreferences.importTextIntoTables = false;
  myXMLImportPreferences.importToSelected = false;
  myXMLImportPreferences.removeUnmatchedExisting = false;
  myXMLImportPreferences.repeatTextElements = false;
}


/*
 * this makes attributes from the element artikelInformation
 *
 * @param myDoc
 * @returns nothing
 */
function prcs_makeAttributesFromInfo(myDoc){

  var myRuleSet = new Array(new prcs_findInfoElement () ,new prcs_makeGroups());
  // with(myDoc){
  var elements = myDoc.xmlElements;
  __processRuleSet(elements.everyItem(), myRuleSet);

  // }
}

/*
 * this is the RuleSet for makeAttributesFromInfo
 *
 * @returns nothing
 */
function prcs_findInfoElement(){
  this.name = "findInfoElement";
  this.xpath = "/Root/seite/artikel/artikelInformation";
  this.apply = function(myElement, myRuleProcessor){
    var myItem;
      for(var i = 0; i < myElement.xmlElements.length; i++){

      myItem= myElement.xmlElements.item(i);

      myElement.parent.xmlAttributes.add(myItem.markupTag.name, myItem.texts.item(0).contents);
      }
    };

}


function prcs_placeAllTables(myDoc,myNewPage,count){
  var itemCounter=0;
  var myRuleSet = new Array(new prcs_findTables(myDoc,myNewPage,count,itemCounter));
  // with(myDoc){
  var elements = myDoc.xmlElements;
  __processRuleSet(elements.everyItem(), myRuleSet);

  // }
}

/*
 * this is the RuleSet for makeAttributesFromInfo
 *
 * @returns nothing
 */
function prcs_findTables(myDoc,myNewPage,count,itemCounter){
  this.name = "findTables";
  if(count ===10){
      this.xpath = "//tabelleGruppe"+count.toString();
  }else{
      this.xpath = "//tabelleGruppe0"+count.toString();
  }
  this.apply = function(myElement, myRuleProcessor){
    __skipChildren(myRuleProcessor);
    var mySubGroup = [];


    var Y1 = 0+(itemCounter*23);
    var X1 = 0+ (count*23);
    var Y2 =  Y1 + 50;
    var X2 =X1 + 123;
    var myFrame = myNewPage.textFrames.add();
    set_label(myFrame,"table: grp-" + count );
//    myFrame.appliedObjectStyle = myDoc.objectStyles.item(0);
    var myNullObjStyle  = myDoc.objectStyles.item(0);
    try{
    myFrame.applyObjectStyle(myNullObjStyle);
    }catch(e){

    alert("DEBUG: applyObjectstyle error");
    errorLog = errorLog + e.toString() + "\n";
    }
    myFrame.geometricBounds = [Y1,X1,Y2,X2];
    var myTextContent = myElement.duplicate();
    myFrame.placeXML(myTextContent);
    myTextContent.untag();
    if((myElement.parent.markupTag.name.toString() === "tabelleMitLN")||
        (myElement.parent.markupTag.name.toString() === "tabelleMinimalMitLN")){
      myFrame.paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("TABELLE_mit_LN");

    }else{
      myFrame.paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("TABELLE_ohne_LN");


    }


    var myFocusText = myNewPage.textFrames.add();
    set_label(myFocusText,"table: grp-"+count + " scp-focus");
    myFocusText.geometricBounds  = [Y1,X1,Y2-20,X2-100];
    myFocusText.texts.everyItem().appliedCharacterStyle = myDoc.characterStyles.item("ERROR");
    myFocusText.paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("ERROR");

    myFocusText.fillColor = myDoc.swatches.item(2);
    myFocusText.fillTint = 11;
    myFocusText.nonprinting = true;
    mySubGroup.push(myFocusText);

    var myGrText = myNewPage.textFrames.add();
    set_label(myGrText,"table: grp-"+count);

    myGrText.geometricBounds  = [Y1+1,X1+1,Y2-1-20,X2-1-100];
    myGrText.contents = count+". Gruppe"+"\n" + myElement.parent.markupTag.name.toString();
    myGrText.nonprinting = true;
    myGrText.fillColor = myDoc.swatches.item("Gr_0" + count);
    myFocusText.texts.everyItem().appliedCharacterStyle = myDoc.characterStyles.item("ERROR");
    myFocusText.paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("ERROR");

    mySubGroup.push(myGrText);

    var mySubMetaGroup = myNewPage.groups.add(mySubGroup);

    var myGroup = [];

    myGroup.push(mySubMetaGroup);
    myGroup.push(myFrame);
    myNewPage.groups.add(myGroup);

    itemCounter++;
    };

}
/*
 * this is the function prcs_for makeGroupElements
 *
 * @returns
 */
function prcs_makeGroups(){
  this.name = "makeGroups";
  this.xpath = "/Root/seite";
  this.apply = function(myElement, myRuleProcessor){

      for(var i = 10; i >= 0; i--){
      var myNewGroupElement = myElement.xmlElements.add("group");
      myNewGroupElement.xmlAttributes.add("id",i.toString());
      myNewGroupElement.xmlElements.add("small");
      myNewGroupElement.xmlElements.add("normal");
      myNewGroupElement.xmlElements.add("focus");
      myNewGroupElement.move(LocationOptions.AT_BEGINNING,myElement);


      }
    };
}
/*
 *
 * @param myDoc
 * @returns nothing
 */
function prcs_sortInGroupByPriority(myDoc){

  var myRuleSetSmall = new Array(new prcs_sortSmall());
  // with(myDoc){
  var elements_small = myDoc.xmlElements;
  __processRuleSet(elements_small.everyItem(), myRuleSetSmall);
  // }

  var myRuleSetNormal = new Array(new prcs_sortNormal());
  // with(myDoc){
  var elements_normal = myDoc.xmlElements;
  __processRuleSet(elements_normal.everyItem(), myRuleSetNormal);
  // }

  var myRuleSetFocus = new Array(new prcs_sortFocus());
  // with(myDoc){
  var elements_focus = myDoc.xmlElements;
  __processRuleSet(elements_focus.everyItem(), myRuleSetFocus);
  // }
}
/*
 *
 * @returns nothing
 */
function prcs_sortFocus(){

  this.name = "sortFocus";
  this.xpath = "/Root/seite/group/artikel[@iPrioritaet ='fokus']";
  this.apply = function(myElement, myRuleProcessor){
    __skipChildren(myRuleProcessor);
    var myContainer = myElement.parent.xmlElements.item("focus");
    myElement.move(LocationOptions.AT_END,myContainer);

  };

}

function prcs_sortNormal(){
  this.name = "sortNormal";
  this.xpath = "/Root/seite/group/artikel[@iPrioritaet ='normal']";
  this.apply = function(myElement, myRuleProcessor){
    __skipChildren(myRuleProcessor);
    var myContainer = myElement.parent.xmlElements.item("normal");
    myElement.move(LocationOptions.AT_END,myContainer);
    };

}
function prcs_sortSmall(){
  this.name = "sortSmall";
  this.xpath = "/Root/seite/group/artikel[@iPrioritaet ='klein']";
  this.apply = function(myElement, myRuleProcessor){
    __skipChildren(myRuleProcessor);
    var myContainer = myElement.parent.xmlElements.item("small");
    myElement.move(LocationOptions.AT_END,myContainer);
    };

}


function prcs_sortGroups(myDoc){
  for (var i = 0 ; i < 11 ;i++ ){
  prcs_sortToGroupsByAttributes(myDoc,i);
  }
}
/*
 * reorganizes the xmlStructure in element <seite> to groups
 *
 * @param myDoc
 * @param count
 * @returns
 */

function prcs_sortToGroupsByAttributes(myDoc,count){

    var myRuleSet = new Array(new prcs_findGroupAttribute(count));
    // with(myDoc){
    var elements = myDoc.xmlElements;
    __processRuleSet(elements.everyItem(), myRuleSet);

  // }
}

/*
 * moves the grouped items into a new xmlElement needed for
 * sortToGroupsByAttributes(myDoc,count) needs the for loop to process
 *
 * @param count
 * @returns
 */
function prcs_findGroupAttribute(count){

  this.name = "findGroupAttribute";
  this.xpath = "/Root/seite/artikel[@iGruppenFarbe ='"+count+". Gruppenfarbe']";
  this.apply = function(myElement, myRuleProcessor){
    __skipChildren(myRuleProcessor);
    myElement.move(LocationOptions.UNKNOWN,myElement.parent.xmlElements.item(count));
    };

}


function prcs_makeItemList(myDoc){
    var myItemsListElement = myDoc.xmlElements.item(0).xmlElements.add("itemsList");
    var myItemCounter = 0;
    var myRuleSet = new Array(new prcs_findItem(myDoc,myItemsListElement,myItemCounter));
    // with(myDoc){
    var elements = myDoc.xmlElements;
    __processRuleSet(elements.everyItem(), myRuleSet);

  // }
}

/*
 * moves the grouped items into a new xmlElement needed for
 * sortToGroupsByAttributes(myDoc,count) needs the for loop to process
 *
 * @param count
 * @returns
 */
function prcs_findItem(myDoc,myItemsListElement,myItemCounter){

  this.name = "findItem";
  this.xpath = "//artikel";
  this.apply = function(myElement, myRuleProcessor){

    var myItemsID = myElement.xmlAttributes.item("iArtikelNr").value;
    var mySubId = myItemsID.substring(8);
    //alert(mySubId);
    //exit();
    var myId = myItemsListElement.xmlAttributes.add("Art_"+ mySubId, myItemsID);
    myId.convertToElement();

    myItemCounter ++;
    };

}
function prcs_findGroupAttributeNone(){

  this.name = "findGroupAttribute";
  this.xpath = "/Root/seite/artikel[@iGruppenFarbe ='']";
  this.apply = function(myElement, myRuleProcessor){
    __skipChildren(myRuleProcessor);
    myElement.move(LocationOptions.UNKNOWN,myElement.parent.xmlElements.item(0));
    };

}



/*
 * this makes new elements for grouping all the <artikel> elements
 *
 * @param myDoc
 * @returns
 */
function prcs_makeImgElement(myDoc){
  var myRuleSet = new Array(new prcs_makeImgContainer(),new prcs_findMoveImages());
  // with(myDoc){
  var elements = myDoc.xmlElements;
  __processRuleSet(elements.everyItem(), myRuleSet);
  // }


}
/*
 * this is the function prcs_for makeGroupElements
 *
 * @returns
 */
function prcs_makeImgContainer(){
  this.name = "makeImgElement";
  this.xpath = "//artikel";
  this.apply = function(myElement, myRuleProcessor){
    var imgElement = myElement.parent.xmlElements.add("images");
    imgElement.move(LocationOptions.AT_BEGINNING,myElement);

    };

}
/*
 * this is the function prcs_for makeGroupElements
 *
 * @returns
 */
function prcs_findMoveImages(){
  this.name = "findMoveImages";
  this.xpath = "//artikel/bild";
  this.apply = function(myElement, myRuleProcessor){
    __skipChildren(myRuleProcessor);
    var imgElement = myElement.parent.xmlElements.item("images");
    myElement.move(LocationOptions.AT_END,imgElement);

    };
}



/*
 * a function prcs_to check the operating system
 *
 * @returns true if the OS is windows
 */
function prcs_checkOS(myString){
  var myOS = $.os;
  var myOSSubString = myOS.charAt(0);
  var myOSBoolean;
  if (myOSSubString === "w" || myOSSubString === "W") {
    myOSBoolean = true;
  }
  else {
    myOSBoolean = false;
  }

  if (myOSBoolean === true) {
    //this is for windows

    var myHREFString = myString;
    var myHREFSubString = myHREFString.substring(8);

    return myHREFSubString;

  } else {
    // this is for macintosh
    return myString;
  }

}

function prcs_placeAllPrices(myDoc){

    var myRuleSet = new Array(new prcs_findItemsNumber(myDoc));
    // with(myDoc){
    var elements = myDoc.xmlElements;
    __processRuleSet(elements.everyItem(), myRuleSet);

  // }
}

/*
 * moves the grouped items into a new xmlElement needed for
 * sortToGroupsByAttributes(myDoc,count) needs the for loop to process
 *
 * @param count
 * @returns
 */
function prcs_findItemsNumber(myDoc){

  this.name = "findItemsNumber";
  this.xpath = "//artikel";
  this.apply = function(myElement, myRuleProcessor){
//  __skipChildren(myRuleProcessor);


  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;
  //Set the find options.
  app.findTextPreferences = NothingEnum.nothing;
  app.changeTextPreferences = NothingEnum.nothing;
  //Search the document for the string "Text".
//  alert(myElement.xmlAttributes.item("iArtikelNr").value);
  var myTempArtNrString = myElement.xmlAttributes.item("iArtikelNr").value;
  var myArtNrString = myTempArtNrString.substring(8);
  app.findTextPreferences.findWhat = myArtNrString;
  //var Test = app.findGrepPreferences.findWhat = myArtNrString+"(.+\t)(\d*?.\d*?)(~=)";
  //alert(myDoc.findGrep());


  //Set the find options.
  app.findChangeTextOptions.caseSensitive = false;
  app.findChangeTextOptions.includeFootnotes = false;
  app.findChangeTextOptions.includeHiddenLayers = false;
  app.findChangeTextOptions.includeLockedLayersForFind = false;
  app.findChangeTextOptions.includeLockedStoriesForFind = false;
  app.findChangeTextOptions.includeMasterPages = false;
  app.findChangeTextOptions.wholeWord = false;


  var myPrice = myElement.xmlElements.item("preis").contents;

  //app.changeGrepPreferences.changeTo = myArtNrString+"$1"+myPrice+"$3";

  var FondItem = myDoc.findText();


  if(FondItem.length > 0){

  var myGeoBounds = [];

  myGeoBounds[0] =  FondItem[0].parent.textContainers[0].geometricBounds[0] -10;
  myGeoBounds[1]=  FondItem[0].parent.textContainers[0].geometricBounds[1];
  myGeoBounds[2]=  FondItem[0].parent.textContainers[0].geometricBounds[0];
  myGeoBounds[3]=  FondItem[0].parent.textContainers[0].geometricBounds[3];


  myPrice = FondItem[0].parent.textContainers[0].duplicate();
  set_label(myPrice,myTempArtNrString + " price");
  myPrice.geometricBounds = myGeoBounds;
  myPrice.paragraphs.everyItem().remove();
  var myPriceElement= myElement.xmlElements.item("preis").duplicate();

  myPriceElement.placeXML(myPrice);
  myPriceElement.untag();
  myPrice.bringToFront();


try {
    app.activeDocument.layers.item("Preise").locked = false;
} catch (e) {

}


try {
    myPrice.itemLayer = app.activeDocument.layers.item("Preise");
} catch (e) {

}


  var myPriceObjStyle  = myDoc.objectStyles.item("PREIS_schatten");
  myPrice.applyObjectStyle(myPriceObjStyle);
//  myPrice.appliedObjectStyle = myDoc.objectStyles.item("PREIS_schatten");
  myPrice.paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("PREIS");
  }
  app.findTextPreferences = NothingEnum.nothing;
  app.changeTextPreferences = NothingEnum.nothing;


    };

}
//---------- functions taken from RecordFindChange_CS3-CS5.jsx

function prcs_writeData (myFile , aData )
{
  var myResult;
   if( myFile !== '' )
   {
      //Open the file for writing.
      myResult = myFile.open( 'e', undefined, undefined );
   }
   if( myResult !== false )
   {
     myFile.seek(0);
      myFile.writeln( aData );
      myFile.close();
//      myFile.execute();
   }
}

