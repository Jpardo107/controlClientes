import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { clienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:Cliente[];
  cliente: Cliente = 
  {
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }

  @ViewChild("clienteForm") clienteForm: NgForm
  @ViewChild('botonCerrar') botonCerrar: ElementRef
  constructor(private clientesServicio:clienteServicio, private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {this.clientes = clientes}
    )
  }

  getSaldoTotal()
  {
    let saldoTotal:number = 0;
    if(this.clientes)
    {
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo
      })
    }
    return saldoTotal;
  }

  agregar({value, valid}:{value: Cliente, valid:Boolean})
  {
    if(!valid)
    { 
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClas: 'alert-danger', timeout: 4000
      });
    }
    else
    {
      this.clientesServicio.agregarCliente(value)
      this.clienteForm.resetForm()
      this.cerrarModal()
    }
  }

  private cerrarModal()
  {
    this.botonCerrar.nativeElement.click();
  }
}
