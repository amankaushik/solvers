export default function eulerForward(start, stop, step, A, B) {
    let xLocal = start;
    let tStart = 0;
    let table = [];
    let i = 0;

    while (tStart < stop) {
        xLocal += step * ((A * xLocal) + B);
        tStart += step;
        i++;
        table.push({"i": i, "x": xLocal, "t": tStart, 'h': step});
    }
    return table;
}
