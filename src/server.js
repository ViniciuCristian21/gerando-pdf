// Importando modulos express, ejs, pdf e path
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')

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
// Criando uma nova rota (/pdf) e utilizando puppeteer 
app.get('/pdf', async(request, response) => {
    // iniciando o browser e utilizando o (await)
    const browser = await puppeteer.launch()
    // criando uma nova page
    const page = await browser.newPage()

    // pedindo para pagina ir para o edereço fornecido
    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    })

    // criando pdf e passando algumas configuraçoes com puppeteer
    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter',
        margin: {
            top:"20px",
            bottom:"40px",
            left:"20px",
            right:"20px"
        }
    })

    // Esperando o browser e fechando apos executar o codigo
    await browser.close()

    // Configurando o tipo de conteudo como application/pdf
    response.contentType("application/pdf")

    // Retornando o que esta na variavel pdf que e o propio pdf
    return response.send(pdf)
})

// passando em get tudo que for request e response (Pedido e Resposta) utilizando arrow function criando uma rota
app.get('/', (request, response) => {
    // Passando o caminho (path) do meu HTML com .join utilizando __dirname para apontar o diretorio, pasando para filePath
    const filePath = path.join(__dirname, "print.ejs")
    //  vai achar o caminho e passar os argumentos e fazer uma funçao para mostrar erros no caminho
    ejs.renderFile(filePath,{ passengers }, (err, html) => {
        if(err){
            return response.send('Erro na leitura do arquivo')
        }

        // Enviar para o navegador
        return response.send(html)
    })
})

// Escutando a porta em questão
app.listen(3000)