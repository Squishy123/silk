/**
 * Controls the rate at which a function is looped
 **/
class Refresh {
  //Function that is to be run at RPS(refreshes per seconds)
  constructor(funct, rps) {
    this.run = function() {
      funct()
    };
    this.rps = rps;
    this.start(this.rps);
  }

  start() {
    this.stop = false;
    this.rpsInterval = 1000 / this.rps;
    this.timer = new Timer();
    this.loop();
  }

  run() {}

  loop() {
    if (this.stop) return;
    //Request a frame refresh
    window.requestAnimationFrame(this.loop.bind(this));

    //If enough time has passed call the function
    let millisElapsed = this.timer.millisecondsElapsed();
    this.currentRPS = millisElapsed / this.rpsInterval * this.rps;
    if (millisElapsed > this.rpsInterval) {
      this.timer.mark();
      //this["funct"]();
      this.run();
    }
  }
}
