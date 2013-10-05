// color_XXX.jsx
// this script changes the color of the selection to the disered swatch color
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
function main (){


	var doc;

		try {
		doc = app.activeDocument;

		} catch(e){
		alert("No no no, you have no document.\nMaybe you should drink some coffee");
		return;
		}


// Create a list of swatches
var list_of_swatches = doc.swatches.everyItem().name;

// Make dialog box for selecting the swatch
var dlg = app.dialogs.add({name:"Colorize", canCancel:true});
with(dlg) {
	with(dialogColumns.add()){

			with(dialogRows.add()){
			staticTexts.add({staticLabel:"Swatches:"});

			var selected_swatch = dropdowns.add({stringList:list_of_swatches, selectedIndex:0});
			}
		}
	}

	//Display the dialog box.
	if(dlg.show() == true){

		// the color
		// the selected colorswatch
		var c = doc.swatches.item(selected_swatch.selectedIndex);

    for (var i = 0; i < app.selection.length; i++) {

      // check for bitmaps
          var myImg;
      try {
        myImg = app.selection[i].images.item(0);

      } catch (e) {}
      try {
        myImg.fillColor = c;
        continue;
      } catch (e) {}

      // polygons
      if (app.selection[i] instanceof Polygon) {
        try {
          app.selection[i].fillColor = c;
          continue;
        } catch (e) {}
      } // end polygon

      // textframes
      if (app.selection[i] instanceof TextFrame) {
        //alert("got a textframe");
        // if there is text in there
        if (app.selection[i].contents.length > 0) {
          // alert("I have some text");
          var chrs, prs;
          try {
           chrs = app.selection[i].characters.everyItem();
          } catch (e) {}
          try {
            prs = app.selection[i].paragraphs.everyItem();
          } catch (e) {}
          try {
            chrs.fillColor = c;
            continue;
          } catch (e) {}
          try {
            prs.ruleAboveColor = c;
            // continue;
          } catch (e) {}
          try {
            prs.ruleBelowColor = c;
            continue;
          } catch (e) {}
        } else {
          app.selection[i].fillColor = c;
          continue;
        }
      } // end textframes

      // check for rectangles
      if (app.selection[i] instanceof Rectangle) {
        // alert("Juhu i have a rectangle");
        app.selection[i].fillColor = c;
      }

      // check for ovals
      if (app.selection[i] instanceof Oval) {
        // alert("Juhu i have a rectangle");
        app.selection[i].fillColor = c;
      }

    }


	}else{

		dlg.destroy();

	}
}
