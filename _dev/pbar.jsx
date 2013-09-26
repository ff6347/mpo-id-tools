/**
 * Taken from ScriptUI by Peter Kahrel
 * @usage
 * var progress_win = new Window ("palette");
 *
 * var progress = progress_bar(progress_win, 100, 'my Progress');
 *
 *       progress.value = i++;
 *       progress.parent.close();// important close it!!
 *
 * @param  {Palette} w    the palette the progress is shown on
 * @param  {Number} stop [description]
 * @return {Progressbar}      [description]
 */
function progress_bar (w, stop, labeltext) {
var txt = w.add('statictext',undefined,labeltext);
var pbar = w.add ("progressbar", undefined, 1, stop); pbar.preferredSize = [300,20];
w.show ();
return pbar;
}
