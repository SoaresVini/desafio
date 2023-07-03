import { TemplateLiteral } from "@angular/compiler";
import { AbstractControl } from "@angular/forms";

export function validatorData(control: AbstractControl): { [key: string]: any } | null {
    const returnData = control.value as string
    const dataNascimento = new Date(returnData)
    const dataAtual = new Date()
    
    if(dataNascimento > dataAtual){
        return {
            data: true
        }
    }
    const idade =  dataAtual.getFullYear() - dataNascimento.getFullYear() 

    if(idade < 10){
        return {
            idade: true
        }
    }

  return null;
}