// Copyright (c)  2013
// Swaps the position of two selected pageitems
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// see also http://www.opensource.org/licenses/mit-license.php

(function (thisObj) {

  function getwidth(item) {
    return item.geometricBounds[3] - item.geometricBounds[1];
  }

  function getheight(item) {
    return item.geometricBounds[2] - item.geometricBounds[0];
  }

  function getX(item) {
    return item.geometricBounds[1];
  }

  function getY(item) {
    return item.geometricBounds[0];
  }


  function setposition(item, x, y, w, h) {
    item.geometricBounds = [y, x, y + h, x + w];
    fitimage(item);
  }

  function fitimage(item) {
    try {
      if (item.hasOwnProperty('images')) {
        if (item.images.length > 0) {
          item.fit(FitOptions.CENTER_CONTENT);
          item.fit(FitOptions.PROPORTIONALLY);
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  var main = function main() {
    var doc = app.activeDocument;
    if (doc === null) {
      alert("No document");
    } else {
      // alert("doc");
      var item1 = doc.selection[0];
      if (item1 === undefined) {
        alert("Please select 2 items");
        return;
      }

      if ((item1 instanceof Group) || (item1 instanceof TextFrame) || (item1 instanceof Polygon) ||
        (item1 instanceof Rectangle) || (item1 instanceof Oval) || (item1 instanceof GraphicLine)) {
        if (doc.selection.length > 2) {
          alert("Sorry cant swap more than 2 PageItems");
        } else if (doc.selection.length < 2) {
          alert("You need to select 2 items");
        } else {
          var item2 = doc.selection[1];
          var gb1 = item1.geometricBounds;
          var gb2 = item2.geometricBounds;
          var w1 = getwidth(item1);
          var h1 = getheight(item1);
          var w2 = getwidth(item2);
          var h2 = getheight(item2);
          var x1 = getX(item1);
          var x2 = getX(item2);
          var y1 = getY(item1);
          var y2 = getY(item2);
          setposition(item1, x2, y2, w1, h1);
          setposition(item2, x1, y1, w2, h2);

        }
      } else {
        alert("Sorry. I cant swap " + doc.selection[0].constructor.name);
      }
    }
  };

  main();

})(this);