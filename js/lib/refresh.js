//require("js/lib/timer.js");
/**
 * Controls the rate at which a function is looped
 *
 * @author Christian Wang
 * @version Oct 2017
 **/
class Refresh {
  //Function that is to be run at RPS(refreshes per seconds)
  constructor(funct, rps) {
    this.funct = funct;
    this.rps = rps;
  }

  //Starts the refresh cycle
  start() {
    this.running = false;
    this.rpsInterval = 1000 / this.rps;
    this.timer = new Timer();
    if (this.rps > 0)
      this.loop();
    else
      console.log(new WebFootError("Your RPS is at 0 so I'm not even gonna start"));
  }

  //Stops the refresh cycle
  stop() {
    this.running = true;
  }

  //Function that is refreshed every cycle
  loop() {
    if (this.running) return;
    //Request a frame refresh
    window.requestAnimationFrame(this.loop.bind(this));

    //If enough time has passed call the function
    let millisElapsed = this.timer.millisecondsElapsed();
    this.currentRPS = millisElapsed / this.rpsInterval * this.rps;
    if (millisElapsed > this.rpsInterval) {
      this.timer.mark();

      //If the function is undefined output an error and running running
      if (!this.funct) {
        this.running = true;
        console.log(new WebFootError("The function you are trying to refresh is undefined"));
      } else {
        this.funct();
      }
    }
  }
}
