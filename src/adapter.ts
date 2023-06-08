export const adapter = () => {
  interface Duck {
    quack: () => void;
    fly: () => void;
  }

  interface Turkey {
    gobble: () => void;
    fly: () => void;
  }

  class TurkeyAdapter implements Duck {
    constructor(private turkey: Turkey) {}

    quack() {
      this.turkey.gobble();
    }

    fly() {
      this.turkey.fly();
    }
  }

  class WildTurkey implements Turkey {
    gobble() {
      console.log("Gobble gobble");
    }

    fly() {
      console.log("I`m flying a short distance");
    }
  }

  const wildTurkey = new WildTurkey();
  const turkeyAdapter = new TurkeyAdapter(wildTurkey);

  turkeyAdapter.fly();
  turkeyAdapter.quack();
};
