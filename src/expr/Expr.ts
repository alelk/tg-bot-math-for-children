export interface ExprAlg<R> {
    add(left: R, right: R): R
    sub(left: R, right: R): R
    mul(left: R, right: R): R
    div(left: R, right: R): R
    val(value: number): R
 }

export type ExprTF = <A>(e: ExprAlg<A>) => A

export const exprTf: ExprAlg<ExprTF> = {
    add: (left: ExprTF, right: ExprTF) => alg => alg.add(left(alg), right(alg)),
    sub: (left: ExprTF, right: ExprTF) => alg => alg.sub(left(alg), right(alg)),
    mul: (left: ExprTF, right: ExprTF) => alg => alg.mul(left(alg), right(alg)),
    div: (left: ExprTF, right: ExprTF) => alg => alg.div(left(alg), right(alg)),
    val: (value: number) => alg => alg.val(value)
}

const someExpr = exprTf.add(exprTf.mul(exprTf.val(10), exprTf.val(2)), exprTf.val(5))

const printer: ExprAlg<string> = {
    add:  (left: string, right: string) => `${left} + ${right}`,
    sub:  (left: string, right: string) => `${left} - ${right}`,
    mul:  (left: string, right: string) => `${left} * ${right}`,
    div:  (left: string, right: string) => `${left} / ${right}`,
    val: (value: number) => value.toString()
}

const executor: ExprAlg<number> = {
    add:  (left: number, right: number) => left + right,
    sub:  (left: number, right: number) => left - right,
    mul:  (left: number, right: number) => left * right,
    div:  (left: number, right: number) =>  left / right,
    val: (value: number) => value
}

const r = someExpr(executor)
const r2 = someExpr(printer)