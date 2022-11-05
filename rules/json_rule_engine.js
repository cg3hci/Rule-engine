import Engine from "./Engine.js";


export { Engine }
export default function (rules, event) {
    return new Engine(rules, event)
}


