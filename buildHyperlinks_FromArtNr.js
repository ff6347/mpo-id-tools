// This script builds hyperlinks from what it found using a FC Query
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


// **************************************



//this is the FC Querie you need
// Save it under the name: "JM_ArtNr_only.xml"
/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Query>
<Header>
<Version major="5" minor="1">
</Version>
<Application value="Adobe InDesign">
</Application>
<QueryType value="Grep" qid="1">
</QueryType>
</Header>
<Description>
<FindExpression value="(?i)\d{6,7}|(?i)J\d{7}">
</FindExpression>
<ReplaceExpression value="">
</ReplaceExpression>
<FindChangeOptions>
<IncludeLockedLayers value="0">
</IncludeLockedLayers>
<IncludeLockedStories value="0">
</IncludeLockedStories>
<IncludeMasterPages value="0">
</IncludeMasterPages>
<IncludeHiddenLayers value="0">
</IncludeHiddenLayers>
<IncludeFootnotes value="1">
</IncludeFootnotes>
<KanaSensitive value="1">
</KanaSensitive>
<WidthSensitive value="1">
</WidthSensitive>
</FindChangeOptions>
<FindFormatSettings>
</FindFormatSettings>
<ReplaceFormatSettings>
<TextAttribute type="changecondmode" value="0">
</TextAttribute>
</ReplaceFormatSettings>
</Description>
</Query>
*/
// **************************************
// THE CODE

(function(thisObj){

var mh_data = {
  "hl" : [],
  "errNoDoc"  : "Please select an InDesign document",
  "errNoQuery"  : "You need to install the Grep Query \"JM_ArtNr_only.xml\"",
  "errHLsExist" : "Your document already has hyperlinks. Please open the 'Hyperlinks' panel and remove them first.",
  "noHLDebugMsg" : "There are no hyperlinks in this document. I will create them",
  "hlNum" : 0,
  "fcquery":"JM_ArtNr_only",
  "doc" : app.activeDocument,
  "scrptVersion" : 0.1,
  "buildHlsNum" : 0,
  "debug" : true
  };

main_script();

function main_script(){

// first check if there are all prerequisite

// check for the FC Query
  try{
    mh_data.query = app.loadFindChangeQuery (mh_data.fcquery, SearchModes.grepSearch);
  }catch(e){
    alert(mh_data.errNoQuery);
  return;
  }

// check for a active Document
  try{
  var td_name = mh_data.doc.name;
  }catch(e){
  alert(mh_data.errNoDoc);
  return;
  }

// check if there are already hyperlinks

  var user_decission = true;

  if(mh_data.doc.hyperlinks.length > 0){

    user_decission = remove_existing_hyperlinks_diag();

  }else{
    if (mh_data.debug === true) {
      alert(mh_data.noHLDebugMsg);
    }
  }

  if(user_decission === true){
    for(var i = mh_data.doc.hyperlinks.length-1; i >= 0; i-- ){
      mh_data.doc.hyperlinks.item(i).remove();
    }

    for(var j = mh_data.doc.hyperlinkURLDestinations.length-1; j >= 0; j-- ){
      mh_data.doc.hyperlinkURLDestinations.item(j).remove();
    }

    //alert(mh_data.doc.hyperlinkTextSources.toSource());
    for(var k = mh_data.doc.hyperlinkTextSources.length-1; k >= 0; k-- ){
      mh_data.doc.hyperlinkTextSources.item(k).remove();
    }
  }else {
  // alert(mh_data.errHLsExist);
  return;

    }

    // return;


/* ------------------------------------------------------------------------------------------------ */


  // unlock all layers
  var d  = mh_data.doc;
  d.layers.everyItem().locked = false;
  find(d);

  if(mh_data.debug === true){
    alert("I created "+mh_data.buildHlsNum+" hyperlinks in your document.\n" +
     "now export the pdf and check if they are right.\n"+
     "Remenber to check the HYPERLINKS checkbox in the export panel");
  }

}


function find(d){

  // empty out everythings hat still in ther FC Panel
  setFCopt();
  emptyFC();

  // load the query
  app.loadFindChangeQuery (mh_data.fcquery, SearchModes.grepSearch);

  // and get all its results into an array
  var result = d.findGrep();

  // some debugging stuff
  if(mh_data.debug === true)alert("I found " + result.length + " matches to the FC Query "+ mh_data.fcquery+".xml");

  // loop thru the results
  for(var i = result.length-1; i >=0 ; i--){

    // get the textcontent of what we found
    var aNr = result[i].contents;

      // this is the part of the text that will be the hyperlink
      // try{
      var hlTxtSrc = d.hyperlinkTextSources.add(result[i].lines[0]);

      // this is just for counting what happens
      mh_data.curHlsNum ++;

      // build the hyperlink
      str = "http://www.justmusic.de/"+ aNr;
      if(mh_data.debug){
      // this could be a debug thingy
      }
      //The destination of the hyperlink
      // try{
      var hlDst = d.hyperlinkURLDestinations.add({destinationURL:str});
      // the hyperlink
      var hl = d.hyperlinks.add({source:hlTxtSrc, destination:hlDst, highlight: HyperlinkAppearanceHighlight.NONE});
      // this is for the report at end
      // }catch(e){


      // }
      mh_data.buildHlsNum ++;
      // give the hyperlink a accurate name
      hl.name = aNr+"_"+i;
    // }catch(e){


    // }
        // if you are in debug mode you can see the hyperlinks in indesign and the PDF
    if(mh_data.debug === true){
      hl.visible = false;

    }else{
      hl.visible = false;
      }//close if else visible hyperlinks
    }// close i for loop
  } // close functio nfind


    //Set the find options.
    // we do this for every run of the find change
    // better that way!
function setFCopt(){

  app.findChangeGrepOptions.includeFootnotes = false;
  app.findChangeGrepOptions.includeHiddenLayers = true;
  app.findChangeGrepOptions.includeLockedLayersForFind = true;
  app.findChangeGrepOptions.includeLockedStoriesForFind = true;
  app.findChangeGrepOptions.includeMasterPages = false;

  }

  //Clear the find/change grep preferences.
  // also every run
function emptyFC(){

  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;


  }

function remove_existing_hyperlinks_diag () {

var diag                = new Window ("dialog","Remove hyperlinks");
     diag.preferredSize  =    {"width":250,"height":100};
// var pan                 = diag.add('group',undefined,'');
    // pan.orientation     ='column';
// var txt                 = pan.add('edittext',undefined,lic,{multiline:true,scrolling: false});
    // txt.preferredSize   =    {"width":440,"height":430};
// var btg                 =  pan.add ("group");
// var cbg                 = btg.add ("group");
    // cbg.alignment       = "left";
// var cb                  = cbg.add ("checkbox", undefined, "dont warn me again");
    // btg.orientation     = 'row';
    // btg.alignment       = "right";

    diag.add ("statictext", undefined, "There are already hyperlinks in your document.");
  diag.add ("statictext", undefined, "If you hit 'OK' I will remove and rebuild them!");

var pan                 = diag.add('group',undefined,'');
  pan.orientation     ='column';
  pan.alignment       = "right";


var btg                 =  pan.add ("group");

    btg.orientation     = 'row';
    btg.alignment       = "right";

    btg.add ("button", undefined, "OK");
    btg.add ("button", undefined, "cancel");

if (diag.show () === 1){
    return true;
  }else{
    return false;
  }
}

})(this);