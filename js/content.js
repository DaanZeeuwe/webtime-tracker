
let maxScroll = document.documentElement.scrollHeight;
let previousScroll = 0.0;
window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY;
    let scrollLength = currentScroll / maxScroll;
    if (previousScroll == 0.0 && scrollLength < 0.20){
      console.log('Achieved Nothing:', scrollLength);
      previousScroll = 0.00;
      chrome.runtime.sendMessage({color: '#FF0000'});
    } else if (previousScroll == 0.0 && scrollLength >= 0.20){
      console.log('Achieved Quarter:', scrollLength);
      previousScroll = 0.20;
      chrome.runtime.sendMessage({color: '#FF7F00'});
    } else if (previousScroll == 0.20 && scrollLength >= 0.4){
      console.log('Achieved Half:', scrollLength);
      previousScroll = 0.4;
      chrome.runtime.sendMessage({color: '#FFFF00'});
    } else if (previousScroll == 0.40 && scrollLength >= 0.65){
      console.log('Achieved Almost:', scrollLength);
      previousScroll = 0.65;
      chrome.runtime.sendMessage({color: '#00FF00'});
    } else if (previousScroll == 0.65 && scrollLength >= 0.9){
      console.log('Achieved Done:', scrollLength);
      previousScroll = 0.9;
      chrome.runtime.sendMessage({color: '#008000'});
    }
     
    
  });