import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from '../../models/Departamento';

@IonicPage()
@Component({
  selector: 'page-departament-create',
  templateUrl: 'departament-create.html',
})
export class DepartamentCreatePage {

  formValidate: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.formValidate = this.formBuilder.group({
      initials: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ['', Validators.required]
    });
  }

  saveDepartament() {
    let departament = new Departamento();
    departament.nome = this.formValidate.value.initials;
    departament.descricao = this.formValidate.value.description;
    departament.status = 1;
    console.log(departament);
  }
}
