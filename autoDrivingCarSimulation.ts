export interface Position  {
    x: number,
    y: number,
    facingDirection: string,
}

export interface Field {
    x: number,
    y: number,
}

export interface Car {
    position: Position,
    steps: string
}

export enum Direction {
    North = 'N',
    South = 'S',
    East = 'E',
    West = 'W',
}

export enum Step {
    Left = 'L',
    Right = 'R',
    Forward = 'F'
}

export function carParking(field: Field, positon: Position, steps: string) {
    for(let step of steps){
        positon = calCarPosition(field, positon, step)
    }
    return positon;
}

export function carsCollision(field: Field,car1: Car, car2: Car){
    for(let i = 0; i < car1.steps.length; i++){
        const positionCar1 = calCarPosition(field, car1.position, car1.steps[i]);
        const positionCar2 = calCarPosition(field, car2.position, car2.steps[i]);

        if(positionCar1.x === positionCar2.x && positionCar1.y === positionCar2.y){
            return {
                step: i + 1,
                position: positionCar1,
            }
        }
    }
    return 'no collision'
}

export function calCarPosition(field: Field, position: Position, step: string): Position {
    const currentPosition = Object.assign({}, position);
    switch (step) {
        case Step.Forward :
            if(position.facingDirection === Direction.North){
                position.y += 1;
            } else if(position.facingDirection === Direction.South){
                position.y -= 1;
            }else if(position.facingDirection === Direction.East){
                position.x += 1;
            }else if(position.facingDirection === Direction.West){
                position.x -= 1;
            }
            break;
        case Step.Left :
            if(position.facingDirection === Direction.North){
                position.facingDirection = Direction.West;
            } else if(position.facingDirection === Direction.South){
                position.facingDirection = Direction.East;
            }else if(position.facingDirection === Direction.East){
                position.facingDirection = Direction.North;
            }else if(position.facingDirection === Direction.West){
                position.facingDirection = Direction.South;
            }
            break;
        case Step.Right :
            if(position.facingDirection === Direction.North){
                position.facingDirection = Direction.East;
            } else if(position.facingDirection === Direction.South){
                position.facingDirection = Direction.West;
            }else if(position.facingDirection === Direction.East){
                position.facingDirection = Direction.South;
            }else if(position.facingDirection === Direction.West){
                position.facingDirection = Direction.North;
            }
            break;
    }
    if( position.x >= field.x || position.y >= field.y || position.x < 0 || position.y < 0){
        return currentPosition;
    }

    return position;
}

// console.log(carParking({x: 10, y: 10}, {x: 1, y: 2, facingDirection:'N'}, 'FFRFFFRRLF'))
// console.log(carsCollision({x: 10, y: 10}, {position: {x: 1, y: 2, facingDirection:'N'}, step: 'FFRFFFFRRL'}, {position: {x: 7, y: 8, facingDirection:'W'}, step: 'FFLFFFFFFF'}))