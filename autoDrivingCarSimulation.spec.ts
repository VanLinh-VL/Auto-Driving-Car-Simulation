import {carParking, carsCollision, calCarPosition, Field, Position, Direction, Car} from './autoDrivingCarSimulation'

describe("Auto Driving Car Simulation", () => {
    test("it should calculator car position", () => {
      const field: Field = {
        x : 12,
        y : 10
      }
      const position: Position = {
        x: 1,
        y: 0,
        facingDirection: Direction.North
      }
      const step = 'F';

      const expected: Position = {
        x: 1,
        y: 1,
        facingDirection: Direction.North
      }
      const carPosition = calCarPosition(field, position, step);

      expect(carPosition).toEqual(expected);
    });

    test("it should calculator car position when collide field", () => {
        const field: Field = {
          x : 2,
          y : 2
        }
        const position: Position = {
          x: 1,
          y: 1,
          facingDirection: Direction.North
        }
        const step = 'F';
  
        const expected: Position = {
          x: 1,
          y: 1,
          facingDirection: Direction.North
        }
        const carPosition = calCarPosition(field, position, step);
  
        expect(carPosition).toEqual(expected);
      });

      test("it should car parking in the field", () => {
        const field: Field = {
          x : 12,
          y : 10
        }
        const position: Position = {
          x: 1,
          y: 0,
          facingDirection: Direction.North
        }
        const steps = 'FFRFFFRRLF';
  
        const expected: Position = {
          x: 4,
          y: 1,
          facingDirection: Direction.South
        }
        const carPosition = carParking(field, position, steps);
  
        expect(carPosition).toEqual(expected);
      });

      test("it should be not collision", () => {
        const field: Field = {
          x : 12,
          y : 10
        }
        const car1: Car = {
            position : {
              x: 0,
              y: 1,
              facingDirection: Direction.North
            },
            steps: 'FFRFFFFRRL'
        }
        const car2: Car = {
          position : {
            x: 3,
            y: 4,
            facingDirection: Direction.East
          },
          steps: 'FFLFFFFFFF'
      }

      const actual = carsCollision(field, car1, car2);
      const expected = 'no collision';

      expect(actual).toEqual(expected);
      });

      test("it should be collision", () => {
        const field: Field = {
          x : 10,
          y : 10
        }
        const car1: Car = {
            position : {
              x: 1,
              y: 2,
              facingDirection: Direction.North
            },
            steps: 'FFRFFFFRRL'
        }
        const car2: Car = {
          position : {
            x: 7,
            y: 8,
            facingDirection: Direction.West
          },
          steps: 'FFLFFFFFFF'
      }

      const actual = carsCollision(field, car1, car2);
      const expected = {
        step: 7,
        position: {
          x: 5,
          y: 4,
          facingDirection: Direction.East
        }
      } 

      expect(actual).toEqual(expected);
      });
  });