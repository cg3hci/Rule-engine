import Immutable from 'immutable';
/*
Definizione del linguaggio delle azione del rule engine,
schema soggetto azione su oggetto con un index in caso si abbia una lista di azioni
(Azioni = Eventi)
 */

/**
 * @param subj_uuid, default null
 * @param action, default null
 * @param obj_uuid, default null
 * @type {*|Immutable.Record.Class}
 */

const Action = Immutable.Record({

    uuid: null,
    subj_uuid: null, //subject
    action: null,    //action
    obj_uuid: null,  //object
    index: 0,        //creation order

});

export default Action;