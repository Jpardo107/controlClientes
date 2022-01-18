import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { clienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente:Cliente = 
  {
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  id:string
  constructor(private clientesServicio:clienteServicio, private flashMessages: FlashMessagesService,
              private router:Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.clientesServicio.getCliente(this.id).subscribe(cliente => 
      {
        this.cliente = cliente
      })
  }
  
  guardar({value, valid}:{value:Cliente, valid:Boolean})
  {
    if(!valid)
    {
      this.flashMessages.show('Por favor llena el formulario', {cssClass: 'alert-danger', timeout:4000})
    }
    else
    {
      value.id = this.id
      this.clientesServicio.modificar(value)
      this.router.navigate(['/'])
    }
  }

  eliminar()
  {
    if(confirm('¿Seguro desea eliminar este registro?'))
    {
      this.clientesServicio.eliminarCliente(this.cliente)
      this.router.navigate(['/'])
    }
  }
}
