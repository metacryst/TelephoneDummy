// read code from bottom up

function addFile(fileBytes, fileName) {
    if (document.title === "Telephone") {
      console.log("Can't add file! Parchment not online.");
      return;
    }
  
    console.log(fileBytes);
  
    fetch(`${window.location.href}addfile/${fileName}`, {
      method: "POST",
      body: fileBytes,
    })
      .then(data => {
        if (!data.errors) {
          console.log(data)
        }
        else {
          alert(data.errors)
        }
      })
      .then(response => {
        console.log(response.body);
        response.json();
        if (response.status == 404) {
          document.title = "Telephone"
        } else {
          document.title = "Parchment"
        }
      })
  
}

function askForFile() {
    let fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');

    fileSelector.onchange = e => {
      let fileData = e.target.files[0];
      console.log("file Data: ", fileData);
      
      let reader = new FileReader();
      let fileByteString = "";
      reader.readAsArrayBuffer(fileData);
      reader.onloadend = function (evt) {
          if (evt.target.readyState == FileReader.DONE) {
             let arrayBuffer = evt.target.result,
                 array = new Uint8Array(arrayBuffer);
             for (let i = 0; i < array.length; i++) {
                 console.log(fileByteString + array[i].toString())
                 fileByteString = fileByteString + array[i].toString();
                 console.log(fileByteString)
              }
          }
          addFile(fileByteString, fileData.name);
      }
    }

    fileSelector.click(); 
}

window.addEventListener("dblclick", (e) => {
    askForFile();
})












 


