/**
 * This is a Meta object used in the whole project
 * 
 */

function Info (_current_import_id, _artnr, _type){
  this.importid = _current_import_id;
  this.artnr = _artnr;
  this.type = _type;
  this.imagedata = null;
   this.set_imagedata =  function (_path, _folder){
    var obj = {
      "path":_path,
      "folder":_folder
    };
    this.imagedata = obj;
  };
}
