import './slider.css';
import { useEffect } from 'react';
import { useRef } from 'react';

/* Slider de photo */

const Slider = ({imagesList})=> {
    let wrapperStyle = {"width":(imagesList.length)*100+'%'};
    let imgStyle = {"width":100/(imagesList.length)+'%'};
    let container = useRef(null);
    
    const resize = (container)=>{
        const width = container.clientWidth;
        container.style.height = width*(9/16)+'px';
    }
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
            },1);
           })
            
       }
       if(direction === 'suivant'){
        slider().then(()=>{
            wrapper.append(wrapper.firstChild);
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
    
     useEffect(()=>{
         setTimeout(()=>{
            resize(container.current);
         },0);
         window.addEventListener('resize', ()=> resize(container.current));

     })

    return( <div className="sliderContainer" ref={container}>
                <div className="sliderWrapper" style={wrapperStyle}>
                    {imagesList.map((item, index)=> <img style={imgStyle} src={item.default} key={index} alt={index} />)}
                </div>
                <button className="navBouton" id="precedent" onClick={navigateSlider}>◄</button>
                <button className="navBouton" id="suivant" onClick={navigateSlider}>►</button>
            </div>)
    
}

export default Slider; 