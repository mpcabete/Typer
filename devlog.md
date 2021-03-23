==================(5/3)
-pesquisei dominios e um pocuo de sites pra comprar
-comecei um tutorial mais aprofundado de react
https://www.youtube.com/watch?v=Ke90Tje7VS0

-criei o app
-instalei bootstrap e importei pro index.js
-luz acabou
-consegui capturar o evento do teclado
    -se colocar o evento (window.addevent...) no construtor do componente ele é disparado 2 vezes
-fiz a função pra checar e deletar a letra se tiver certa


amanha:
[]pesquisar melhor sobre os livros de dominio publico
[x]pesquisar jeito de colocar as letra como svg
[]integrar d3 pq quero aprender mais a mexer nele
[x]texto com o fade pra direita
[x]backspace
[?]cps
[x]wpm
==============================================(6/3)
-coloquei texto como svg
-coloquei o fade no texto
    usei o gradiente do css como fill do svg
-fiz o log dos dados
-fiz modulo pra calcular wpm
-fiz o contador de erros
-implementei backspace
[]pesquisar sobre os livros
    -Mention that the catalog and the ebooks are coming from Feedbooks using our name or our logo, and link back to Feedbooks if possible
    -Don't limit our catalog to a subset of the whole thing, if you provide an ebook store for example, you also need to include the store part of our catalog (contact us if you'd like to set up an affiliation agreement)
    -aprendendo sobre xml
    https://standardebooks.org/opds/all
[]pensar melhor sobre o timer/botao de reset
===============================================(7/3)
-arrumei o bug das teclas q n sao caracteres
-fiz a barra de espaço nao rolar a pagina
-arrumei o contador de erros q tinha quebrado por causa do backspace
-dei tentei colocar 1 livro mas larguei mao

================================================(8/3)
-implementei o timer
-planejamento da estrutura do site:
-implementei a funcionalidade de jogar desafio
-separei uma pagina "play" do desafio em si
================================================(9/3)
-pesquisei um pouco sobre gatsby e app dinamico junto
    -parece tranquilo de fazer, ou implemento no q ja tem ou tento aprender graphql e gatsby do 0
- mudei o whitespace da fonte
    -se mudei na hr de exibir na tela so, se tiver '_' no texto o user ainda vai ter q digitar _ e vai ficar confuso.
        -substituir _ por ' ' antes de inserir o texto
    -talvez seja melhor mudar no texto e no input do q no display...
        -eh melhor pq se não em todas as visualizações vou ter q mudar.
    -talvez seja melhor mudar por css...
        -vo dexa assim por enquanto
- adicionei o texto aleatorio
    -vou ter q ajeitar algumas coisas quando tiver pensando sobre as configurações, se o texto vai ser configuração global ou um 'modo'


================================================(10/3)
-criei um site gatsby com um subdominio dinamico pro app
-upei pro gatsby
-arrumei o bug de n adicionar aos erros se for a tecla certa mas ja tiver algum erro acumulado
-implementei a funcionalidade de salvar o log no storage local(foi mais facil q pensei)
-implementei a estatistica de accuracy(foi mais trampo do q pensei)
-implementei a estatistica comparando accuracy com o desempenho do jogo passado
    -comecei a importar do wpm
        -ja exportei a função q retorna só o valor
        
=================================================(11/3)
 -resolvi o bug do programa quebrar quando n tem history e ele tenta gerar o delta
 -coloquei o delta acurracy e o acurracy no mesmo modulo
 -implementei o delta wpm
 -arrumei o bug do delta wpm NaN
 -arrumei wrap do texto colorido
 -coloquei legenda pro texto colorido

=================================================(13/3)
-fiz a linha do grafico do historico
-fiz os eixos x e y

=================================================(14/3)
-consegui fazer o router funcionar
-coloquei os links das paginas do app na navbar do app
-coloquei os graficos de wpm e precisao no stats
-mexi no css do stats
[]definir largura do chart por css, renderizar o svg com a class e pegar no component did mount
[]colocar circulos no grafico
=================================================(16/3)
-comprei o dominio
-coloquei analytics
-me aprofundei no gatsby

=================================================(17/3)
-mudei site metadata
    -falta imagem do icone

-mudei indice
    -falta imagem

=================================================(18/3)
-comecei o historico da pagina stats

=================================================(19/3)
-implementei função de selecionar partidas no historico
    []colocar uma mensagem quando tiver menos de 2 selecionados
    []colocar o historico na ordem inversa
    []botao de delete
    []selectAll/periodo
    []contagem de partidas
    []soh recordes
    []limite de ticks

=================================================(20/3)
-coloquei cores pra cada dedo e overlay do teclado
-coloquei a opçao de configurar cor do texto e ingnorar backspace

=================================================(22/3)
-encontrei listas boas de palavras de varias linguas
-fiz funçãozinha pra selecionar n palavras aleatorias de acordo com a frequencia de cada uma
-transformei as listas em json
-configurei o gatsby pra servir as listas estaticamente
-configurar o componente pra gerar e exibir as palavras aleatorias

==================================================(23/3)
-adicionei a configuraçao pra mudar a linguagem no settings
-configurei componente pra acessar a linguagem selecionada no settings
-coloquei opção pra ver os rounds no eixo x dos graficos do stats
-adicionei as bolinhas no grafico de linha do stats

=================================================(amanhã)
[]arrumar bug do espaço com focus no tema
[]arrumar bug do backspace
[x]fazer uma visualização pro log
    []diferenciar grafico do dia e global
    [x]grafico de linha do progresso global
        -ajeitar melhor o codigo
        -melhorar styles
        -ajeitar lables
    [-]sanfona com os log
        -tem soh as datas e wpm e quando clicka sobe o texto/erros
        -botao de excluir
[]timing de cada letra global



[]ajeitar a landing page e as paginas acessorias
[]aplicar pra ADSENSEE!!
- criar paginas/rotas pra planejamento

    []style do text dos svg igual do p
[]tirar a dependencia random words q tem vulnerabilidades
===========================
-client 
    [x]exibir o texto base
        -texto em cima e ir destacando 
            -deletar input a cada palavra
        -texto inline e ir deletando
        -svg?
        -nuvem de palavras
        [x]indicador dos whitespace(principalmente nos erros)
        []cursor
            -cor invertida?
        []implementar paragrafos/quebra de linha
    [x]detectar se a tecla certa foi apertada
        [x]diferenciar maiusculas e min
        [?]ignorar maiusculas e min
            -sepa no preprocessamento
        [x]efeito visual para os erros
            []mudar cor dos characteres dependendo do tanto de erro global
        []efeito sonoro pra erros
            -micro aleatoriedade por tecla
        [x]funcionalodade do backspace
    [x]remover letra quando for certa
    [x]calcular wpm
        [x]timer  
        [x]freestyle
        -cache/local storage?
    [x]handle keys tipo alt
    [x]dicas de posicionamento dos dedos
    []overlay de um teclado
        -usar overlay pra visualizar heatmap de algum dado
            -erros



-server
    -banco de dados
        []client
        []textos base
        []users
            -estatisticas


-features
    - textos base
        []selecionar um livro de dominio público como base
            -busca
                -titulo, lingua, data
        []lista de palavras comuns
        []fazer upload de um epub/txt
        []pagina aleatoria da wikipedia
        []codigo de projetos open source
        []destacar letras q o user mais erra

    - estatísticas
        []grafico tempos a->b e b->a
            - Ir pelo array vendo o deta t, e colocar num graph charA→charB
        [x]mais erros:
            - a -> b
        [x]delay de cada letra
        []taxa de characteres/s durante uma sessão
            -marcar os erros e espaços
        []heatmap de erros/velocidade no teclado
        []grafico de linha texto no exo x e vel no y
        []grafico cps
        []relatorio?
        
        - user:
            []evolução de wpm de um user
                -wpm/dias
                -wpm/horas de treino
                -separar desafios e treinos?
                -categorias tipo "tecnica1, tecnica2"
            []metas de wpm
            []total de letras/palavras digitadas
                -nuvem de palavras
            []sistema de ranking/pontos
                -premios?
                    -livros digitais
    []diferentes temas
        []modo noturno
        -feita pela comunidade?
    []jogo de corrida entre 2 pessoas
        -integração com face?
    []guitar hero

    -conteudos
        -wpm da fala humana
        -aprendendo tatica nova e curva de aprendizado
        -pq teclado n eh em ordem alfabetica
        -code faster


================================site tree:
-pagina inicial
    -header
        -()artigos pro SEO
        -()app
        -(?)donate
        -()pagina inicial

        app
            -rotas
            -home
                -header
                -paginas
    
    ()treino
        ()botão iniciar desafio
            -abre o input text
            -quando termina vai pra uma tela de estatisticas gerais do desafio
                ()outro desafio
                ()voltar
                ()mais estatisticas
        -modo livre/treino
            ()estatisticas a sessao
            ()salvar
            ()reiniciar
            ()voltar
    -análize
        -stats gerais
            -accuracy
            -keystrokes
        -historico de desafios
    
    -planejamento
        metas


    -configs
        ()estilo de input
        ()hilight dos erros
        ()desligar backspace
        ()limpar historico
        (?)fonte
    -auth
    --opções de texto
