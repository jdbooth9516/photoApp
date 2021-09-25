const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('electron', {
  doThing: (name, email, phone, array) => {

      fs.readFile('orders.csv', 'utf8', function (err, data) {
        console.log(data);
        fs.appendFile(
          'orders.csv',
          `\n${name}, ${email}, ${phone}, ${array}`,
          function (err) {
            if (err) throw err;
            console.log('updated');
          }
        );
      });
  },
  // this just needs to save everthing to a file.
});
