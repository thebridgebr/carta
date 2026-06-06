const nome = document.getElementById("nome");
const ataque = document.getElementById("ataque");
const defesa = document.getElementById("defesa");
const gamesense = document.getElementById("gamesense");
const pvp = document.getElementById("pvp");
const equipe = document.getElementById("equipe");
const mecs = document.getElementById("mecs");


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
div1_img.src = "DIV1SM.png"
div2_img.src = "DIV2SM.png"
div3_img.src = "DIV3SM.png"




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


botao.addEventListener("click", async () => {
    botao.disabled = true;
    botao.textContent = "CARREGANDO!";
    const uuid = await pegar_uuid(nome.value);

    const foto_l = `https://visage.surgeplay.com/bust/500/${uuid}`;

    try{
        const r = await(fetch(foto_l));
        const d = await r.blob();

        const calasewing = URL.createObjectURL(d);
        const foto = new Image();
        foto.src = calasewing;

        foto.onload = (() => {
            context.font = `300 ${fs}px "Oswald"`;

            context.clearRect(0, 0, cw, ch);
            //quem reclamar fala com a mao 
            context.drawImage(div1_img, -175, -75, 1024, 1024);
            context.drawImage(foto, 250, 75, 0+350, 0+350);

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

            context.fillText(`${equipe.value}EQP`, 380, stats_down); 
            context.fillText(`${mecs.value}MEC`, 380, stats_down+fs); 
            context.fillText(`${gamesense.value}GMS`, 380, stats_down+fs+fs); 


            context.textAlign = "center";
            context.font = `350 ${fs+15}px "Oswald"`;


            const valores = [pvp.value , ataque.value , defesa.value , equipe.value , mecs.value , gamesense.value]
            let media = 0;
            for (i = 0; i < valores.length; i++){
                media += parseInt(valores[i]);
            }
            console.log(media/6)
            media = Math.trunc(media/6)


            context.fillText(`${media}`, 190, 100); 
            context.fillText(`ATQ`, 190, 100+fs+20); 
            context.font = `350 ${fs}px "Oswald"`;


            URL.revokeObjectURL(calasewing);
        });

    }
    catch (error){
        botao.disabled = false;
        botao.textContent = "deu merda ai vida segue.";

        return;
    }

    botao.disabled = false;
    botao.textContent = "proxima carta";

});
