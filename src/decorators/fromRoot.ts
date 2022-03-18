import Nestable from "../Nestable";
type BoundToNestable = {
    (this:Nestable):any
}
type BoundToNestableSetter = {
    (this:Nestable, data:object):any
}
export function FromRoot(){
    return function(target: Nestable, propertyKey: string|symbol|number){

        const propertySymbol = Symbol(`Default FromRoot Property for ${String(propertyKey)}`)

        const getter : BoundToNestable = function(){
            //@ts-expect-error
            const _default = this[propertySymbol]
            const root = this["getRootNode"]()
            
            if(root===this){
                return _default
            }
            //@ts-expect-error
            const rootValue = root[propertySymbol]
            
            if(rootValue){
                return rootValue
            }
            else{
                return _default
            }
            
        }
        const setter: BoundToNestableSetter = function(_default:any){
            //@ts-expect-error
            this[propertySymbol] = _default
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        })
    }
}