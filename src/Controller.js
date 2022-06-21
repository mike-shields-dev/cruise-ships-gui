;(function () {
  function Controller() {
    this.initialiseSea()
  }

  Controller.prototype.initialiseSea = function initialiseSea() {
    const viewport = document.querySelector("#viewport")
    const waterImages = ["../images/water0.png", "../images/water1.png"]
    const animationInterval = 1000
    let waterImageIndex = 0
    let timeStamp = Date.now()

    ;(function step() {
      const currentTime = Date.now()
      if (currentTime - timeStamp > animationInterval) {
        timeStamp = currentTime
        viewport.style.backgroundImage = `url(${waterImages[waterImageIndex]})`
        waterImageIndex = ++waterImageIndex % waterImages.length
      }
      requestAnimationFrame(step)
    })()
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller
  } else {
    window.Controller = Controller
  }
})()
