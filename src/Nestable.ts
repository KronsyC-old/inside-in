
const kIsRoot = Symbol("Is Root?")
const kChildren = Symbol("Children")
const kParent = Symbol("Parent")
export const kInheritedRawPropertyStore = Symbol("Inherited Raw Property Store")
export const kDefaultPropertyForFromRoot = Symbol("Default Property for FromRoot Decorator")
type StringIndexed = {
    [x:symbol|string|number]:any
}

export default class Nestable{
    private [kIsRoot]:boolean;
    private [kChildren]:this[] = [];
    private [kParent]? : this;
    private [kInheritedRawPropertyStore]:StringIndexed = {}
    private [kDefaultPropertyForFromRoot]:StringIndexed={}

    constructor(){
        // Root Node by default
        this[kIsRoot] = true
    }

    public addChild(child:this){
        if(child === this){
            throw new Error("Nestable cannot be it's own child")
        }
        if(!child[kParent]){
            
            child[kParent] = this
            child[kIsRoot] = false
        }
        this[kChildren].push(child)
    }
    public getChildren(): this[]{
        return this[kChildren]
    }
    public deepGetChildren(){
        const children:this[] = []
        this.getChildren().forEach( child => {
            children.push(child)
            children.push(...child.deepGetChildren())
        } )
        return children
    }
    public getRootNode() : this{
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

