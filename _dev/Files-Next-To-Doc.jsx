//opens the folder of the document
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

  var getxmlfiles = function getxmlfiles() {
    var doc; // this will be the document
    try {
      doc = app.activeDocument; // get  the acitve document
    } catch (e) {
      // oh oh no active doc
      alert("You have no document open!\n" + e);
      return;
    }

    var folder = Folder(doc.filePath); // get the folder
    var files = folder.getFiles();
    var filelist = [];
    var nameslist = [];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (file.name.split('.').pop() === 'xml') {
        itis = true;
        filelist.push(file);
        nameslist.push(file.name);
      }
    }

    nameslist.push("other location...");


    var xmldiag = app.dialogs.add({
      name: "XML Files Next to doc",
      canCancel: true
    });


    var xmldiag_column1 = xmldiag.dialogColumns.add();
    // var sdiag_row1 = sdiag_column1.dialogRows.add();
    // with(dialogColumns.add()){
    // with(dialogRows.add()){
    var xmlFilesDropDown = xmldiag_column1.dropdowns.add({
      stringList: nameslist,
      selectedIndex: nameslist.length - 1,
      minWidth: 100
    });

    var xmlfile = null;
    if (xmldiag.show() === true) {
      var gotthefile = false;
      if (xmlFilesDropDown.selectedIndex == nameslist.length - 1) {
        xmlfile = File.openDialog("Choose your .xml file");
        if (xmlfile === null) {
          return;
        }
      } else {
        gotthefile = true;
        xmlfile = filelist[xmlFilesDropDown.selectedIndex];
      }
      xmldiag.destroy();
      return xmlfile;
      // alert("The File" + xmlfile.fsName);
    } else {
      // user canceld
    }
  };

  getxmlfiles();
})(this);