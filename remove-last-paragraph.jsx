(function (thisObj) {
  var main = function main () {
    var doc = app.activeDocument;
    if(doc === null){
      alert("No document");
      return;
    }else{
      if(doc.selection.length > 0){
        for(var i = 0; i < doc.selection.length;i++){
          if(doc.selection[i] instanceof TextFrame){
            doc.selection[i].paragraphs.lastItem().remove();
            // doc.selection[i].paragraphs.lastItem().remove();
          }
        }
      }
    }
  };
  main();
  })(this);