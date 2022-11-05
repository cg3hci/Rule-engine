import Immutable from "immutable";


/**
 * @type {*|Immutable.Record.Class}
 * @param uuid default null
 * @param object_uuid default null, will contain the uuid of the obj the rule is associated to
 * @param event default null
 * @param condition default empty object
 * @param actions default empty array
 * @param name of the rule
 * @param global if the rule is global or not
 */

/*
Record rule, campi per la definizione di una regola
In casi particolari si può aggiungere un campo per far avere una priorità di una regola rispetto alle altre in lista
Sequenzialmente, una volta rilevato un'evento, si verifica la condizione della regola, in caso di verifica true, vengono
emittate le azioni presenti.
 */
const Rule = Immutable.Record({

    uuid : null,
    event : null,
    condition : {},
    actions : Immutable.List(),
    name: null,
    //type: "rule",
    //global : null,
    //Prioritize: null
});

export default Rule;