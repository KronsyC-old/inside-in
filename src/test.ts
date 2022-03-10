import Nestable from "./Nestable";
import { FromRoot } from "./decorators";

class Testing extends Nestable{
    constructor(initialState?:object){
        super()
        this.state = initialState
    }


    @FromRoot()
    state?: object;
}

const t1 = new Testing({
    hello: "world"
})
const t2 = new Testing({
    hello: "No"
})

t1.addChild(t2)

console.log(t1.state);
console.log(t2.state);


while(1){}