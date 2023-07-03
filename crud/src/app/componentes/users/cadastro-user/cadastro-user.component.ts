import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/service/user-service.service';
import { validatorTelefone } from './validatorTelefone'

@Component({
  selector: 'app-cadastro-user',
  templateUrl:'./cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.scss']
})
export class CadastroUserComponent implements OnInit{

  formulario!: FormGroup

  constructor(
    private service: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  /*
   const id = this.route.snapshot.paramMap.get('id') testa issso da e se for True ele passa os dados do usuario para o formulario igual no editar, se não foca como tá aqui mesmo
  */

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name:['',[
        Validators.required,
        Validators.minLength(2)

      ]],

      age: ['', [
        Validators.required]],
      birthday:['', [
        Validators.required]],
      phoneNumber:['',[
        Validators.required,
        Validators.minLength(10),
        validatorTelefone]
        ],
      address: ['', [Validators.required]]
    })

  }

criarPensamento(){
  this.aniversario()
  if(this.formulario.valid){
    this.service.criar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarUsers'])
    })
  }else{

  }
}

aniversario(){

  const date = new Date()
  const dataAniversario = new Date(this.formulario.controls['birthday'].value)

  const idade:number = date.getFullYear() - dataAniversario.getFullYear()

  this.formulario.controls['age'].setValue(idade)

}

}
