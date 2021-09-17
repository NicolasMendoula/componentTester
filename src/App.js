import './style/general.css';
import Header from './Composants/Header';
import React from 'react';
import Slider from './Composants/Slider/Slider';

const importAll = (r)=>{

return(r.keys().map(r));
}

let images = importAll(require.context('./assets/images',false,/image([0-9]+)\.(jpg|png|gif)$/));

function App() {

  return (

    <React.Fragment>
      <Header />
      <section id="blockSlider" >
        <div className="container">
          <div className="flex">
            <Slider imagesList ={images} />
            <div className="explication">
              <h2>Diaporama</h2>
              <p>Voici un exemple de diaporama développé avec React</p>
              <p>Les images sont chargées depuis un contexte local mais on peut aussi les charger à partir d'une URL fournie par un fichier JSON par exemple</p>
              <p>On peux le mettre partout et il est responsive.</p>
              <Slider imagesList ={images} />
            </div>
          </div>
        </div>
      </section>
      <section id="essai">
        <div className="container">
          <h2>Et même en très grand !</h2>
          <h3>...ça donne faim</h3>
        </div>
        <Slider imagesList ={images} />
      </section>
      <footer>
        <div className="container">
          <p>Voici le code source du Composant</p>
          
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
