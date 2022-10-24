function getFirestore() {
    const email = 'projectname-12345@appspot.gserviceaccount.com';
    const key = '-----BEGIN PRIVATE KEY-----\nPrivateKeyLine1\nPrivateKeyLine2\nPrivateKeyLineN\n-----END PRIVATE KEY-----';
    const projectId = 'projectname-12345'

  const firestore = FirestoreApp.getFirestore(email, key, projectId);
  return firestore;
  }
  
  function getFirestoreData(){
    //Initialize variables
    const firestore=getFirestore();
    const spreadsheet=SpreadsheetApp.getActiveSpreadsheet();
    const sheet=spreadsheet.getActiveSheet();
  
    //Read documents from collection to array
    const allDocuments=firestore.getDocuments('brews');
    Logger.log(allDocuments.length);
  
    //Iterate through the documents array
    for(var i=0;i<allDocuments.length;i++){
      //Initialize the array to be printed to google sheets
      var docArray=[];
      //access first column
      var name=allDocuments[i].fields['name'];
      docArray.push(name.stringValue);
  
      //access second column
      var strength=allDocuments[i].fields['strength'];
      docArray.push(strength.integerValue);
  
      //access third column
      var sugars=allDocuments[i].fields['sugars'];
      docArray.push(sugars.stringValue);
  
      //access fourth column
      var uid=allDocuments[i].name.slice(allDocuments[i].name.lastIndexOf("/")+1);
      docArray.push(uid);
  
      //write array as row in google sheets
      sheet.appendRow(docArray); 
    }
  }
  