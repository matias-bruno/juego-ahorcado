function dibujarLinea(x1, y1, x2, y2, canvas) {
    let lapiz = canvas.getContext("2d");
    lapiz.lineWidth = 3;
    lapiz.beginPath();
	lapiz.moveTo(x1, y1);
	lapiz.lineTo(x2, y2);
    lapiz.strokeStyle = "black";
    lapiz.stroke();
}
function dibujarCirculo(x, y, r, canvas) {
    let lapiz = canvas.getContext("2d");
    lapiz.lineWidth = 3;
    lapiz.beginPath();
	lapiz.arc(x,y,r,0,2*3.14);
    lapiz.strokeStyle = "black";
    lapiz.stroke();
}
function dibujarAhorcado(cuentaErrores) {
    let dibujo = document.querySelector("canvas");
    switch(cuentaErrores) {
        case 0:
            dibujarLinea(50,300,250,300,dibujo);
            break;
        case 1:
            dibujarLinea(100,300,100,50,dibujo);
            break;
        case 2:
            dibujarLinea(100,50,200,50,dibujo);
            break;
        case 3:
            dibujarLinea(200,50,200,100,dibujo);
            break;
        case 4:
            dibujarCirculo(200,115,15,dibujo);
            break;
        case 5:
            dibujarLinea(200,130,200,160,dibujo);
            break;
        case 6:
            dibujarLinea(200,160,220,180,dibujo);
            break;
        case 7:
            dibujarLinea(200,160,180,180,dibujo);
            break;
        case 8:
            dibujarLinea(200,130,220,150,dibujo);
            break;
        case 9:
            dibujarLinea(200,130,180,150,dibujo);
            break;
    }
}