const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

$('#modal .button').onclick = function() {
  $('#modal').classList.add('hide')
  $('#code pre').classList.add('ready')
  toggleFullScreen()
}

document.onkeypress = function(e) {
  if(e.key === '0') {
    $('.access-denied').classList.remove('hide')
    isReady = false
  } else if(e.key === '1') {
    $('.access-granted').classList.remove('hide')
    isReady = false
  } else if(e.key === '`') {
    $$('.popup').forEach($popup => {
      $popup.classList.add('hide')
      isReady = true
    })
  } else if(e.key === '9'){
    toggleFullScreen()
  }else if(e.key === 'h') {
    $('#modal').classList.remove('hide')
    $('#code pre').classList.remove('ready')
  } else if(isReady && cursor <= text.length) {
    $('#code pre').innerText = text.substr(0, cursor)
    cursor+=3
    $('#code').scroll({ top: $('#code pre').offsetHeight, left: 0, behavior: 'smooth' })
  }

}

let isReady = false
let text = ''
let cursor = 0


fetch('https://raw.githubusercontent.com/deptofdefense/scan-alb-logs/main/scripts/scan-alb-logs')
  .then(res=>res.text())
  .then(res => {
    text = res
    isReady = true
  })

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}