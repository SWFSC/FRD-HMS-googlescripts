function listFiles(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var vessellist = [];
  var vessellist2 = [];
  var reglist2 = [];

  var reglist = ss.getSheets()[1].getRange('B1:B' + ss.getSheets()[1].getLastRow()).getValues().toString();  
  var regarray = ss.getSheets()[1].getRange('A1:B' + ss.getSheets()[1].getLastRow()).getValues();
  
  var folder = DriveApp.getFolderById('1P-B_ffCxi2MzbhmYDaL5xdgA5DZngNtx');
  var list = [];
  list.push(['Name','Reg']);
  var files = folder.getFiles();  
  while (files.hasNext()){
    file = files.next();
    var row = [];
    var vesselname = file.getName().substr(0, file.getName().lastIndexOf('-'));
    var vesselreg = file.getName().substr(file.getName().lastIndexOf('-')+2, file.getName().length).split('.');   
    //var filesize  = file.getSize()/1000; 
    row.push(vesselname, vesselreg[0]);
    list.push(row);
  }

  for(var i = 0; i < list.length; i++){    
    reglist2[i] = list[i][1];
  }   
  reglist2 = reglist2.toString();

  for(var i = 1; i < list.length; i++){    
    if(!reglist.includes(list[i][1])){
      vessellist.push(list[i]);
    }
  }  
  for(var i = 1; i < regarray.length; i++){    
    if(!reglist2.includes(regarray[i][1])){
      vessellist2.push(regarray[i]);
    }
  }  

   var celln = vessellist.length+3

  ss.getSheets()[0].getRange(1,1,list.length,list[0].length).setValues(list);

  ss.getSheets()[2].getRange('A1').setValue("Vessels in NLOG2022 folder and not in Vessel List");
  ss.getSheets()[2].getRange('A1').setFontWeight("bold");
  ss.getSheets()[2].getRange(2,1,vessellist.length,vessellist[0].length).setValues(vessellist);

  ss.getSheets()[2].getRange('A'+celln).setValue("Vessels in Vessel List and not in NLOG2022 folder");
  ss.getSheets()[2].getRange('A'+celln).setFontWeight("bold");
  ss.getSheets()[2].getRange(vessellist.length+4,1,vessellist2.length,vessellist2[0].length).setValues(vessellist2);
}
