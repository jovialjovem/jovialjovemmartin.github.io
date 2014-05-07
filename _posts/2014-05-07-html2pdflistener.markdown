---
layout: post
title:  "Usando o FlyingSaucer para gerar PDFs com JSF"
date:   2014-05-07 10:00:00
comments: true
categories: java pdf flyingsaucer report
---

A geração de relatórios em formato PDF é uma das funcionalidades mais pedidas
em sistemas web, em especial os de uso interno. Nesse ponto, se você usa JSF,
tem algumas soluções open-source satisfatórias e outras soluções proprietárias
 que eu, pessoalmente, já utilizei e não gostei nem um pouco. Dentre as
 soluções open-source, uma das mais comuns é o Jasper Reports.

Eu, pessoalmente, nunca gostei do Jasper Reports. Você pode fazer modelos de
relatórios usando a interface gŕafica, etc, tudo parece muito fofinho, muito
bonito, mas quando você utiliza Jasper você acaba se deparando com alguns
problemas, em especial se você usa JSF:

* Você tem tabelas e relatórios no seu sistema, mas precisa construir novos
modelos específicos no Jasper Reports, fazendo com que você, efetivamente,
duplique seus modelos.
* O iReport não é WYSIWYG de jeito nenhum. O PDF resultante costuma ter muitas
falhas, em especial diferenças gritantes de posicionamento de elementos e
espaçamento entre os mesmos.
* O Jasper possui algumas idiossincrasias com o uso de SubReports e afins que
podem deixar qualquer um de cabelo em pé

Por esse motivo, eu decidi, em um certo projeto, utilizar uma solução baseada
em uma biblioteca chamada FlyingSaucer. Esta biblioteca utiliza o iText e
possui um renderizador de HTML e CSS razoavelmente completo. Em cima dela, eu
criei minha própria solução, denominada [Html2PDFListener](https://github.com/joaomc/html2pdflistener)

## Html2PDFListener

Esta solução consiste, basicamente, de um PhaseListener do JSF que verifica
um parâmetro que você configura antes de retornar o resultado de uma action.
Esse parâmetro indica o HTML resultante deve, ao invés de ser retornado para o
usuário, ser capturada e transformada em um arquivo PDF, que deve, esse sim,
ser enviado para o usuário.


## Usando o HTML2PdfListener

Usar o Html2PDFListener é fácil.

### Incluindo o repositório

Inclua no arquivo pom.xml a referência ao repositório:

{% highlight xml %}
<repository>
    <id>html2pdflistener.repo</id>
    <name>html2pdflistener.repo</name>
    <url>https://raw.github.com/joaomc/html2pdflistener-repo/master/repository/</url>
</repository>
{% endhighlight %}

### Incluindo a dependência

Ok, agora você pode incluir a dependência o projeto

{% highlight xml %}
<dependency>
    <groupId>br.com.christ.jsf</groupId>
    <artifactId>html2pdflistener</artifactId>
    <version>1.2.4</version>
</dependency>
{% endhighlight %}

### Incluindo o PhaseListener

Agora, você só precisa incluir no faces-config.xml a referência ao PhaseListener

{% highlight xml %}
<lifecycle>
<phase-listener>br.com.christ.jsf.html2pdf.listener.Html2PDFPhaseListener</phase-listener>
</lifecycle>
{% endhighlight %}

Pronto, seu projeto já pode usar o Html2PDFListener!

## Exemplo

Vamos supor que a action "gerar_relatorio" direcione o usuário para uma página
HTML específica. Se você quiser que essa página seja transformada em PDF, simplesmente
inclua no ManagedBean uma injeção ao PDFConverterConfig:

{% highlight java %}
@Inject
private PDFConverterConfig pdfConverterConfig;
{% endhighlight %}

Depois, adicione a linha abaixo antes do retorno da action:

{% highlight java %}
pdfConverterConfig.setEnablePdf(true);
{% endhighlight %}

Por exemplo:
{% highlight java %}
public String gerarRelatorio() {
    pdfConverterConfig.setEnablePdf(true);
    return "gerar_relatorio";
}
{% endhighlight %}

Tcharam! O relatório será mostrado como um PDF para o usuário! Se você quiser
mudar o nome do arquivo PDF que será exibido:

{% highlight java %}
public String gerarRelatorio() {
    pdfConverterConfig.setEnablePdf(true);
    pdfConverterConfig.setFileName("meuRelatorio.pdf");
    return "gerar_relatorio";
}
{% endhighlight %}

Há algumas outras configurações que você pode fazer. Confira em [https://github.com/joaomc/html2pdflistener](https://github.com/joaomc/html2pdflistener)

