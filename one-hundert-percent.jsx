// 100percent.jsx
//

(function (thisObj) {
main();

function main (){
    var doc = app.activeDocument;
    if (doc === null){
      alert("no doc");
      return;
    }


for(var i = 0; i < app.selection.length;i++){
    var item = app.selection[i];
    if(item.hasOwnProperty('images')){
      for (var j = 0; j < item.images.length; j++) {
        var img = item.images[j];
        if(img.horizontalScale > 100){

          if(img.horizontalScale < 120){
          var res = confirm("Your image scale is " + img.horizontalScale +". That is below the tolerance but still bigger than 100%. Should I still resize your image?");
            if(!res){
              continue;
            }
          }
          img.horizontalScale = 100;
          img.verticalScale = 100;
          item.fit(FitOptions.CENTER_CONTENT);
          item.fit(FitOptions.FRAME_TO_CONTENT);

        }
      }
    }
  }
}

  })(this);