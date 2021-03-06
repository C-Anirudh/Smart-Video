// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let activateAppButton = document.getElementById('activate-app-button');

chrome.storage.sync.get('isFlokiActive', function (data) {
  var element = activateAppButton;
  var isFlokiActive = data.isFlokiActive;
  if (!isFlokiActive) {
    element.innerText = 'Activate Smart Video';
    element.parentNode.nextElementSibling.innerHTML = 'App is <span style="color:#428bff;font-weight:700;">Disabled</span>. Please click the above button to activate the extension for this tab.';
  }
  else {
    element.innerText = 'Disable Smart Video';
    element.parentNode.nextElementSibling.innerHTML = 'App is <span style="color:#428bff;font-weight:700;">Active</span>. Please click the above button to disable the extension for this tab.';
  }
});

activateAppButton.onclick = function (event) {
  chrome.storage.sync.get('isFlokiActive', function (data) {
    var element = event.target;
    var isFlokiActive = data.isFlokiActive;
    if (!isFlokiActive) {
      element.innerText = 'Disable Smart Video';
      element.parentNode.nextElementSibling.innerHTML = 'App is <span style="color:#428bff;font-weight:700;">Active</span>. Please click the above button to disable the extension for this tab.';
      chrome.storage.sync.set({ isFlokiActive: true }, function () {
      console.log('Smart Video(Floki) App activated');
      });

      chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
        for(var i=0; i< tabs.length; i++){
          var tab = tabs[i];
          if(tab.url){
            if(tab.url.includes("youtube.com/watch?v=") === true){
              chrome.tabs.sendMessage( tab.id, {
                message: 'urlChanged'
              })
            }
          }
        }   
      });

      
    }
    else {
      element.innerText = 'Activate Smart Video';
      element.parentNode.nextElementSibling.innerHTML = 'App is <span style="color:#428bff;font-weight:700;">Disabled</span>. Please click the above button to activate the extension for this tab.';
      chrome.storage.sync.set({ isFlokiActive: false }, function () {
        console.log('Smart Video App disabled');
      });

      chrome.tabs.query({'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs){
        for(var i=0; i< tabs.length; i++){
          var tab = tabs[i];
          if(tab.url){
            if(tab.url.includes("youtube.com/watch?v=") === true){
              chrome.tabs.sendMessage( tab.id, {
                message: 'disabled'
              })
            }
          }
        }   
      });

    }
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: `
        `
      });
  });
};
