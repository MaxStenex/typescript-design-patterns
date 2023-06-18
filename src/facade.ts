export const facade = () => {
  interface DvdPlayer {
    on: () => void;
    play: (movie: string) => void;
    stop: () => void;
    eject: () => void;
    off: () => void;
  }

  class HomeDvdPlayer implements DvdPlayer {
    on() {
      console.log("Dvd player on");
    }

    play() {
      console.log("Dvd player playing movie");
    }

    stop() {
      console.log("Dvd player stopped");
    }

    eject() {
      console.log("Dvd player ejected");
    }

    off() {
      console.log("Dvd player off");
    }
  }

  interface Amplifier {
    on: () => void;
    setDvd: (dvd: DvdPlayer) => void;
    setVolume: (vol: number) => void;
    off: () => void;
  }

  class HomeAmplifier implements Amplifier {
    homeDvdPlayer: null | DvdPlayer = null;

    on() {
      console.log("Home amplifier is on");
    }

    setDvd(dvd: DvdPlayer) {
      this.homeDvdPlayer = dvd;
    }

    setVolume(vol: number) {
      console.log(`Volume is ${vol}`);
    }

    off() {
      console.log("Home amplifier is off");
    }
  }

  class HomeTheaterFacade {
    constructor(private dvdPlayer: DvdPlayer, private amplifier: Amplifier) {}

    public watchMovie(movie: string) {
      this.amplifier.on();
      this.amplifier.setDvd(this.dvdPlayer);
      this.amplifier.setVolume(5);
      this.dvdPlayer.on();
      this.dvdPlayer.play(movie);
    }

    public endMovie() {
      this.amplifier.off();
      this.dvdPlayer.stop();
      this.dvdPlayer.eject();
      this.dvdPlayer.off();
    }
  }

  const homeDvdPlayer = new HomeDvdPlayer();
  const homeAmplifier = new HomeAmplifier();
  const homeTheater = new HomeTheaterFacade(homeDvdPlayer, homeAmplifier);

  homeTheater.watchMovie("Kill Bill");
  homeTheater.endMovie();
};
