<template>
  <site-template >

    <template v-slot:header>

        <div class="row">
            <div class="col-sm-6">
                <div class="header-title">Sistema TI</div>      
                <div class="header-sub-title">Editar Cadastro</div> 
            </div>
   
        </div>

    </template>

    <template v-slot:content>
        <card style="padding:2em">
        <b-alert
            :show="showAlert"
            dismissible
            fade
            :variant="variant"
          >
            {{message}}
          </b-alert>


          <form action="" id="form-cadastro">

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="nome_usuario">Nome:</label>
                <input  v-validate="'required'" data-vv-as="Nome" v-model="nome_usuario" type="text" class="form-control" id="nome_usuario" name="nome_usuario">
                 <div class="error">{{ errors.first('nome_usuario')}}</div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="login">Login:</label>
                <input v-validate="'required'" data-vv-as="Login"  v-model="login"  type="text" class="form-control" id="login" name="login">
                <div class="error">{{ errors.first('login')}}</div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="email">Email:</label>
                <input v-validate="'required|email'"  data-vv-as="Email"   v-model="email" type="email" class="form-control" id="email" name="email">
                <div class="error">{{ errors.first('email')}}</div>
              </div>
            </div>
          </div>

          <div class="row">
              
              <div class="col-md-4">
                <div class="form-group">
                  <label for="senha">Senha:</label>
                  <input data-vv-as="Senha"  v-model="senha"  type="password" class="form-control" id="senha" name="senha">
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label for="tempo_expiracao_senha">Tempo Expiração da senha:</label>
                  <input v-validate="'required|length:1'" data-vv-as="Tempo Expiração da senha"   v-model="tempo_expiracao_senha" type="number" class="form-control" id="tempo_expiracao_senha" name="tempo_expiracao_senha">
                  <div class="error">{{ errors.first('tempo_expiracao_senha')}}</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <label  for="cod_autorizacao">Codigo de autorização:</label>
                  <input v-validate="{ required: true, length:1 , regex: /^[a-zA-Z ]*$/}"  data-vv-as="Codigo de autorização"  v-model="cod_autorizacao" type="text" class="form-control" id="cod_autorizacao" name="cod_autorizacao">
                  <div class="error">{{ errors.first('cod_autorizacao')}}</div>
                </div>
              </div>

              <div class="col-md-2">
                
                  <label for="cod_autorizacao">Status:</label>
                  <b-form-checkbox
                    id="status_usuario"
                    v-model="status_usuario"
                    name="status_usuario"
                    value="Ativo"
                    unchecked-value="Inativo"
                  >
                   <div>{{ status_usuario }}</div>
                  </b-form-checkbox>
                  
              </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="cod_pessoa">Cod. Pessoa:</label>
              <input v-validate="'required'" data-vv-as="Cod. Pessoa"  v-model="cod_pessoa" type="number" class="form-control" id="cod_pessoa" name="cod_pessoa">
                <div class="error">{{ errors.first('cod_pessoa')}}</div>
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
              <b-button href="/" class="btn-pmz" variant="outline-primary float-right">Cancelar</b-button>
            </div>
            <div class="col-md-2">
              <b-button type="button" @click="store()" class="btn-pmz" variant="outline-primary float-right">Salvar cadastro</b-button>
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
        status_usuario: 'Inativo',
        nome_usuario: '',
        login: '',
        email: '',
        senha: '',
        tempo_expiracao_senha: '',
        cod_autorizacao: '',
        cod_pessoa: '',
        selected_aparelho: null,
        selected_perfil: null,
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        variant: '',
        message: '',
        showAlert: false, 
      }
  },
  mounted: function() {
    this.getPerfis()
    this.getAparelhos()
    this.getDadosUsuario();
  },
  methods: {
    getDadosUsuario(){   
      let usuarioId = this.$store.getters.usuarioId
      
      if(usuarioId) {
        this.$http.get(this.$urlApi+'usuario/get-dados/'+usuarioId)
          .then(response => {
            
            let status = response.data.success || null;
            if(status) {
              let data = response.data.data;

              this.status_usuario = data.status_usuario  == 'I'? 'Inativo': 'Ativo';
              this.nome_usuario = data.nome_usuario;
              this.login = data.login;
              this.email = data.email;
              this.tempo_expiracao_senha = data.tempo_expiracao_senha;
              this.cod_autorizacao = data.cod_autorizacao;
              this.cod_pessoa = data.cod_pessoa;              
            }
        })
      } else {
          this.$router.push('/');
      }
      
    },
    getPerfis() {
      this.$http.get(this.$urlApi+'perfil/listar-perfis')
      .then(response => {
        let status_usuario = response.data.success || null;
        if(status_usuario) {
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
      this.$validator.validateAll().then(result => {
        if (result) {
        this.$http.post(this.$urlApi+'usuario/update', {
          usuario_id: this.$store.getters.usuarioId,
          nome_usuario: this.nome_usuario,
          status_usuario: this.status_usuario,
          nome_usuario: this.nome_usuario,
          login: this.login,
          email: this.email,
          senha: this.senha,
          tempo_expiracao_senha: this.tempo_expiracao_senha,
          cod_autorizacao: this.cod_autorizacao,
          cod_pessoa: this.cod_pessoa,
          selected_aparelho: this.selected_aparelho,
          selected_perfil: this.selected_perfil,
        })
        .then(response => {  
          this.dismissSecs = 5;
          this.dismissCountDown = 0,
          this.showDismissibleAlert = false;

          if (response.data.success) {
            this.$store.commit('setShowAlert', true);
            this.$store.commit('setMessageAlert', response.data.message);
            this.$store.commit('setVariant', 'success');
            
            this.$router.push('/');
          } else {
            this.variant = 'danger';
            this.message = response.data.message;
            this.showAlert = true;
          }
        })
        .catch(function (error) {
          console.log(error);
    
          this.variant = 'danger';
          this.message = response.data.message;
          this.showAlert = true;
        }) 
        }
      });
    

    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>