import Nestable from "./Nestable";
import { FromRoot, DefaultToParent } from "./decorators";

class Testing extends Nestable{
    constructor(initialState?:object){
        super()
    }

    @DefaultToParent()
    username?: string;
}

const t1 = new Testing()
const t2 = new Testing()

t1.username = "Samir"

t1.addChild(t2)



while(1){}