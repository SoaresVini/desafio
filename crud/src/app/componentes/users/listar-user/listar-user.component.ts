import { User } from './../../../model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-listar-user',
  templateUrl: './listar-user.component.html',
  styleUrls: ['./listar-user.component.scss']
})
export class ListarUserComponent implements OnInit{

 listarUser: User[] = [];


constructor(
  private service: UserService,
  private router: Router
){}


ngOnInit(): void {
  this.buscaUser()
}

buscaUser(): void{
  this.service.buscar()
    .subscribe(users => this.listarUser = users )
}

deletarUser(id: any): void{
  this.service.deletar(parseInt(id!))
}

}
