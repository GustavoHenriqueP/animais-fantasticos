export default class ScrollSuave {
  //* Como é um constructor, e não uma definição de função, não podemos passar o argumento padrão no estilo ES6+ = (links, options = { })
  constructor(links, options) {
    this.linksInternos = document.querySelectorAll(links);
    if (options === undefined) {
      this.options = { behavior: "smooth", block: "start" };
    } else {
      this.options = options;
    }

    //* É realizado o bind de função que será realizada como callback, para sempre considerar o this como objeto. Em que, quando uma função é declarada, o this depende do contexto de seu uso. Porém, aplicando o bind, o this sempre será o mesmo.

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);

    section.scrollIntoView(this.options);

    //* Seria para isso que o bind no constructor seria importante, a função removeEventListener só aceita o nome da função em si com o this correto, e não apenas um callback com arrow function.
    // event.target.removeEventListener("click", this.scrollToSection); FUNCIONA
    // event.target.removeEventListener("click", () => this.scrollToSection); NÃO FUNCIONA
  }

  addLinkEvent() {
    this.linksInternos.forEach((link) => {
      //* Arrow Function para considerar o this como o objeto criado pela classe, e não o link em que está sendo adicionado o evento. Porém, o problema é que se perde a referência à função de EventListener, pois  agora a scrollToSection pula ela e referencia diretamente o objeto em si. Com isso, não é possível remover o EventListener
      // link.addEventListener("click", (event) => {
      // this.scrollToSection(event);

      //* Não daria para fazer isso, por exemplo, pois o this iria apontar para o objeto.
      // this.removeEventListener();
      // });

      //* Agora, o script irá procurar primeiro essa função no corpo principal do objeto e irá achá-la, já declarada com o this definido como o objeto. Não precisando descer até o prototype para achar a função original, que possuía nenhum contexto já pré-definido.
      link.addEventListener("click", this.scrollToSection);
    });
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }

    return this;
  }
}
