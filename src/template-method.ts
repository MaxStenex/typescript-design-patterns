export const templateMethod = () => {
  abstract class CaffeineBeverage {
    prepareRecipe() {
      this.boilWater();
      this.brew();
      this.pourInCup();
      this.addCondiments();
    }

    brew() {}

    addCondiments() {}

    boilWater() {
      console.log("Boiling water");
    }

    pourInCup() {
      console.log("Pouring in cup");
    }
  }

  class Coffee extends CaffeineBeverage {
    brew() {
      console.log("Brewing the coffee");
    }

    addCondiments() {
      console.log("Added milk");
    }
  }

  class Tea extends CaffeineBeverage {
    brew() {
      console.log("Steeping the tea");
    }

    addCondiments() {
      console.log("Adding lemon");
    }
  }

  const cofee = new Coffee();
  const tea = new Tea();

  console.log(cofee.prepareRecipe());
  console.log("=================");
  console.log(tea.prepareRecipe());
};
