import Nestable, { kDefaultPropertyForFromRoot } from "../Nestable";
type BoundToNestable = {
    (this:Nestable):any
}
type BoundToNestableSetter = {
    (this:Nestable, data:object):any
}
export function FromRoot(){
    return function(target: Nestable, propertyKey: string){
        const getter : BoundToNestable = function(){
            const defaults = this[kDefaultPropertyForFromRoot]
            const root = this.getRootNode()
            if(root===this){
                return defaults[propertyKey]
            }
            //@ts-expect-error
            const rootValue = root[propertyKey]
            if(rootValue){
                return rootValue
            }
            else{
                return defaults[propertyKey]
            }
            
        }
        const setter: BoundToNestableSetter = function(_default:any){
            const defaults = this[kDefaultPropertyForFromRoot]
            defaults[propertyKey] = _default
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        })
    }
}