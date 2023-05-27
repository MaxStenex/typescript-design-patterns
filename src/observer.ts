export const observer = () => {
  const getTemperature: () => number = () => Math.round(Math.random() * 100);

  interface Observer {
    update: (weather: WeatherState) => void;
  }

  interface Subject {
    observers: Observer[];
    registerObserver: (obs: Observer) => void;
    notifyObservers: () => void;
    removeObserver: (obs: Observer) => void;
  }

  interface WeatherState {
    temperature: number;
  }

  interface WeatherDisplay {
    display: () => void;
  }

  class WeatherData implements Subject {
    #weatherState: WeatherState = {
      temperature: 0,
    };
    observers: Observer[] = new Array();

    constructor() {
      this.weather = {
        temperature: getTemperature(),
      };
    }

    public measurementsChanged() {
      this.notifyObservers();
    }

    public registerObserver(obs: Observer) {
      this.observers.push(obs);
    }

    public notifyObservers() {
      if (this.observers.length === 0) return console.log("NO DISPLAYS FOUND :(");
      this.observers.forEach((obs) => obs.update(this.weather));
    }

    public removeObserver(obs: Observer) {
      this.observers = this.observers.filter((o) => o !== obs);
    }

    get weather(): WeatherState {
      return this.#weatherState;
    }
    set weather(state: WeatherState) {
      this.#weatherState = state;
      this.measurementsChanged();
    }
  }

  class MobilePhone implements Observer, WeatherDisplay {
    weather: WeatherState = {
      temperature: 0,
    };
    subject: Subject;

    constructor(sub: Subject) {
      this.subject = sub;
      this.subject.registerObserver(this);
    }

    update(weather: WeatherState) {
      this.weather = weather;
      this.display();
    }

    display() {
      console.log(
        "CURRENT WEATHER DIPLAY FROM MOBILE PHONE: " + JSON.stringify(this.weather)
      );
    }
  }

  class Computer implements Observer, WeatherDisplay {
    weather: WeatherState = {
      temperature: 0,
    };
    subject: Subject;

    constructor(sub: Subject) {
      this.subject = sub;
      this.subject.registerObserver(this);
    }

    update(weather: WeatherState) {
      this.weather = weather;
      this.display();
    }

    display() {
      console.log(
        "CURRENT WEATHER DIPLAY FROM COMPUTER : " + JSON.stringify(this.weather)
      );
    }
  }

  const weatherData = new WeatherData();
  const mobilePhone = new MobilePhone(weatherData);
  const computer = new Computer(weatherData);

  weatherData.measurementsChanged();
  weatherData.measurementsChanged();

  weatherData.removeObserver(computer);

  weatherData.measurementsChanged();

  weatherData.removeObserver(mobilePhone);

  weatherData.measurementsChanged();
};
