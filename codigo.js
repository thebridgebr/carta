const nome = document.getElementById("nome");
const ataque = document.getElementById("ataque");
const defesa = document.getElementById("defesa");
const gamesense = document.getElementById("gamesense");
const s = document.getElementById("s");

const botao = document.getElementById("processar");



const canvas = document.getElementById("carta-porra");
const cw = 600;
const ch = 800;
const context = canvas.getContext("2d");
context.textBaseline = "top";

// const fs = 48;
// context.font = `300 ${fs}px "minecraft"`;

const fs = 50;
context.font = `300 ${fs}px "Space Grotesk"`;


const bg = new Image();
bg.src = "./aura.png"

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
            context.clearRect(0, 0, cw, ch);

            context.drawImage(bg, 0, 0, 450, 450);
            context.drawImage(foto, 0, 0, 450, 450);
            context.fillText(`${nome.value}`, 0, 450); 

            context.fillText(`${ataque.value} ATQ`, 0, 530); 
            context.fillText(`${defesa.value} DFS`, 250, 530); 
            context.fillText(`${gamesense.value} GMS`, 0, 610); 
            context.fillText(`${s.value} SIG`, 250, 610); 
           
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