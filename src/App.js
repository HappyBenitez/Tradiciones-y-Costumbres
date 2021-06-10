import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, Tradición: "Dia de Muertos", Costumbre: "15 años" },
  { id: 2, Tradición: "Gelaguetza", Costumbre: "Guadalupe Reyes" },
  { id: 3, Tradición: "Charrería", Costumbre: "piñatas" },
  { id: 4, Tradición: "La Catrina", Costumbre: "Posadas" },
  { id: 5, Tradición: "Gastronomía", Costumbre: "Ramo y Liga de Bodas"},
  { id: 6, Tradición: "Lucha libre", Costumbre: "Remedios caseros" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id:"",
      Tradición: "",
      Costumbre: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].tradición = dato.tradición;
        arreglo[contador].costumbre = dato.costumbre;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar la información "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
    <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Selecciona</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tradición</th>
                <th>Costumbre</th>
                <th>Información</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.tradición}</td>
                  <td>{dato.costumbre}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)} >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id} />
            </FormGroup>
            
            <FormGroup>
              <label>
              Tradición: 
              </label>
              <input
                className="form-control"
                name="tradición"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.tradición} />
            </FormGroup>
            
            <FormGroup>
              <label>
                Costumbre: 
              </label>
              <input
                className="form-control"
                name="costumbre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.costumbre} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)} >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()} >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Agregar Información</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1} />
            </FormGroup>
          
          <ModalBody> 
            <FormGroup>
              <label>
              Tradición: 
              </label>
              <input
                className="form-control"
                name="tradición"
                type="text"
                onChange={this.handleChange} />
            </FormGroup>
            
            <FormGroup>
              <label>
                Costumbre: 
              </label>
              <input
                className="form-control"
                name="costumbre"
                type="text"
                onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()} >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal></>
    );
}
}
export default App;