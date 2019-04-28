import eulerForward from "./methodsEF";

export default function eulerBackward(start, stop, step, A, B) {
    let xLocal = start;
    let tStart = 0;
    let table = [];
    let i = 0;

    table.push({"i": i, "x": xLocal, "t": tStart, 'h': step});

    while (tStart < stop) {
        let xLocalEF = eulerForward(start, tStart + step, step, A, B).pop();
        xLocal += step * ((A * xLocalEF.x) + B);
        tStart += step;
        i++;
        table.push({"i": i, "x": xLocal, "t": tStart, 'h': step});
    }
    return table;
}