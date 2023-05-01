const body = document.body;
console.log("creating div")
// create progress
const progress = document.createElement('div');
progress.id = 'chrome-extension-progress';
progress.style.display = 'block';
body.appendChild(progress);
getUserScrollScale()
window.addEventListener('scroll', getUserScrollScale);
var current_value = 0

// get switch state when init
chrome.storage.sync.get('open', data => {
  toggleScroll(data.open);
});

// get switch state
chrome.runtime.onMessage.addListener((req) => {
  toggleScroll(req.open);
});

// scroll progress
function getUserScrollScale() {
    if (document.documentElement.scrollTop) {
        const top = document.documentElement.scrollTop,
                height = document.documentElement.scrollHeight - window.innerHeight;
        var progression = Math.ceil(top / height * 100)
        if (progression > current_value){
            progress.style.width = progression  + '%';
            current_value = progression
        }
    }
}
