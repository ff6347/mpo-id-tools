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
function message ( labeltext, millisec) {
var w = new Window ("palette");
var txt = w.add('statictext',undefined,labeltext);
// var pbar = w.add ("progressbar", undefined, 1, stop); pbar.preferredSize = [300,20];
w.show ();
sleep(millisec);
w.close();
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}