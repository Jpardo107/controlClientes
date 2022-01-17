import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { clienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:Cliente[];
  constructor(private clientesServicio:clienteServicio) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {this.clientes = clientes}
    )
  }

}
