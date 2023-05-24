export const strategy = () => {
  interface FlyBehaviour {
    fly: () => void;
  }

  class FlyingWithWings implements FlyBehaviour {
    fly() {
      console.log("Im flying on my wings! :)");
      return;
    }
  }

  class NotFlying implements FlyBehaviour {
    fly() {
      console.log("I cant fly :(");
      return;
    }
  }

  class Duck {
    private flyBehaviour: FlyBehaviour;

    constructor(flyBehaviour: FlyBehaviour) {
      this.flyBehaviour = flyBehaviour;
    }

    performFly() {
      this.flyBehaviour.fly();
    }

    setFlyBehaviour(fb: FlyBehaviour) {
      this.flyBehaviour = fb;
    }
  }

  class RubberDuck extends Duck {
    constructor() {
      super(new NotFlying());
    }
  }

  const rubberDuckJony = new RubberDuck();

  rubberDuckJony.performFly();

  rubberDuckJony.setFlyBehaviour(new FlyingWithWings());

  rubberDuckJony.performFly();
};
