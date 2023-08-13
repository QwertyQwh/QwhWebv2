import { randInt } from "three/src/math/MathUtils";

function proper_modulo(x,y){
    if(x>=0){
        return x%y
    }else{
        return x%y+y;
    }
}

function RandomAscii(){
    return String.fromCharCode(randInt(33,126))
}


export  {proper_modulo,RandomAscii}