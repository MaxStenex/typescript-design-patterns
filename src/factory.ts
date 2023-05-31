export const factory = () => {
  interface Shape {
    width: number;
    height: number;
  }

  abstract class FigureCreator {
    abstract createShape(): Shape;
  }

  class CircleCreator extends FigureCreator {
    createShape(): Shape {
      return {
        height: 5,
        width: 5,
      };
    }
  }

  class RectangleCreator extends FigureCreator {
    createShape(): Shape {
      return {
        height: 8,
        width: 10,
      };
    }
  }

  const circleCreator = new CircleCreator();
  const rectangleCreator = new RectangleCreator();

  console.log(circleCreator.createShape());
  console.log(rectangleCreator.createShape());
};
