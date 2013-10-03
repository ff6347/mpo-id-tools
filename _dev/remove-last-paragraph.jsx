(function (thisObj) {
  var main = function main() {
    var doc = app.activeDocument;
    if (doc === null) {
      alert("No document");
      return;
    } else {
      if (doc.selection.length > 0) {
        for (var i = 0; i < doc.selection.length; i++) {
          if (doc.selection[i] instanceof TextFrame) {
            if (doc.selection[i].paragraphs.lastItem().characters.length > 1) {
              res = confirm(
                "There is a character in the last paragraph should I still remove"
              );
              if (res === false) {

                return;
              }
            }
            doc.selection[i].paragraphs.lastItem().remove();
            // doc.selection[i].paragraphs.lastItem().remove();
          }
        }
      }
    }
  };
  main();
})(this);