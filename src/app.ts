
export interface ExprAlg<R> {
    add(left: R, right: R): R
    sub(left: R, right: R): R
    mul(left: R, right: R): R
    div(left: R, right: R): R
    val(value: number): R
}

const executor: ExprAlg<number> = {
    add: (left: number, right: number) => left + right,
    sub: (left: number, right: number) => left - right,
    mul: (left: number, right: number) => left * right,
    div: (left: number, right: number) => left / right,
    val: (value: number) => value
}

const printer: ExprAlg<string> = {
    add: (left: string, right: string) => `${left} + ${right}`,
    sub: (left: string, right: string) => `${left} - ${right}`,
    mul: (left: string, right: string) => `${left} * ${right}`,
    div: (left: string, right: string) => `${left} / ${right}`,
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

const priorityPrinter: ExprAlg<Print> = {
    add: (left: Print, right: Print) => new Print(`${left.print(1)} + ${right.print(1)}`, 1),
    sub: (left: Print, right: Print) => new Print(`${left.print(1)} - ${right.print(1)}`, 1),
    mul: (left: Print, right: Print) => new Print(`${left.print(2)} * ${right.print(2)}`, 2),
    div: (left: Print, right: Print) => new Print(`${left.print(2)} / ${right.print(2)}`, 2),
    val: (value: number) => new Print(value.toString(), 3)
}

function toEmoji(n: number): string {
    return [...n.toString()].map ( c => {switch(c) {
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

const emojiPrinter: ExprAlg<Print> = {
    add: (left: Print, right: Print) => new Print(`${left.print(1)} ➕ ${right.print(1)}`, 1),
    sub: (left: Print, right: Print) => new Print(`${left.print(1)} ➖ ${right.print(1)}`, 1),
    mul: (left: Print, right: Print) => new Print(`${left.print(2)} ✖ ${right.print(2)}`, 2),
    div: (left: Print, right: Print) => new Print(`${left.print(2)} ➗ ${right.print(2)}`, 2),
    val: (value: number) => new Print(toEmoji(value), 3)
}

export type ExprTF = <R>(a: ExprAlg<R>) => R

export const exprTf: ExprAlg<ExprTF> = {
    add: (left: ExprTF, right: ExprTF) => a => a.add(left(a), right(a)),
    sub: (left: ExprTF, right: ExprTF) => a => a.sub(left(a), right(a)),
    mul: (left: ExprTF, right: ExprTF) => a => a.mul(left(a), right(a)),
    div: (left: ExprTF, right: ExprTF) => a => a.div(left(a), right(a)),
    val: (value: number) => a => a.val(value)
}

const exprExample = exprTf.add(exprTf.val(10), exprTf.mul(exprTf.val(20), exprTf.add(exprTf.val(5), exprTf.val(30))))

const r1 = exprExample(executor)
const r2 = exprExample(printer)
const r3 = exprExample(priorityPrinter)
const r4 = exprExample(emojiPrinter)

console.log(r1)
console.log(r2)
console.log(r3.print())
console.log(r4.print())

// import { Telegraf } from "telegraf";

// const tg = new Telegraf(process.env.TG_BOT_TOKEN!)

// tg.start((ctx) => ctx.reply("Добро пожаловать!!!"))

// tg.launch()