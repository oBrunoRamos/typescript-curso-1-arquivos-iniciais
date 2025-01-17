import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mesagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoControlller{

      private inputData: HTMLInputElement;
      private inputQuantidade: HTMLInputElement;
      private inputValor: HTMLInputElement;
      private negociacoes = new Negociacoes();
      private negociacoesView = new NegociacoesView('#negociacoesView');
      private mensagemView = new MensagemView('#mensagemView');

      constructor(){
            this.inputData = document.querySelector('#data');
            this.inputQuantidade = document.querySelector('#quantidade');
            this.inputValor = document.querySelector('#valor'); 
            this.negociacoesView.update(this.negociacoes);
      }

      public adiciona(): void{
            const negociacao:Negociacao =  Negociacao.creiaDe(
                  this.inputData.value,
                  this.inputQuantidade.value,
                  this.inputValor.value
            )

            if(!this.ehDiaUtil(negociacao.data)){
                  this.mensagemView.update('Apenas negociações em dias uteis são aceitas');
                  return;
            }
                  
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView(); 
        
         
      }

      private ehDiaUtil(data: Date): boolean{
            return data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO;
      }

      private limparFormulario(): void{
            this.inputData.value = '';
            this.inputQuantidade.value = '';
            this.inputValor.value = '';

            this.inputData.focus();
      }

      private atualizaView(): void{
            this.negociacoesView.update(this.negociacoes);
            this.mensagemView.update('Negociação adicionada com sucesso');
      }

}