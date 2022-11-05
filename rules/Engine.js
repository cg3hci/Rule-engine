
import EventEmitter from 'eventemitter2'
import evalCondition from "./ConditionUtils.js";

/*
Classe Engine, estende event emitter per aver la possibilità di emittare l'evento a condizione di regola verificata.
composta da due liste, una di regole e una di eventi.
metodi: addRule(aggiunge la regola in coda alla rule list) *in caso di regola con priorità, in base a questa viene posizionata nella lista
        addEvent(aggiunge l'evento in coda alla event list)
        run(): si occupa di far girare l'engine, scorrendo entrambe le liste, per ogni regola scorre tutta la lista degli eventi
               eventi in lista solo per effettuare il testing, la eventlist è sostituita da un listener in caso di implemetazione
 */

class Engine extends EventEmitter {

    constructor(rules = [], eventlist = []) {
        super()
        this.rules = []
        this.eventlist = []
        rules.map(r => this.addRule(r))
    }


    addEvent(event) {
        this.eventlist.push(event)
    }

    addRule(rule) {
        this.rules.push(rule)
    }

    run() {
        console.log(".");
        for (let i = 0; i < this.rules.length; i++) {
            console.log(".");
            for (let j = 0; j < this.eventlist.length; j++) {
                console.log(".");
                if (this.rules[i].event.obj_uuid == this.eventlist[j].obj_uuid) {
                    let condition = evalCondition(this.rules[i].condition, this.eventlist[j].action);
                    console.log("la condizione della regola: " + this.rules[i].name + " non è verificata");
                    if (condition) {
                        //this.rules[i].action.emitevent, non sai la sintassi, stronzo
                        //actioncallback della serie di azioni della regola
                        console.log("la condizione della regola: " + this.rules[i].name + "è verificata");
                    }
                }
            }
        }

    };

    /*updateRule(rule){

    }*/


}
export default Engine
