import './style/general.css';
import Header from './Composants/Header';
import Footer from './Composants/Footer';
import React from 'react';
import Slider from './Composants/Slider/Slider';
import Lateral from './Composants/Lateral';
import logo from './assets/images/logo.jpg';
import { useState, useEffect, useRef } from 'react';
import defilementDoux from './scripts/smoothScrolling';


const importAll = (r)=>{

return(r.keys().map(r));
}

let images = importAll(require.context('./assets/images',false,/image([0-9]+)\.(jpg|png|gif)$/));

function App() {

  let [listeMenus, setListMenu ] = useState(null);
  let mainBlock = useRef(null);



  useEffect(()=>{
    if(listeMenus == null){
      //Obtenir la liste des sections pour définir le menu
      setListMenu(mainBlock.current.querySelectorAll('section'));
    }
  },[listeMenus])


  return (

    <React.Fragment>
      <Header listeMenus={listeMenus} smoothScroll={defilementDoux} />
      <Lateral logo={logo} />
      <main className="mainContainer" ref={mainBlock}>
        <section id="SectionA">
            <div className="flex">
              <Slider imagesList ={images} />
              <div className="explication">
                <h2>Diaporama</h2>
                <p>Voici un exemple de diaporama développé avec React</p>
                <Slider imagesList ={images} />
              </div>
            </div>
        </section>
        <section id="SectionB">
            <h2>Liste des composant</h2>
            <div className="flex">
              <div>
                <h3>Slider</h3>
                <p>Un composant simple qui héberge un diaporama</p>
                <p>Les images sont chargées depuis un contexte local mais on peut aussi les charger à partir d'une URL fournie par un fichier JSON par exemple</p>
                <p>On peux le mettre partout et il est responsive.</p>
              </div>
              <div>
                <h3>Meteo</h3>
                <p>Voici un Composant qui donne la météo locale (ici Paris). Il utilise une API de météo appelée <a href="https://www.weatherapi.com/"> weatherapi</a></p>
              </div>
              <div>
                <h3>Menu dynamique</h3>
                <p>Ce composant permet de créer un menu dynamique en fonction du nombre de sections existantes sur la page.</p>
              </div>
            </div>
        </section>
        <section id="SectionC">
          <h2>Section C</h2>
          Section C
        </section>
      </main>
      <Footer logo={logo} listeMenus={listeMenus} smoothScroll={defilementDoux} />
    </React.Fragment>
  );
}

export default App;
