/*
 * a quick whitener
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


main();
function main(){
	
var d;
// test for a doc
try { var d = app.activeDocument; } catch(e){
	alert("No no no, you have no document.\nMaybe you should drink some coffee");
	return;
	}

// the color

var c;
try{
	
	// mix your own black
c = myColorAdd( d, "MIXEDBLACK", ColorModel.PROCESS, [80,50,50,100]);
}catch (e){
c = d.swatches.item("MIXEDBLACK"); // this is THE MIXED BLACK	
}



for (var i = 0; i< app.selection.length; i++) {
	
	// check for bitmaps
	try { var myImg = app.selection[i].images.item(0); } catch (e) {}
	try { myImg.fillColor =  c; } catch (e) {}

		// polygons
		if( app.selection[i] instanceof Polygon ){
			try { app.selection[i].fillColor =  c; } catch (e) {}
			} // end polygon
			
		// textframes
		if( app.selection[i] instanceof TextFrame ){
			//alert("got a textframe");
			// if there is text in there
			if(app.selection[i].contents.length > 0){
				// alert("I have some text");
				try { var chrs = app.selection[i].characters.everyItem(); } catch (e) {}
				try { var prs = app.selection[i].paragraphs.everyItem(); } catch (e) {}
				try { chrs.fillColor = c; } catch (e) {}
				try { prs.ruleAboveColor  = c; } catch (e) {}
				try { prs.ruleBelowColor  = c;} catch (e) {}
			}else{
				app.selection[i].fillColor = c;
			}
		} // end textframes

		// check for rectangles
		if( app.selection[i] instanceof Rectangle ){
			// alert("Juhu i have a rectangle");
			app.selection[i].fillColor = c;
		}

		// check for ovals
		if( app.selection[i] instanceof Oval ){
			// alert("Juhu i have a rectangle");
			app.selection[i].fillColor = c;
		}
		
}

alert("done");
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