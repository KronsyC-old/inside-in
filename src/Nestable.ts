
const kIsRoot = Symbol("Is Root?")
const kChildren = Symbol("Children")
const kParent = Symbol("Parent")

export default class Nestable{
    private [kIsRoot]:boolean;
    private [kChildren]:this[] = [];
    private [kParent]? : this;

    constructor(){
        // Root Node by default
        this[kIsRoot] = true
    }

    protected addChild(child:this){
        if(child === this){
            throw new Error("Nestable cannot be it's own child")
        }
        if(!child[kParent]){
            
            child[kParent] = this
            child[kIsRoot] = false
        }
        this[kChildren].push(child)
    }
    protected getChildren(): this[]{
        return this[kChildren]
    }
    protected deepGetChildren(){
        const children:this[] = []
        this.getChildren().forEach( child => {
            children.push(child)
            children.push(...child.deepGetChildren())
        } )
        return children
    }
    protected getRootNode() : this{
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
    protected getParent(){
        if(this[kParent]){
            return this[kParent]
        }else{
            return undefined
        }
    }

}

