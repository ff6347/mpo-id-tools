/*
 move-textframes-toback.coffee

 // Copyright (c)  2013
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
*/


/*
  Taken from ScriptUI by Peter Kahrel
  @usage
  var progress_win = new Window ("palette");

  var progress = progress_bar(progress_win, 100, 'my Progress');

        progress.value = i++;
        progress.parent.close();
        #important close it!!

  @param  {Palette} w    the palette the progress is shown on
  @param  {Number} stop [description]
  @return {Progressbar}      [description]
*/


(function() {
  var main, pbar;

  pbar = function(w, stop, labeltext) {
    var txt;
    txt = w.add('statictext', void 0, labeltext);
    pbar = w.add("progressbar", void 0, 1, stop);
    pbar.preferredSize = [300, 20];
    w.show();
    return pbar;
  };

  main = function() {
    var doc, e, i, item, items, pg, progress, progress_win, _i, _ref;
    doc = app.activeDocument;
    if (doc === null) {
      alert("no document");
      return;
    }
    pg = doc.layoutWindows[0].activePage;
    items = pg.pageItems;
    progress_win = new Window("palette");
    progress = pbar(progress_win, items.length, 'Moving Text to the back');
    for (i = _i = 0, _ref = items.length; _i <= _ref; i = _i += 1) {
      item = items[i];
      try {
        if (item.getElements()[0] instanceof TextFrame) {
          item.sendToBack();
        }
      } catch (_error) {
        e = _error;
      }
      progress.value = i++;
    }
    return progress.parent.close();
  };

  main();

}).call(this);