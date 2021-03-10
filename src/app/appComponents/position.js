class Position{
    constructor(position,char,attempts){

        // id do texto?
        this.position=position
        this.char=char
        this.timestamp=new Date()
        this.attempts=attempts ?? null
    }
}
export default Position;