/* Fonction qui va permettre à la page de défiler */
const defilementDoux = function (e){
    e.preventDefault(); //On empêche le suivi normal du lien
    e.stopPropagation();
    let id = e.target.closest('a').hash;
    let target = document.querySelector(id);
    let targetOffset = target.offsetTop;
    let currentOffset = document.querySelector('html').scrollTop;
    let pas = (target.offsetTop - currentOffset)/30;
    
    //Fonction qui va venir changer le menu
    let scroller = () => {
        setTimeout(() => {
            currentOffset+= pas;
            document.querySelector('html').scrollTop = currentOffset;
            if(Math.round(currentOffset) !== Math.round(targetOffset)){
                scroller();
            }
        }, 1);
    }
    scroller();
}

export default defilementDoux;