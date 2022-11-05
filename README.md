# Rule-engine

Definizione del linguaggio

-Nell'npm per definizione del linguaggio si intende le strutture di azioni/eventi e oggetti interattivi
che sono soggetti di verifica di condizione e quindi eventi verificati da regole.
Eventi e azioni sono sinonimi ma vengono trattati diversamente come zucchero sintattico e per differenziarliin caso di interfaccia generica ad un insieme
di azioni specifico per il linguaggio utilizzato dal motore.

-La struttura che definisce le azioni che triggerano la condizione di una regola o che vengono emittate dalla regola è un record
immutable con i campi che definiscono l'azione secondo la logica di "soggetto azione oggetto", infatti ha i seguenti parametri:

    uuid(id univoco)
    subj_uuid (definito nell'interactiveOjectType)
    action (definita nell'eventType essendo un evento o in RuleActionType)
    obj_uuid (oggetto che subisce l'action)
    index (in caso di lista *emitt rule)

-Per definire il linguaggio occorre definire degli eventType e dei ruleActionType specifici per il motore.
Il file EventType definisce eventi generici dell'interfaccia, nel nostro caso il 'click' del player su un qualsiasi interactive Object definito, definisce traformandone lo stato in stringa.

Il file RuleActionType definisce eventi specifici alla situazione in cui è utilizzato il motore, nel caso di utilizzo (pac-pac) sono definite tramite stringa azioni come
il cambio di sfondo, entrata in una scena, una transizione e così via.

Definite le azioni, si definiscono gli oggetti che agiscono o subiscono queste.
In interactiveObject tramite record è definita la struttura degli oggetti, i campi di questo variano in base al caso d'uso del rule engine
nel caso specifico sono stati utilizzati i seguenti campi:

    uuid
    name 
    type
    media 
    mask
    audio
    visible
    vertices
    properties
    activable

Esclusi quelli precedentemente citati sono campi specifici al caso d'uso, in questo caso abbiamo campi come media, mask, audio e visible che sono utilizzati nell'interfaccia.
interactiveObjectType è la definizione dei vari tipi di oggetti interattivi che verranno utilizzati, ogni tipo segue la struttura sopra definita, per definire il linguaggio del motore
è molto importante che vengano definiti nello specifico appunto gli oggetti interattivi che si utilizzeranno in questo file.

Operatori

Operators.js definisce gli operatori e superoperatori che compongono le condizioni e super condizioni.
per gli operatori si tratta di maggiore, maggiore uguale, uguale, minore, minore uguale o diverso, mentre i super operatori, essendo operatori delle super condizioni per legare due o più condizioni insieme come meccanismo di 'all' e 'any' sono and e or logici, in aggiunta per casi specifici è implementato anche il not seppur poco utilizzato nell'enduser developer poichè l'utente tende a verificare una condizione così com'è e non con la sua negazione.

Condizioni e SuperCondizioni

La classe Condition definisce le condizioni.
Il suo costruttore prende per la creazione come parametri un uuid, uuid dell'oggetto per cui si ha la condizione, un operatore ed uno stato definito come stringa.
Mentre la classe SuperCondition ha come parametri l'id univoco che distingue la superconditione, un superoperatore(di default è un and) e le condizioni che la compongono.

è utile utilizzare la mappa definita in maps.js per definire serie di ruleAction, operators e value predefiniti dal linguaggio.
Per definire valori standard che possono avere campi degli interactive object vengono definiti in values.js scrivendo il valore con la sua stringa di stato, come negli esempi del file.

Rules

Le regole vengono definite in rule.js tramite un record immutable con i seguenti campi:

    uuid (id univoco)
    event (evento che attiva la regola)
    condition (Condizioni o supercondizioni della regola)
    actions (azione o lista di azioni che emitta in caso di verifica della condizione)
    name (nome della regola)
    prioritize (in caso si voglia dare la priorità ad una regola rispetto alle altre)

A questa struttura è seguita una lista di funzioni definite in rules_utils per la manipolazione di regole presenti nel motore.
Tramite i metodi:

generateDefaultRule: per la crezione di una regola di default.
setProperty: setta una proprietà con valore alla regola.
addEmptyAction: aggiunge un'azione vuota alla lista di azioni che può emittare la regola.
deleteAction: cancella un'azione presente nella lista.
addEmptyCondition: aggiunge una condizione vuota alla regola.
deleteCondition: cancella la codizione/supercondizione presente nella regola.
checkCompletationsRules: effettua un check della completezza della regola, nell'enduser Developer è utile a livello di interfaccia per controllare che l'utente abbia compilato tutti i campi della regola.

Valutazione di una condizione

ConditionsUtils.js è il file che contiene la funzione principale di tutto il progetto ovvero la evalCondition, funzione che permette appunto di valutare la condizione di una regola in base ad uno stato corrente del sistema (nel nostro caso una lista di eventi dell'engine).
Ha come parametri una condizione/supercondizione c ed uno stato corrente.
In caso di condizione vuota o nulla restituisce sempre true.
Se c è una supercondizione allora viene richiamata la evalcondition sulle condizioni che la compongono.
Effetuato il controllo e verificata la stringa di stato, segue uno switch dove per l'operatore di c si ha la valutazione secondo l'operatore della condizione, sullo stato di c e lo stato passato alla funzione.

Engine.js

Classe che estende eventemitter2 per poter emittare gli eventi di una regola in caso di valutazione positiva della stessa.

-Parametri:
RuleList: è la lista di regole che verranno verificate in base agli eventi in input.
EventList: è la lista degli evente, è in versione di lista perchè è utile per simulare il funzionamento del motore indipendente da un inferfaccia che da input, in caso di implementazione di un'interfaccia viene sostituita idealmente da degli eventlistener che creano una coda di eventi per cui si devono verificare le regole.

-Metodi:
addRule(rule): è la funzione che permette di aggiungere una regola creata alla lista delle regole da verificare.
addEvent(event): inserisce in coda alla lista di eventi, l'evento inserito.
run(): Funzione che effettivamente si occupa di far 'girare' il rule engine, tramite due for annidati scorre per una regola tutti gli eventi e così per tutte le regole (in caso di prioritizing viene verificata la regola con priorità maggiore), se l'evento è lo stesso che fa attivare la regola, allora si valuta la condizione della regola secondo lo stato corrente in caso di condizione true, è possibile emittare le azioni(azione in caso sia una sola nelle liste di azioni di return) della regola e inserile in coda alla eventlist (azioni ed eventi sono la stessa cosa) in modo che si possa avere anche una reazione a catena fra regole.

in index.js viene esportato il modulo npm.

/*
testing
regole testate in index.js
*/












 