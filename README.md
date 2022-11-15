# Export Data From Cloud Firestore To Google Sheets
This repository contains detailed documentation of how to easily export data from cloud firestore to google sheets (for further data analysis) using appscript.

For reference, a simple cloud firestore database looks like the following:

![database](https://user-images.githubusercontent.com/73964224/201514942-57d46892-1f26-41a1-8f35-3ff70bd6c586.PNG)

### Quick start
In order to get started with firestore database you should create a google service account to get access to the database.

In order to authenticate with Firestore you should get the following details of your project:

* client-email
* private-key
* project_id

## Open Google Apps Script in the Script editor

Go to the **Extensions** in the main menu and select **Apps Script**. This will direct you to the Google Apps Script in the Script editor


## Add the FirestoreApp Library

On the left side of the screen you can see a list of **Files**, **Libraries**, and **Services**. In order to add the FirestoreApp library click the plus sign in the **Libraries** box.

A new box will pop-up. On the **Script ID**, add the following id **1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw** and click **Look up**. 

Leave the default version and identifier as it is if you want and finally click the **Add** button.
![lib](https://user-images.githubusercontent.com/73964224/201515669-4f7ad73a-91e8-41d8-995a-e5f5fc0d1974.PNG)

## Authorize FirestoreApp to access the data

## Add the Google Sheets API services

In order to add the **Google Sheet API** service click on the plus sign in the **Services** box.

A new box will pop-up. Select the Google Sheets API from the list and click the **Add** button.

![service](https://assets.website-files.com/62b4c5fb2654ca30abd9b38f/62b4c5fb2654cafc74d9c20e_FG0B4s7b_LJZDcG9saQxASOax3DaQ4Q4Cscf_DlcFUII-P__kugM-sojoucY4m6a1vHc6fCLycwpisLX55yuiUmos0-fWDkPEe6X4nC2imITQb4GiY5iO5XED_BCTFAKzIT22I0.png)

## The script code

### Configure Firestore instance from the script

With the service account **email**, **private-key** and the **project_id** you will be able to authenticate with Firestore to get the **Firestore** instance.

Below is a template format for configuration. Replace **email**,**key**,**projectId** with your values.

```
function getFirestore() {
    const email = 'projectname-12345@appspot.gserviceaccount.com';
    const key = '-----BEGIN PRIVATE KEY-----\nPrivateKeyLine1\nPrivateKeyLine2\nPrivateKeyLineN\n-----END PRIVATE KEY-----';
    const projectId = 'projectname-12345'

  const firestore = FirestoreApp.getFirestore(email, key, projectId);
  return firestore;
  }
 ```

### Create and initialize variables 

```
    const firestore=getFirestore();
    const spreadsheet=SpreadsheetApp.getActiveSpreadsheet();
    const sheet=spreadsheet.getActiveSheet();
```

### Read documents from collection to array

You can retrieve all documents within a collection by calling the **getDocuments** function:

```
 const allDocuments=firestore.getDocuments('brews');
```

### Iterate through the documents array and add add data to the google sheets

The following code depends on the structure of your database.

```
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
  ```
Finally save the project and run the script by selecting the function **getFirestoreData()** function in the script editor.

## References

https://github.com/grahamearley/FirestoreGoogleAppsScript
