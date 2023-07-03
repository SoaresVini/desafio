import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/service/user-service.service';
import { validatorTelefone } from './validatorTelefone'
import { User } from 'src/app/model/user';
import { validatorData } from './validatorData';

@Component({
  selector: 'app-cadastro-user',
  templateUrl:'./cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.scss']
})
export class CadastroUserComponent implements OnInit{

 formulario = this.formBuilder.group({
      id: [''],
      name:['',[
        Validators.required,
        Validators.minLength(2)
      ]],
      age: new FormControl<number | null>(null, { validators:[Validators.required]}),
      birthday:['', [Validators.required, validatorData]],
      phoneNumber:['',[validatorTelefone]]  
      ,
      address: ['', [Validators.required]]
    })
  private edit! : boolean

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.service.buscarUser(parseInt(id!)).subscribe((user: any | User) => {

        Object.keys(user).forEach((key: string, value) =>{
          this.formulario.get(key)?.setValue(user[key])
        })


        // this.formulario = this.formBuilder.group({
        //   id:[id],
        //   name:[user.name],
        //   age: [user.age],
        //   birthday:[user.birthday],
        //   phoneNumber:[user.phoneNumber],
        //   address: [user.address]
        // })
      }
    )
    this.edit = true
    }else{
      this.edit = false
    }

  }

usuario(){

  this.aniversario()
  const user = {
    name: this.formulario.controls['name']?.value!,
    age: this.formulario.controls['age']?.value!,
    birthday: this.formulario.controls['birthday']?.value!,
    phoneNumber: this.formulario.controls['phoneNumber']?.value!,
    address: this.formulario.controls['address']?.value!
  } as User;
  
  if(!(this.edit)){
    if(this.formulario.valid){
      this.service.criar(user).subscribe(() => {
        this.router.navigate(['/listarUsers'])
      })
  }
  }else{
    
    if(this.formulario.valid){
      const ediuser = {
        id: this.formulario.get("id")?.value,
        ...user
      } as User;
      this.service.editar(ediuser).subscribe(() => {
        this.router.navigate(['/listarUsers'])
      })
  }
  }
}

aniversario(){

  const date = new Date();
  const data = this.formulario.controls['birthday']?.value!;
  const dataAniversario = new Date(data)

  const idade:number = date.getFullYear() - dataAniversario.getFullYear()

  if(date.getMonth > dataAniversario.getMonth){

    if(date.getDay > dataAniversario.getDay){
      idade -1
    }

  }

  this.formulario.controls['age'].setValue(idade)


}

}