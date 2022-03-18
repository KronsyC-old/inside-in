import Nestable from "../Nestable";
import merge from "deepmerge"
type BoundToNestable = {
    (this:Nestable):any
}
type BoundToNestableSetter = {
    (this:Nestable, data:object):any
}

/**
 * 
 * @param overrideParentProperties Only Applies to Objects - Should conflicting keys from the parent be overriden
 * @param deepCopy Should nested properties be deep-copied or just shallow copied (more performant)
 * @returns 
 */
export function Inherited(overrideParentProperties:boolean=true, deepMerge:boolean=false){

    return function(target: Nestable, propertyKey: string|symbol|number){
        // If it is an array or JSON, include the properties of the parent, and override depending on preference
        // Otherwise, throw an error
        const symbol = Symbol(`Inherited Property for ${String(propertyKey)}`)
        const getter:BoundToNestable = function(){
            //@ts-expect-error
            const value = this[symbol]
            const parent = this["getParent"]()
            if(!parent){
                return value
            }
            else{
                //@ts-expect-error
                const parentProp = parent[symbol]
                let toReturn = overrideParentProperties?{...parentProp, ...value}:{...value, ...parentProp}
                // Form an aggregate of the parent and the current node
                if(deepMerge){
                     toReturn = overrideParentProperties?merge(parentProp, value):merge(value, parentProp)
                }

                return toReturn
            }
        }
        const setter:BoundToNestableSetter = function(data:object){
            if(typeof data !== "object"){
                throw new Error("@Inherited() Decorated Properties must be objects")
            }
            //@ts-expect-error
            this[symbol] = data
            
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        })
        
        
    }

}