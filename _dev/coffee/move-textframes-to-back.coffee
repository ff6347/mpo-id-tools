###
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

###

###
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

###
pbar = (w, stop, labeltext) ->
  txt = w.add('statictext',undefined,labeltext)
  pbar = w.add("progressbar", undefined, 1, stop)
  pbar.preferredSize = [300,20]
  w.show()
  return pbar

main = ->
  # get the doc
  doc = app.activeDocument
  # check if the doc is there
  if doc == null
    alert "no document"
    return
  # get the actie page
  pg = doc.layoutWindows[0].activePage
  # get all apgeitems
  items = pg.pageItems
  # loop the items
  progress_win = new Window ("palette")
  progress = pbar(progress_win, items.length, 'Moving Text to the back')
  for i in [0..items.length] by 1
    item = items[i] # isolate
    # check if we have an TextFrame if so send to back
    try item.sendToBack() if item.getElements()[0] instanceof TextFrame
    catch e
    progress.value = i++

  progress.parent.close() # close the progress bar
do main