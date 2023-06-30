import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})

export class EditarUserComponent {
  formulario!: FormGroup

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarUser(parseInt(id!)).subscribe((user) => {
      this.formulario = this.formBuilder.group({
        id:[id],
        name:[user.name],
        age: [user.age],
        birthday:[user.birthday],
        phoneNumber:[user.phoneNumber],
        address: [user.address]
      })
    }
    )
  }

  editarUser(){
    this.aniversario()
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarUsers'])
    })
  }

  deleteUser(){
    const id = this.route.snapshot.paramMap.get('id')
    this.service.deletar(parseInt(id!)).subscribe(()=> {
      this.router.navigate(['/listarUsers'])
    })
  }

  aniversario(){

    const date = new Date()
    const dataAniversario = new Date(this.formulario.controls['birthday'].value)

    const idade:number = date.getFullYear() - dataAniversario.getFullYear()

    this.formulario.controls['age'].setValue(idade)


  }


}

