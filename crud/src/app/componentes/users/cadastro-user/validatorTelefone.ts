import { TemplateLiteral } from "@angular/compiler";
import { AbstractControl } from "@angular/forms";

export function validatorTelefone(control: AbstractControl): { [key: string]: any } | null {
  const telefone = control.value as string

  const telefoneNumerico = telefone.replace(/\D/g, '')

  if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
    return { telefone: true }
  }

  const ddd = telefoneNumerico.slice(0, 2);
  const dddValidos = ['47', '11', '48','41']; 
  if (!dddValidos.includes(ddd)) {
    return { telefone: true }
  }

  return null
}