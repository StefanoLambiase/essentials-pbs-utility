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
    'bridgeToMain',
    {
      send: (channel, data) => {
        // whitelist channels
        const validChannels = ['form-submission'];
        if (validChannels.includes(channel)) {
          return ipcRenderer.send(channel, data);
        }
      },
      onReceive: (channel, func) => {
        const validChannels = ['from-form-submission', 'generate-text'];
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`.
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      },
    },
);
