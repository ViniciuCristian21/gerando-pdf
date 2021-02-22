// Importando modulos express, ejs, pdf e path
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')

// Criando uma const APP e passando express
const app = express()


const passengers = [
    {
        name:"Joyce",
        flightNumber:7859,
        time:"18:00h",
    },
    {
        name:"Steve",
        flightNumber:7859,
        time:"18:00h",
    },
    {
        name:"Julia",
        flightNumber:7859,
        time:"18:00h",
    },
]

// passando em get tudo que for request e response (Pedido e Resposta) utilizando arrow function
app.get('/', (request, response) => {
    // Passando o caminho (path) do meu HTML com .join utilizando __dirname para apontar o diretorio, pasando para filePath
    const filePath = path.join(__dirname, "print.ejs")
    //  vai achar o caminho e passar os argumentos e fazer uma funçao para mostrar erros no caminho
    ejs.renderFile(filePath,{ passengers }, (err, html) => {
        if(err){
            return response.send('Erro na leitura do arquivo')
        }
        // configuraçoes da pagina
        const options = {
            height: "11.25in",
            width: "8.5in",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }
        }

        // Criando Pdf 
        pdf.create(html, options).toFile("report.pdf", (err, data ) => {
            if(err){
                return response.send("Erro ao gerar o PDF")
            }

            // Enviar para o navegador
            return response.send(html)
        })
    })
})

app.listen(3000)