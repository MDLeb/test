const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
new Board(ctx);

let coll1 = new Collection();
    coll1.set('c', 123);
    coll1.set('c', 123);
    coll1.set('b', 564);
    coll1.set('b', 1);
    coll1.set('f', 000);
console.log(coll1.getDataObj());

let coll2 = new Collection();
    coll2.set('a', 123);
//console.log(coll2.getDataArr());

let coll3 = new Collection();
    coll3.set('f', 000);
//console.log(coll3.getDataArr());

