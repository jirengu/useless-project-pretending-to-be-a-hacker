const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)
const App = {
  init() {
    this.$btn = $('#modal .button')
    this.$modal = $('#modal')
    this.$codePre = $('#code pre')
    this.$code = $('#code')
    this.$panelDeny = $('.access-denied')
    this.$panelGranted = $('.access-granted')
    this.$$popups = $$('.popup')

    this.canWrite = false
    this.text = ''
    this.cursor = 0

    this.bind()
    this.fetchData()
  },

  bind() {
    this.$btn.onclick = () => {
      this.hide(this.$modal)
      this.fullScreen()
      this.canWrite = true
    }

    document.onkeypress = e => {
      let action = this.keyActions[e.key]
      console.log(e.key)
      console.log(action)
      if (action) {
        action.call(this)
      } else if (this.canWrite && this.$codePre.innerText.length < this.text.length) {
        this.$codePre.innerText = this.text.substr(0, this.cursor)
        this.cursor += 3
        this.$code.scroll({ top: this.$codePre.offsetHeight, left: 0, behavior: 'smooth' })
      }

    }
  },

  fetchData() {
    fetch('https://raw.githubusercontent.com/deptofdefense/scan-alb-logs/main/scripts/scan-alb-logs')
      .then(res => res.text())
      .then(res => {
        this.text = res
        this.show(this.$modal)
      })
  },

  show($node) {
    $node.classList.add('show')
  },

  hide($node) {
    $node.classList.remove('show')
  },

  fullScreen() {
    document.documentElement.requestFullscreen()
  },

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      this.fullScreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  },

  keyActions: {
    "0": function () {
      this.show(this.$panelGranted)
      this.canWrite = false
    },
    "1": function () {
      this.show(this.$panelDeny)
      this.canWrite = false
    },
    "9": function () {
      this.toggleFullScreen()
    },
    "h": function () {
      this.show(this.$modal)
      this.canWrite = false
    },
    "`": function () {
      this.$$popups.forEach($popup => this.hide($popup))
      this.hide(this.$modal)
      this.canWrite = true
    }
  }

}

App.init()