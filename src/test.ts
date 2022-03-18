import Nestable from "./Nestable";
import { FromRoot, DefaultToParent } from "./decorators";

class Testing extends Nestable{

    @FromRoot()
    username?: string;
}

const t1 = new Testing()
const t2 = new Testing()

t1.username = "Samir"

t1["addChild"](t2)
console.log("T1 Username",t1.username);
t2.username = "S"

console.log("T1 Username",t1.username);
console.log("T2 Username", t2.username);



while(1){}