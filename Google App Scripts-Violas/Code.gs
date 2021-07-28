function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
  //Crafts the initial HTML file and starts the display
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
  //Includes stylesheet and js
}

function getData(){
  //Reads data 
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ws = ss.getSheetByName("Items"); //navigate to sheet names Items
  let results = {};
  results.items = ws.getRange(2,1,ws.getLastRow()-1,5).getValues(); //2nd row to last row, 1st collumn to 5th collumn
  ws = ss.getSheetByName('Sales');
  results.sales = ws.getRange(2,1,ws.getLastRow()-1,6).getValues(); //2nd row to last row, 1st collumn to 6th collumn
  return results
}

function setData(data){
  const importedData = JSON.parse(data);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orderLength = importedData.order.length;
  
  ws = ss.getSheetByName("Sales"); //navigate to sheet names Sales
  range = ws.getRange(ws.getLastRow()+1,1,orderLength,6);
  range.setValues(importedData.order);

  //payment
  ws = ss.getSheetByName("Payments");
  const paymentColumns = importedData.payment[0].length;
  range = ws.getRange(ws.getLastRow()+1,1,1,paymentColumns);
  range.setValues(importedData.payment);


}