function proper_modulo(x,y){
    if(x>=0){
        return x%y
    }else{
        return x%y+y;
    }
}


export default {proper_modulo}