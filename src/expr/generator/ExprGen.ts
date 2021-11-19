// import { AddExpr, ExprAlg, SubExpr, ValExpr } from "../Expr";

// export interface ExprGen {
//     generate(): ExprAlg
// }

// export function randomInt(from: number, to: number) {
//     return Math.floor(Math.random()  * (to - from))
// }

// export class AddExprGen implements ExprGen {
//     from: number
//     to: number
    
//     constructor(from: number, to: number) {
//         this.from = from
//         this.to = to
//     }

//     generate(): ExprAlg {
//         return new AddExpr(new ValExpr(randomInt(this.from, this.to)), new ValExpr(randomInt(this.from, this.to)))
//     }
// }

// export class SubExprGen implements ExprGen {
//     from: number
//     to: number
    
//     constructor(from: number, to: number) {
//         this.from = from
//         this.to = to
//     }

//     generate(): ExprAlg {
//         return new SubExpr(new ValExpr(randomInt(this.from, this.to)), new ValExpr(randomInt(this.from, this.to)))
//     }
// }

// export class MulExprGen implements ExprGen {
//     from: number
//     to: number
    
//     constructor(from: number, to: number) {
//         this.from = from
//         this.to = to
//     }

//     generate(): ExprAlg {
//         return new SubExpr(new ValExpr(randomInt(this.from, this.to)), new ValExpr(randomInt(this.from, this.to)))
//     }
// }

// export class DivExprGen implements ExprGen {
//     from: number
//     to: number
    
//     constructor(from: number, to: number) {
//         this.from = from
//         this.to = to
//     }

//     generate(): ExprAlg {
//         return new SubExpr(new ValExpr(randomInt(this.from, this.to)), new ValExpr(randomInt(this.from, this.to)))
//     }
// }