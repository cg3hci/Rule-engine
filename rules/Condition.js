import {Operators} from "./Operators.js";
/*
Classe Condition definisce la struttura della condizione
con l'id univoco della condizione stessa, l'uuid dell'object passato con un operatore che confronta
con uno state.
 */
/**
 * @param uuid, default null
 * @param obj_uuid, default null
 * @param operator, default null
 * @param state, default null
 * @type Class
 */
class Condition {

    constructor(uuid = "", obj_uuid = "", state = "", operator = null){
        this.uuid = uuid;
        this.obj_uuid = obj_uuid;
        this.operator = operator;

        if(operator === Operators.IN){
            let s = state.split("");
            this.lower = s[0];
            this.upper = s[1];
        } else {
            this.state = state;
        }

    }
}

export default Condition;