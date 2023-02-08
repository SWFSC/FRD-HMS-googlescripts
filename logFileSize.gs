function fileSize(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var folder = DriveApp.getFolderById(' ');   // Google Drive Folder ID
  var list = [];
  list.push(['Name','Registration', 'Size (Kb)']);
  var files = folder.getFiles();  
  while (files.hasNext()){
    file = files.next();
    var row = [];
    var vesselname = file.getName().substr(0, file.getName().lastIndexOf('-'));
    var vesselreg = file.getName().substr(file.getName().lastIndexOf('-')+2, file.getName().length).split('.');   
    var filesize  = file.getSize()/1000; 
    row.push(vesselname, vesselreg[0], filesize);
    list.push(row);
  }

  ss.getSheetByName('FILE SIZE').getRange(1,1,list.length,list[0].length).setValues(list);  
}
