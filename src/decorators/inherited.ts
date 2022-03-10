import Nestable, { kInheritedRawPropertyStore } from "../Nestable";
import clone from "clone"

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
export function Inherited(overrideParentProperties:boolean=true, deepCopy:boolean=false){

    return function(target: Nestable, propertyKey: string){
        // If it is an array or JSON, include the properties of the parent, and override depending on preference
        // Otherwise, throw an error
        const getter:BoundToNestable = function(){
            const value = this[kInheritedRawPropertyStore][propertyKey]
            const parent = this.getParent()
            if(!parent){
                return value
            }
            else{
                //@ts-expect-error
                let parentProps = parent[propertyKey]
                // Form an aggregate of the parent and the current node
                if(deepCopy){
                     parentProps = clone(parentProps)
                }

                if(overrideParentProperties)return Object.assign(parentProps, value)
                else return Object.assign(value, parentProps)
            }
        }
        const setter:BoundToNestableSetter = function(data:object){
            if(typeof data !== "object"){
                throw new Error("@Inherited() Decorated Properties must be objects")
            }
            
            this[kInheritedRawPropertyStore][propertyKey] = data
            
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        })
        
        
    }

}