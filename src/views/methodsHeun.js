export default function heun(start, stop, step, A, B) {
    let xLocal = start;
    let tStart = 0;
    let table = [];
    let i = 0;

    table.push({"i": i, "x": xLocal, "t": tStart, 'h': step});

    while (tStart < stop) {
        let fTiUi = (A * xLocal) + B;
        xLocal += step * ((fTiUi + (A * (xLocal + step * fTiUi) + B)) / 2.0);
        tStart += step;
        i++;
        table.push({"i": i, "x": xLocal, "t": tStart, 'h': step});
    }
    return table;
}