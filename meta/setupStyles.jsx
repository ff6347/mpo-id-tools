/**
 * this is for having some parstyxles
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

function makeParstylesArray(myDoc) {
	
	var myStyles = new Array();
	var myName;

	for(var count = 0 ;count < 13; count ++){
		try {
			myStyles[count] = myDoc.paragraphStyles.item("pSt" + count.toString());
			myName = myStyles[count].name;
		} catch (e) {
			//The style did not exist, so create it.
			myStyles[count] = myDoc.paragraphStyles.add( {
				name : "pSt" + count.toString()
			})
			with(myStyles[count]){
				appliedFont = "Arial";
				
			}
		}
	}
	return myStyles
}

function makeCharstylesArray(myDoc) {
	
	var myStyles = new Array();
	var myName;
	for(var count = 0 ;count < 13; count ++){
		try {
			myStyles[count] = myDoc.characterStyles.item("chSt" + count.toString());
			myName = myStyles[count].name;
		} catch (e) {
			//The style did not exist, so create it.
			myStyles[count] = myDoc.characterStyles.add( {
				name : "chSt" + count.toString()
			})
			with(myStyles[count]){
				appliedFont = "Arial";
				
			}
		}
	}
	return myStyles
}

function makeMetaStyle(myDoc){
	
	var myName;
	var myMetaStyle;
	var MetaParStyle;
	try {
		myMetaStyle = myDoc.characterStyles.item("ERROR");
		myName = myMetaStyle.name;
	} catch (e) {
		//The style did not exist, so create it.
		myMetaStyle = myDoc.characterStyles.add( {
			name : "ERROR"
		})
		with(myMetaStyle){
			appliedFont = "Arial";
			pointSize = 8;
			
			
		}
	}
		
		try {
			MetaParStyle = myDoc.paragraphStyles.item("ERROR");
			myName = MetaParStyle.name;
		} catch (e) {
			//The style did not exist, so create it.
			MetaParStyle = myDoc.paragraphStyles.add( {
				name : "ERROR"
			})
			with(MetaParStyle){
				appliedFont = "Arial";
				pointSize = 8;
				leading = 8;

				
				
			}
		
	
}
}