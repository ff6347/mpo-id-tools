// Page Export.
// based on
// http://indesignsecrets.com/page-exporter-utility-peu-5-script-updated-for-cs3.php
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

(function (thisObj) {
  // export with the current PDF settings
  //
  //
  //

/**
 * Change these to fit your needs
 * @type {Object}
 */
  var exporter_data = {
    "prefix":"S_",
    "suffix":"_korrigiert_2"
  };



  var msg = {
    "file_open":function(e){
      alert("seems like the file you want to overwrite is already open.\nPlease close it.\nError:\n"+ e);
    }
  };
  var doc = app.activeDocument;
  if (doc === null) {
    alert("No doc");
  }else{
var singlepage = (doc.documentPreferences.pagesPerDocument==1)?true:false;
var basename  = (doc.name.split(".ind"))[0];
    var pg = doc.layoutWindows[0].activePage;
app.pdfExportPreferences.pageRange = pg.name;

var topFolder = Folder.selectDialog ("Choose Export Folder...");
if(topFolder === null){
  return;
}
// alert(topFolder.path);

// alert("something" + topFolder.fsName);
var outFilePath = topFolder.fsName + "/" + exporter_data.prefix + pg.name + exporter_data.suffix+".pdf";
var outFile = File(outFilePath);

if(outFile.exists){
  var res = confirm("Outputfile exists should I overwrite?");
  if(res === true){
      try{

      doc.exportFile(ExportFormat.pdfType, (outFile));
      }catch(e){
        msg.file_open(e);
      }
      return;
      // export and overwrite and done
    }else{
      // okay no overwrite
      return;
    }
}else{
  // export new file
   try{
      doc.exportFile(ExportFormat.pdfType, (new File(outFilePath)));
      return;

   }catch(e){
        msg.file_open(e);
   }
}

  }
  })(this);