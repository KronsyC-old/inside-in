
const kIsRoot = Symbol("Is Root?")
const kChildren = Symbol("Children")
const kParent = Symbol("Parent")
export const kInheritedRawPropertyStore = Symbol("Inherited Raw Property Store")
export const kDefaultPropertyForFromRoot = Symbol("Default Property for FromRoot Decorator")
type StringIndexed = {
    [x:string]:any
}

export default class Nestable{
    private [kIsRoot]:boolean;
    private [kChildren]:Nestable[] = [];
    private [kParent]? : Nestable;
    private [kInheritedRawPropertyStore]:StringIndexed = {}
    private [kDefaultPropertyForFromRoot]:StringIndexed={}

    constructor(parent?:Nestable){
        this[kParent] = parent 
        this[kIsRoot] = parent?false:true
    }

    public addChild(nestable:Nestable){
        if(nestable === this){
            throw new Error("Nestable cannot be it's own child")
        }
        if(!nestable[kParent]){
            
            nestable[kParent] = this
            nestable[kIsRoot] = false
        }
        this[kChildren].push(nestable)
    }
    public getChildren(){
        return this[kChildren]
    }
    public deepGetChildren(){
        const children:Nestable[] = []
        this[kChildren].forEach( child => {
            children.push(child)
            children.push(...child.deepGetChildren())
        } )
        return children
    }
    public getRootNode() : Nestable{
        
        if(this[kIsRoot]){
            return this
        }
        else if(this[kParent]){
            return this[kParent]!.getRootNode()
        }
        else{
            throw new Error("Cannot Get Root Node For Nestable")
        }
    }
    public getParent(){
        if(this[kParent]){
            return this[kParent]
        }else{
            return undefined
        }
    }

}

