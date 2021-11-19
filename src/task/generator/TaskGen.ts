// import { ExprAlg } from "../../expr/Expr";
// import { AddExprGen } from "../../expr/generator/ExprGen";
// import { Task } from "../Task";

// export interface TaskGen {
//     generate(): Task
// }

// const genAddExpr1to10 = new AddExprGen(0, 10)

// function generateWrongAnswer(expr: ExprAlg): number {
//     switch(Math.floor(Math.random() * 10)) {
//         case 1: return expr.execute() + 1
//         case 2: return expr.execute() - 1

//     }
// }

// export const level1TaskGen: TaskGen = {
//     generate() {
//         const expr = genAddExpr1to10.generate()
//         return new Task(expr, expr.execute(), [])
//     }
// }