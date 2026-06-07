const nome = document.getElementById("nome");
const pais = document.getElementById("pais");
const div = document.getElementById("div");

const ataque = document.getElementById("ataque");
const defesa = document.getElementById("defesa");
const gamesense = document.getElementById("gamesense");
const pvp = document.getElementById("pvp");
const equipe = document.getElementById("equipe");
const mecs = document.getElementById("mecs");

const mod = document.getElementById("mod");
const escore = document.getElementById("escore");




const botao = document.getElementById("processar");

const canvas = document.getElementById("carta-porra");
const cw = 700;
const ch = 900;
const context = canvas.getContext("2d");
context.textBaseline = "top";
context.textAlign = "center";

const fs = 60;


// const fs = 50;
// context.font = `300 ${fs}px "Space Grotesk"`;

const div1_img = new Image();
const div2_img = new Image();
const div3_img = new Image();
div1_img.src = "divz/DIV1SM.PNG"
div2_img.src = "divz/DIV2SM.PNG"
div3_img.src = "divz/DIV3SM.PNG"




async function pegar_uuid(nome){
    const minecraft_url = `https://crafthead.net/profile/${nome}`;
    
    try{
        const r = await(fetch(minecraft_url));
        const d = await r.json();

        return d.id;
    }
    catch (error){
        return "";
    }
}

async function criar_carta(){
    botao.disabled = true;
    botao.textContent = "CARREGANDO!";
    
    
    const uuid = await pegar_uuid(nome.value);
    const sigmas = [
        `https://visage.surgeplay.com/bust/500/${uuid}`,
        `https://flagcdn.com/w320/${pais.value}.png`,
        `divz/DIV${div.value}SM.PNG`
    ]
    const fp = sigmas.map(async (s) => {
        const r = await(fetch(s));
        const d = await r.blob();
        const calasewing = URL.createObjectURL(d);
        
        return new Promise((r, x) => {
            const foto = new Image();
            foto.onload = (() => r(foto));
            foto.onerror = (() => x("deu merda"));
            foto.src = calasewing;
        });
    });
    const fotos = await Promise.allSettled(fp);


    //quem reclamar pode   fala com a mao 
    context.font = `300 ${fs}px "Oswald"`;
    context.clearRect(0, 0, cw, ch);

    if (fotos[2].status === "fulfilled") context.drawImage(fotos[2].value, -175, -75, 1024, 1024);
    if (fotos[0].status === "fulfilled") context.drawImage(fotos[0].value, 250, 75, 0+350, 0+350);
    if (fotos[1].status === "fulfilled") context.drawImage(fotos[1].value, 150, 265, 80, 53);

    context.textAlign = "center";
    if (nome.value.length > 14) {
        context.font = `300 ${fs-11}px "Oswald"`;
        context.fillText(`${nome.value}`, 335, 470); 
        context.font = `300 ${fs}px "Oswald"`;
    }
    else{
        context.fillText(`${nome.value}`, 335, 470); 
    }
    context.textAlign = "start";
    
    const stats_down = 565;
    context.fillText(`${pvp.value}PVP`, 130, stats_down); 
    context.fillText(`${ataque.value}ATQ`, 130, stats_down+fs); 
    context.fillText(`${defesa.value}DEF`, 130, stats_down+fs+fs); 

    context.fillText(`${equipe.value}EQP`, 390, stats_down); 
    context.fillText(`${mecs.value}MEC`, 390, stats_down+fs); 
    context.fillText(`${gamesense.value}GMS`, 390, stats_down+fs+fs); 


    context.textAlign = "center";
    context.font = `350 ${fs+15}px "Oswald"`;


    const valores = [pvp.value , ataque.value , defesa.value , equipe.value , mecs.value , gamesense.value]
    let media = 0;
    for (i = 0; i < valores.length; i++){
        media += parseInt(valores[i]);
    }
    if (escore.value === ""){
        context.fillText(`${Math.trunc(media/6)}`, 190, 100); 
    }
    else{
        context.fillText(`${escore.value}`, 190, 100); 

    }



    if (mod.value == "AUT"){
        if (parseInt(defesa.value)-10 > parseInt(ataque.value)){
            context.fillText("DEF", 190, 100+fs+20); 
        }
        else if (parseInt(ataque.value)-10 > parseInt(defesa.value)){
            context.fillText("ATQ", 190, 100+fs+20); 
        }
        else{
            context.fillText("HIB", 190, 100+fs+20); 
        }
    }
    else{
        context.fillText(`${mod.value}`, 190, 100+fs+20); 
    }
    context.font = `350 ${fs}px "Oswald"`;




    botao.disabled = false;
    botao.textContent = "proxima carta";
}
criar_carta()

botao.addEventListener("click", criar_carta);

