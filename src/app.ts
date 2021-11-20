export interface ExprAlg<R> {
    add(left: R, right: R): R
    sub(left: R, right: R): R
    mul(left: R, right: R): R
    div(left: R, right: R): R
    val(value: number): R
 }

 const printer: ExprAlg<string> = {
    add:  (left: string, right: string) => `${left} + ${right}`,
    sub:  (left: string, right: string) => `${left} - ${right}`,
    mul:  (left: string, right: string) => `${left} * ${right}`,
    div:  (left: string, right: string) => `${left} / ${right}`,
    val: (value: number) => value.toString()
}

class Print {
    expr: string
    priority: number
    constructor(expr: string, priority: number) {
        this.expr = expr
        this.priority = priority
    }
    print(outerPriority: number = 0): string {
        return outerPriority > this.priority ? `(${this.expr})` : this.expr
    }
}

// 1 - Сложение и вычитание
// 2 - Умножение
// 3 - Литерал

const priorityPrinter: ExprAlg<Print> = {
    add:  (left: Print, right: Print) => new Print(`${left.print(1)} + ${right.print(1)}`, 1),
    sub:  (left: Print, right: Print) => new Print(`${left.print(1)} - ${right.print(1)}`, 1),
    mul:  (left: Print, right: Print) => new Print(`${left.print(2)} * ${right.print(2)}`, 2),
    div:  (left: Print, right: Print) => new Print(`${left.print(2)} / ${right.print(2)}`, 2),
    val: (value: number) => new Print(value.toString(), 3)
}

function toEmoji(n: number) {
    return [...n.toString()].map(c => {switch(c) {
        case '0': return '0️⃣'
        case '1': return '1️⃣'
        case '2': return '2️⃣'
        case '3': return '3️⃣'
        case '4': return '4️⃣'
        case '5': return '5️⃣'
        case '6': return '6️⃣'
        case '7': return '7️⃣'
        case '8': return '8️⃣'
        case '9': return '9️⃣'
    }}).join('')
}

function toNObjects(n: number) {
    return [...Array(n)].map(_ => '🐱').join('')
}

const emojiPrinter: ExprAlg<Print> = {
    add:  (left: Print, right: Print) => new Print(`${left.print(1)} ➕ ${right.print(1)}`, 1),
    sub:  (left: Print, right: Print) => new Print(`${left.print(1)} ➖ ${right.print(1)}`, 1),
    mul:  (left: Print, right: Print) => new Print(`${left.print(2)} ✖ ${right.print(2)}`, 2),
    div:  (left: Print, right: Print) => new Print(`${left.print(2)} ➗ ${right.print(2)}`, 2),
    val: (value: number) => new Print(toEmoji(value), 3)
}

const funPrinter: ExprAlg<Print> = {
    ...emojiPrinter,
    val: (value: number) => new Print(toNObjects(value), 3)
}

const executor: ExprAlg<number> = {
    add:  (left: number, right: number) => left + right,
    sub:  (left: number, right: number) => left - right,
    mul:  (left: number, right: number) => left * right,
    div:  (left: number, right: number) =>  left / right,
    val: (value: number) => value
}

export type ExprTF = <A>(e: ExprAlg<A>) => A

// const exprTfInstance1: ExprTF = <A>(e: ExprAlg<A>) => e.val(1234)
// exprTfInstance1(printer)
// exprTfInstance1(executor)

export const exprTf: ExprAlg<ExprTF> = {
    add: (left: ExprTF, right: ExprTF) => alg => alg.add(left(alg), right(alg)),
    sub: (left: ExprTF, right: ExprTF) => alg => alg.sub(left(alg), right(alg)),
    mul: (left: ExprTF, right: ExprTF) => alg => alg.mul(left(alg), right(alg)),
    div: (left: ExprTF, right: ExprTF) => alg => alg.div(left(alg), right(alg)),
    val: (value: number) => alg => alg.val(value)
}

const someExpr = exprTf.add(exprTf.mul(exprTf.val(10), exprTf.add(exprTf.val(2), exprTf.val(3))), exprTf.val(5))



const r = someExpr(executor)
const r2 = someExpr(printer)

console.log(r)
console.log(r2)
console.log(someExpr(priorityPrinter).print())
console.log(someExpr(emojiPrinter).print())
console.log(someExpr(funPrinter).print())

// import { Telegraf } from "telegraf";

// const tg = new Telegraf(process.env.TG_BOT_TOKEN!)

// tg.start((ctx) => ctx.reply("Добро пожаловать!!!"))

// tg.launch()