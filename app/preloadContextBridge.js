const {
  contextBridge,
  ipcRenderer,
} = require('electron');


/**
 * This script is used to expose protected methods that allow the
 * renderer process to use the ipcRenderer without exposing the
 * entire object. This 'bridge' is used for security reasons and to
 * avoid the use of node.js powerful functionality inside the
 * renderer process.
 */
contextBridge.exposeInMainWorld(
    'api',
    {
      send: (channel, data) => {
        // whitelist channels
        const validChannels = ['toMain', 'form-submission'];
        if (validChannels.includes(channel)) {
          return ipcRenderer.send(channel, data);
        }
      },
      receive: (channel, func) => {
        const validChannels = ['fromMain', 'from-form-submission'];
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`.
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      },
    },
);
