import Nestable from "../Nestable";

export function DefaultToParent(){
    return function(target: Nestable, propertyKey: string|symbol|number){
        console.log("YO");
        
        const key = Symbol(`DefaultToParent key for ${String(propertyKey)}`)
        // console.log(key);
        
        Object.defineProperty(target, key, {
            value: undefined,
            configurable: true,
            writable: true
        })
        const getter = () => {
            //@ts-expect-error
            if(target[key]){
                //@ts-expect-error
                return target[key]

            }
            else{
                const parent = target.getParent()
                console.log(parent);
                
                //@ts-expect-error
                if(parent?.[key]){
                    //@ts-expect-error
                    return parent[key]
                }
                else{
                    throw new Error(`INS-I - Could not find property ${String(propertyKey)}`)
                }
            }
        }
        const setter = (value:any) => {
            //@ts-expect-error
            target[key] = value
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        })
    }
}