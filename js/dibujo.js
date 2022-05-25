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
            dibujarLinea(100,350,300,350,dibujo);
            break;
        case 1:
            dibujarLinea(200,350,200,50,dibujo);
            break;
        case 2:
            dibujarLinea(200,50,275,50,dibujo);
            break;
        case 3:
            dibujarLinea(275,50,275,100,dibujo);
            break;
        case 4:
            dibujarCirculo(275,115,15,dibujo);
            break;
        case 5:
            dibujarLinea(275,130,275,160,dibujo);
            break;
        case 6:
            dibujarLinea(275,160,255,180,dibujo);
            break;
        case 7:
            dibujarLinea(275,160,295,180,dibujo);
            break;
        case 8:
            dibujarLinea(275,130,255,140,dibujo);
            break;
        case 9:
            dibujarLinea(275,130,295,140,dibujo);
            break;
    }
}