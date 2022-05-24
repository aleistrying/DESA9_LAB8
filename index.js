const express = require("express")
const app = express();
const createFibonacciSequence = (lengthO) => {
    let fibonacci = [0, 1];
    for (let i = 2; i < lengthO; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    return fibonacci.slice(0, lengthO);
}
//add cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/fibonacci", (req, res) => {
    const { length } = req.query;
    const fibonacci = createFibonacciSequence(length ?? 0);
    res.send({ sequence: fibonacci });
})

app.listen(3000, () => {
    console.log("listening to port 3000")
})