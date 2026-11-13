/** Small data constructors shared by the two admissions-test collections. */
export const tex = String.raw;

export function technique(name, nameZh, explanation, core, formula, method, example, pitfall, scope = '') {
  return { name, nameZh, text: explanation, explanation, core, formula, method, example, pitfall, scope, keywords: [name, nameZh], extensions: [] };
}

export function multipleChoice(id, title, question, choices, answer, hint, solution) {
  return { id: `tmua-original-${id}`, title, question, choices, answer, hint, solution, proof: false, origin: 'original', format: 'MULTIPLE CHOICE' };
}

export function linkedProblem(id, title, question, hint, solution, proof = false, scope = '') {
  return { id: `step-original-${id}`, title, question, hint, solution, proof, scope, origin: 'original', format: 'LINKED PARTS' };
}
