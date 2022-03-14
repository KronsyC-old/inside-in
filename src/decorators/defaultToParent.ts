import Nestable from "../Nestable";

export function DefaultToParent(){
    return function(target: Nestable, propertyKey: string|symbol|number){
        
        const key = Symbol(`DefaultToParent property for ${String(propertyKey)}`)
        function getter(){
            //@ts-expect-error
            if(this[key]){
                
                //@ts-expect-error
                return this[key]

            }
            else{
                const parent = target.getParent()
                
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
        function setter (value:any)  {
            
            //@ts-expect-error
            this[key] = value
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        })
    }
}