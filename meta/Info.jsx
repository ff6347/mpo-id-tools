// /**
//  * This is a Meta object used in the whole project
//  *
//  */

// function Info (_current_import_id, _artnr, _type){

//   this.importid = _current_import_id;
//   this.artnr = _artnr;
//   this.type = _type;
//   this.imagedata = {
//     path : "",
//     folder : ""
//   };

//    this.set_imagedata =  function (_path, _folder){
//        this.imagedata.path = _path;
//       this.imagedata.folder = _folder;
//   };

//   this.jsondumb  = function () {

//     var result = {
//       'importid':this.importid,
//       'artnr' : this.artnr,
//       'type' : this.type,
//       'imagedata':{
//         'path':this.imagedata.path,
//         'folder':this.imagedata.folder
//         }
//     };
//     return result.toSource();
//   };
// }
