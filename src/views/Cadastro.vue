<template>
  <site-template >

    <template v-slot:header>

        <div class="row">
            <div class="col-sm-6">
                <div class="header-title">Sistema TI</div>      
                <div class="header-sub-title">Novo Cadastro</div> 
            </div>
            <div class="col-sm-6" style="margin-top:0.8em;" >
                <router-link to="/cadastro" class="btn btn-outline-primary float-right"> Novo cadastro </router-link>
            </div>
        </div>

    </template>

    <template v-slot:content>
        <card style="padding:2em">
          <form action="" id="form-cadastro">

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="nome_usuario">Nome:</label>
                <input type="text" class="form-control" id="nome_usuario" name="nome_usuario">
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="login">Login:</label>
                <input type="text" class="form-control" id="login" name="login">
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" name="email">
              </div>
            </div>
          </div>

          <div class="row">
              
              <div class="col-md-4">
                <div class="form-group">
                  <label for="senha">Senha:</label>
                  <input type="password" class="form-control" id="senha" name="senha">
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label for="tempo_expiracao_senha">Tempo Expiração da senha:</label>
                  <input type="number" class="form-control" id="tempo_expiracao_senha" name="tempo_expiracao_senha">
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label for="cod_autorizacao">Codígo de autorização:</label>
                  <input type="text" class="form-control" id="cod_autorizacao" name="cod_autorizacao">
                </div>
              </div>

              <div class="col-md-2">
                
                  <label for="cod_autorizacao">Status:</label>
                  <b-form-checkbox
                    id="status_usuario"
                    v-model="status"
                    name="status_usuario"
                    value="Ativo"
                    unchecked-value="Inativo"
                  >
                   <div>{{ status }}</div>
                  </b-form-checkbox>
                  
              </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="cod_pesssoa">Cod Pessoa:</label>
                <input type="number" class="form-control" id="cod_pesssoa" name="cod_pessoa">
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="perfis">Perfis:</label>
                  <multiselect
                    name="perfis"
                    label="nome"
                    track-by="id"
                    placeholder="Selecione uma opção"
                    selectLabel="Precione enter para selecionar"
                    selectedLabel="Selecionado"
                    deselectLabel="Precione enter para remover"
                    v-model="selected_perfil"
                    :multiple="true"
                    :options="perfis">
                  </multiselect>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="aparelhos">Aparelhos:</label>

                  <multiselect
                    name="aparelhos"
                     label="codigo_descricao"
                     track-by="id"
                     placeholder="Selecione uma opção"
                     selectLabel="Precione enter para selecionar"
                     selectedLabel="Selecionado"
                     deselectLabel="Precione enter para remover"
                    v-model="selected_aparelho"
                    :multiple="true"
                    :options="aparelhos">
                  </multiselect>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">
            </div>
            <div class="col-md-2">
              <b-button href="/" variant="outline-primary float-right">Cancelar</b-button>
            </div>
            <div class="col-md-2">
              <b-button type="button" @click="store()" variant="outline-primary float-right">Salvar cadastro</b-button>
            </div>
          </div>
            
        </form>
        </card>
    </template>

  </site-template>
</template>
<script>

import SiteTemplate from '@/templates/SiteTemplate'
import Card from '@/components/Card'
import Multiselect from 'vue-multiselect'

export default {
  name: 'home',
  components: {
    SiteTemplate,
    Card,
    Multiselect
  },
  data() {
    return {
        perfis: [],
        aparelhos: [],
        status: 'Inativo',
        selected_aparelho: null,
        selected_perfil: null,
      }
  },
  mounted: function() {
    this.getPerfis()
    this.getAparelhos()
  },
  methods: {
    getPerfis() {
      this.$http.get(this.$urlApi+'perfil/listar-perfis')
      .then(response => {
        let status = response.data.success || null;
        if(status) {
          this.perfis = response.data.data;
        }
      })
    },
    getAparelhos(){
      this.$http.get(this.$urlApi+'aparelho/listar-aparelhos')
      .then(response => {
        let status = response.data.success || null;
        if(status) {
          this.aparelhos = response.data.data;
        }
      })
    },
    store(){
      let form = document.getElementById('form-cadastro');
      let formData = new FormData(form);

      console.log(this.selected_perfil);
    
      formData.append('perfis', this.selected_perfil);  
      // console.log();
      
      this.$http.post(this.$urlApi+'usuario/store', formData)
      .then(response => {
          console.log("store");
          console.log(response);
      })
       .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>