import Immutable from "immutable"
import Values from "./Values.js";

/**
 * @type {*|Immutable.Record.Class}
 * @param uuid default null
 * @param name default null
 * @param type default null
 * @param media default empty string
 * @param vertices default empty string
 * @param properties default null, will contain specific properties of the object such as the state
 */
/*
interactiveObject definisce la struttura dei vari oggetti di cui stato viene verificato nella regola,
i campi del record dipendono dagli oggetti che si vogliono inserire nel linguaggio,
in questo caso sono presi di esempio i campi degli oggetti di pac pac.
 */
const InteractiveObject = Immutable.Record({

    uuid : null,
    name : null,
    type : null,
    media : null,
    mask: null,
    audio: null,
    visible: Values.VISIBLE,
    vertices : null,
    properties : null,
    activable: Values.ACTIVABLE,

});

export default InteractiveObject;