export const decorator = () => {
  abstract class Beverage {
    description = "Unknown Beverage";

    getDescription() {
      return this.description;
    }

    abstract cost(): number;
  }

  abstract class CondimentDecorator extends Beverage {
    abstract getDescription(): string;
  }

  class Espresso extends Beverage {
    constructor() {
      super();
      this.description = "Espresso";
    }

    cost(): number {
      return 1.99;
    }
  }

  class Latte extends Beverage {
    constructor() {
      super();
      this.description = "Latte";
    }

    cost(): number {
      return 2.99;
    }
  }

  class Mocha extends CondimentDecorator {
    beverage: Beverage;

    constructor(b: Beverage) {
      super();
      this.beverage = b;
    }

    getDescription(): string {
      return this.beverage.getDescription() + " with Mocha";
    }

    cost(): number {
      return this.beverage.cost() * 2;
    }
  }

  class Soy extends CondimentDecorator {
    beverage: Beverage;

    constructor(b: Beverage) {
      super();
      this.beverage = b;
    }

    getDescription(): string {
      return this.beverage.getDescription() + " with Soy";
    }

    cost(): number {
      return this.beverage.cost() * 1.15;
    }
  }

  let aweosomeEspresso = new Espresso();
  aweosomeEspresso = new Mocha(aweosomeEspresso);
  console.log(aweosomeEspresso.getDescription());
  console.log(aweosomeEspresso.cost());

  let aweosomeLatte = new Latte();
  aweosomeLatte = new Mocha(aweosomeLatte);
  aweosomeLatte = new Mocha(aweosomeLatte);
  console.log(aweosomeLatte.getDescription());
  console.log(aweosomeLatte.cost());
};
