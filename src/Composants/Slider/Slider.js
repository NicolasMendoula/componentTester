import './slider.css';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

/* Slider de photo */

const Slider = ({imagesList})=> {
    //Initialisation
    const [sliderSize, setSliderSize] = useState('');
    let wrapperStyle = {"width":(imagesList.length)*100+'%'};
    let imgStyle = {"width":100/(imagesList.length)+'%'};
    let container = useRef(null);

    //Créer la navigation du slider
    const navigateSlider = (e) =>{
       let direction = e.target.id;
       let wrapper = e.target.parentElement.querySelector('.sliderWrapper');
       let marge = 0;
       let slider = ()=>{
           return new Promise(resolve => {
            let interval = setInterval(()=>{
                wrapper.style.marginLeft = marge+'%';
                     if(direction === 'suivant'){
                        if(Math.abs(marge) > 100){
                            clearInterval(interval);
                            resolve();
                        }else{
                            marge--;
                        }
                    }
                    if(direction === 'precedent'){
                        if(marge === 0){
                            clearInterval(interval);
                            resolve();
                        }else{
                            marge++;
                        }
                    }
            },3);
           })
       }

       if(direction === 'suivant'){
        slider().then(()=>{
            wrapper.append(wrapper.firstChild);
            (wrapper.parentElement).nextSibling.querySelectorAll('img').forEach((img)=>{
                if(img.alt === wrapper.firstChild.alt){
                    img.parentElement.classList.add('current');
                }else{
                    img.parentElement.classList.remove('current');
                }
            })
            wrapper.style.marginLeft = 0;
        })
        }
        if(direction === 'precedent'){
            marge = -100;
            wrapper.prepend(wrapper.lastChild);
            wrapper.style.marginLeft = '-100%';
            slider();
        }
    }

     //Permet de changer la classe en fonction de la taille du slider
    function resize(container){
        if(container !== null){
            const width = container.clientWidth;
            container.style.height = width*(9/16)+'px';
            let classe;
            if(width > 1024){
                classe = 'large';
            }
            if(width < 1024){
                classe = 'medium';
            }
            if(width < 500){
                classe = 'small';
            }
            setSliderSize(classe);
        }
    }
    
     //A charger après le rendu
     useEffect(()=>{
         if(sliderSize ===''){
            setTimeout(()=>resize(container.current),0);
         }
    });

    //Ce qui se passe quand on redimensionne la fenêtre
    window.addEventListener('resize',()=>{
        resize(container.current);
    })

    let changeImage = (e)=>{
        let indexImage = e.target.getAttribute('alt');
        let navigation = e.target.closest('.minNav');
        navigation.querySelectorAll('li').forEach((item)=> item.classList.remove('current'));
        e.target.closest('li').classList.add('current');
        let image;
        (container.current).querySelectorAll('img').forEach(img => {
            if(img.alt === indexImage){
                image = img;
            }
        });
        (container.current).querySelector('.sliderWrapper').prepend(image);
    };
       
    return(
        <React.Fragment>
        <div>
        <div className={"sliderContainer "+sliderSize} ref={container} >
                <div className="sliderWrapper" style={wrapperStyle}>
                    {imagesList.map((item, index)=> <img style={imgStyle} src={item.default} key={index} alt={index} />)}
                </div>
                <button className="navBouton" id="precedent" onClick={navigateSlider}>◄</button>
                <button className="navBouton" id="suivant" onClick={navigateSlider}>►</button>
        </div>
        <div className="minNavWraper">
            <ul className="minNav">
                {imagesList.map((item,index)=>{
                    return(<li style={imgStyle} key={'liste'+index} className={index === 0 ? 'current' : null} >
                                <img src={item.default}  alt={index} onClick={changeImage}/>
                            </li>);
                })}
            </ul>
        </div>
        </div>

        </React.Fragment>
       )
    
}

export default Slider; 