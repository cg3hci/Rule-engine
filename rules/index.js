/*const RuleActionTypes = require("./RuleActionTypes");
const InteractiveObjectsTypes = require("./InteractiveObjectsTypes");
const EventTypes = require("./EventTypes");
const Action = require("./Action");
const Rule = require("./Rule");
const Engine = require("./Engine");
*/

//module.exports = require('./json_rule_engine')

import Rule from "./Rule.js";
import Action from "./Action.js";
import InteractiveObjectsTypes from "./InteractiveObjectsTypes.js";
import EventTypes from "./EventTypes.js";
import RuleActionTypes from "./RuleActionTypes.js";
import Engine from "./Engine.js";
import Immutable from "immutable";
import Condition from "./Condition.js";
import Values from "./Values.js";
import {Operators} from "./Operators.js";
import { v4 as uuid } from 'uuid';

//file di test specifico al linguaggio di pac pac in questo caso

let r = Rule({
    uuid : Math.floor(Math.random() * 100),
    name : 'regola della transizione ',
    event : Action({
        uuid: Math.floor(Math.random() * 100),
        subj_uuid: InteractiveObjectsTypes.PLAYER,
        action: EventTypes.CLICK,
        obj_uuid: 1,
    }),
    actions : Immutable.List([Action({
        uuid: Math.floor(Math.random() * 100),
        subj_uuid: InteractiveObjectsTypes.PLAYER,
        action: RuleActionTypes.TRANSITION,
    })]),
});

let e = Action({
    uuid: Math.floor(Math.random() * 100),
    subj_uuid: InteractiveObjectsTypes.PLAYER,
    action: EventTypes.CLICK,
    obj_uuid: 1,
});

let r1 = Rule({
    uuid : uuid.v4,//Math.floor(Math.random() * 100),
    name : 'regola dell\'interruttore ',
    event : Action({
        uuid: Math.floor(Math.random() * 100),
        subj_uuid: InteractiveObjectsTypes.PLAYER,
        action: EventTypes.CLICK,
        obj_uuid: 2,
    }),
    condition : new Condition(Math.floor(Math.random() * 100), 2, Values.ON, Operators.EQUAL),
    actions : Immutable.List([Action({
        uuid: Math.floor(Math.random() * 100),
        subj_uuid: 2,
        action: RuleActionTypes.CHANGE_STATE,
        obj_uuid: Values.OFF
    })]),
});

let engine = new Engine();
engine.addEvent(e);
engine.addRule(r);
console.log(engine.rules.length);
console.log(engine.eventlist.length);
engine.run();

