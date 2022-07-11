import { Row, Col, Button } from "react-bootstrap";
import '../App.css'

const GameOptionsComp = ({ disks, setDisks, reset, solve, inAction, towerOne }) => {

  const resetDisk = (disks)=>{
    setDisks(3)
    reset()
  }

  return (
    <Row>
      <Col>
        <span>Discos: {disks}</span>
        <Button
          className="button-container button-number"
          variant="outline-secondary"
          onClick={()=>setDisks(disks+1)}
          disabled={inAction || towerOne.stack.size !== disks}
        >
          +
        </Button>
        <Button
          className="button-container button-number"
          variant="outline-secondary"
          onClick={()=>setDisks(disks-1)}
          disabled={disks===1 || inAction || towerOne.stack.size !== disks}
        >
          -
        </Button>
      </Col>
      <Col>
        <Button 
          className="button-container"
          variant="outline-secondary"
          onClick={()=>reset()}
          disabled={inAction}
        >
          Reiniciar
        </Button>
        <Button 
          className="button-container"
          variant="outline-secondary" 
          onClick={()=>solve()}
          disabled={inAction || towerOne.stack.size !== disks}
        >
          Resolver
        </Button>
        <Button 
          style={{marginLeft: '200px'}}
          className="button-container"
          variant="outline-secondary" 
          onClick={()=>resetDisk(3)}
          disabled={inAction}
          >
          Resetear Valores
        </Button>
      </Col>
    </Row>
  );
};

export default GameOptionsComp;
