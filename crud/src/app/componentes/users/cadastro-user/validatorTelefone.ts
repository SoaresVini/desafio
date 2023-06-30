import { AbstractControl } from "@angular/forms";

export function validatorTelefone(control: AbstractControl){
  const telefone = control.value as string

  if(telefone.length >= 14){
    return { telefone: true }

  }else{
    return true
  }



}
