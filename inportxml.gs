function inPort() {

  var url = "https://www.fisheries.noaa.gov/inport/stats/SWFSC/data-sets/csv";
  var csv =  UrlFetchApp.fetch(url).getBlob().getDataAsString();
  var data = Utilities.parseCsv(csv);  
  var ids = [];
  for (var i = 1; i < data.length; i++){
    ids.push([data[i][0], data[i][2]]);
  }
  console.log(ids.length);
  var meta = [['Division','ID','Title', 'POC', 'URL']];

  for (var j = 0; j < ids.length; j++){
    let str = "https://www.fisheries.noaa.gov/inport/item/"+ids[j][1]+"/inport-xml";
    let str2 = "https://www.fisheries.noaa.gov/inport/item/"+ids[j][1];
    let xml = UrlFetchApp.fetch(str).getContentText();
    let document = XmlService.parse(xml);
    let root = document.getRootElement();
    let info = root.getChild('item-identification');
    let info2 = info.getChild('title').getText(); 
    var sup = root.getChild('support-roles');
      for (var k = 0; k < sup.getChildren('support-role').length; k++){
        if (sup.getChildren('support-role')[k].getChild('support-role-type').getText() == "Point of Contact"){
          var info3 = sup.getChildren('support-role')[k].getChild('contact-name').getText();
        }
      }    
    meta.push([ids[j][0], ids[j][1], info2, info3, str2])      
  }

var ss = SpreadsheetApp.getActiveSpreadsheet();
ss.getSheets()[0].getRange(1,1,meta.length,meta[0].length).setValues(meta);
  
}
