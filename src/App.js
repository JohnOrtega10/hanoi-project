import React, { useEffect, useState} from "react";
import GameOptionsComp from "./components/GameOptionsComp";
import TowerComp from "./components/TowerComp";
import WinMessageComp from "./components/WinMessageComp";
import Tower from "./utils/Tower";
import "./App.css";

const App = () => {
  //Contar el numero de movimientos
  const [moveCount, setMoveCount] = useState(0);
  //El disco que se está movimiendo
  const [dragTile, setDragTile] = useState();
  //Los discos para la torre principal
  const [disks, setDisks] = useState(3);

  //Los discos de cada torre (1, 2, 3)
  const [tiles, setTiles] = useState([]);
  const [tilesTwo, setTilesTwo] = useState([]);
  const [tilesThree, setTilesThree] = useState([]);

  const [inAction, setInAction] = useState(false)

  //Las 3 torres (columnas)
  let [towerOne, setTowerOne] = useState(new Tower());
  let [towerTwo, setTowerTwo] = useState(new Tower());
  let [towerThree, setTowerThree] = useState(new Tower());


  const towers = {
    1: {
      tower: towerOne,
    },
    2: {
      tower: towerTwo,
    },
    3: {
      tower: towerThree,
    },
  };
  
  //Agregar disk iniciales a la torre uno
  useEffect(()=>{
    const reset = () => {
      let towerTemp = new Tower() 
      for (let i = disks; i !== 0 ; i--) {
        towerTemp.add(i)
      }
      setTowerOne(towerTemp)
      towerTwo.stack.resetDisks()
      towerThree.stack.resetDisks()
      setMoveCount(0)
    };
    reset()
  },[disks, towerTwo.stack, towerThree.stack])

  //Actualizar todos los discos de las torres
  //Esta actualización se hará con cada movimiento de las torres
  useEffect(() => {
    setTiles(towerOne.stack.traverse());
  }, [towerOne, moveCount]);

  useEffect(() => {
    setTilesTwo(towerTwo.stack.traverse());
  }, [towerTwo, moveCount]);

  useEffect(() => {
    setTilesThree(towerThree.stack.traverse()); 
  }, [towerThree, moveCount]);

  const reset = () => {
    let towerTemp = new Tower() 
    for (let i = disks; i !== 0 ; i--) {
      towerTemp.add(i)
    }
    setTowerOne(towerTemp)
    towers[2].tower.stack.resetDisks()
    towers[3].tower.stack.resetDisks()
    setMoveCount(0)
  };

  const handleDrag = (e, tile, id) => {
    //Funcion que se lanza cada vez que movemos un disco que se encuentra en la parte superior de una torre
    const dragTile = { tile, towerId: id };
    if (towers[id].tower.stack.peek().value === dragTile.tile.value) {
      setDragTile(dragTile);
    } else {
      e.preventDefault();
    }
  };


  const handleDrop = (e) => {
    //Funcion que se lanza cada vez que un disco se deja en una nueva torre 
    const dropColumn = e.currentTarget.id; //ID de la columna de destino
    let source = towers[dragTile.towerId].tower; //Torre de origen
    let destination = towers[dropColumn].tower; //Torre de destino
    const goodMove = source.moveTopTo(destination); //Mover el disco desde la torre de origen al destino
    if(goodMove){ //Si es un movimiento valido -> incrementar los movimientos
      setMoveCount(moveCount+1); //Actualizar los movimientos
    }
    
  };
  
  const winCondition = towerThree.stack.size === disks; //COMPLETAR
  

  const solve = ()=>{
    setInAction(true)
    const generator = hanoi(disks, towerOne, towerThree, towerTwo)
    const interval = setInterval(() => {
        generator.next()
        setMoveCount(prev => prev+1)
        if(towerThree.stack.size === disks){
          setInAction(false)
          clearInterval(interval)
        }
    }, 700);
  
  }



  function* hanoi(n, ori, des, aux){
      if(n === 1){
        yield ori.moveTopTo(des)
      }else{
        yield* hanoi(n - 1, ori, aux, des)
        yield ori.moveTopTo(des)
        yield* hanoi(n - 1, aux, des, ori)
      }  
  };

  return (
    <>
      <div className="container">
        <GameOptionsComp 
          disks={disks} 
          setDisks={setDisks}
          reset={reset}
          solve={solve}
          inAction={inAction}
          towerOne={towerOne}
          setTowerTwo={setTowerTwo}
          setTowerThree={setTowerThree}
        />
        <div className="content">
          <TowerComp
            id={1}
            disks={tiles} 
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={2}
            disks={tilesTwo}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={3}
            disks={tilesThree}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        </div>
        {winCondition && (
          <WinMessageComp moveCount={moveCount}/>
        )}
        Movimientos: {moveCount}
      </div>
    </>
  );
};

export default App;
