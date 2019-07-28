<template>
  <site-template >

    <template v-slot:header>

        <div class="row">
            <div class="col-sm-6">
                <div class="header-title">Bem vindo(a) ao</div>      
                <div class="header-sub-title"> Sistema TI </div> 
            </div>
            <div class="col-sm-6" style="margin-top:0.8em;" >
                  <b-button-group class="float-right">
                    <b-button @click="relatorio()" size="sm" variant="outline-primary" class="btn-pmz">Relatório</b-button>
                    <router-link to="/cadastro" class="btn-pmz btn btn-outline-primary"> Novo cadastro </router-link>
                  </b-button-group>
            </div>
        </div>

    </template>

    <template v-slot:content>

        <card>
          <b-alert
            :show="true"
            dismissible
            fade
            :variant="variant"
          >
            {{messageAlert}}
          </b-alert>

          <b-table :items="itens" :fields="fields" hover responsive="sm">
            <template slot="status_usuario" slot-scope="row" >
              <b-badge pill v-if="row.item.status_usuario == 'Ativo'" variant="success">&nbsp;</b-badge>
              <b-badge pill v-else variant="danger">&nbsp;</b-badge> 
              &nbsp;{{row.item.status_usuario}}
            </template>

            <template slot="acoes" slot-scope="row" >
              <b-button @click="editar(row.item.id)" size="sm"  variant="outline-primary" class="mr-4 btn-pmz">Editar</b-button>
              <b-button @click="destroy(row.item.id)" size="sm" variant="outline-primary" class="btn-pmz">Excluir</b-button>
            </template>

          </b-table>
        </card>

    </template>

  </site-template>
</template>
<script>

import SiteTemplate from '@/templates/SiteTemplate'
import Card from '@/components/Card'

export default {
  name: 'home',
  components: {
    SiteTemplate,
    Card,
  },
  data() {
    return {
        fields: [          
          {
            key: 'cod_pessoa',
            label: 'Código',
          },          
          {
            key: 'nome_usuario',
            label: 'Nome',
          },        
          {
            key: 'status_usuario',
            label: 'Registro',
          },     
          {
            key: 'acoes',
            label: 'Ações',
          },
        ],
        itens: [],
      }
  },
  mounted: function() {
    this.getUsuarios();
  },
  methods: {
    getUsuarios() {
      this.$http.get(this.$urlApi+'usuario/listar')
      .then(response => {
        let status = response.data.success || null;
        if(status) {
          this.itens = response.data.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    editar(id) {
      this.$store.commit('setusuarioId', id);
      this.$router.push('/editar');
    },
    destroy(id){
      this.$http.post(this.$urlApi+'usuario/destroy', {
        usuario_id: id,
      })
      .then(response => {  
        this.dismissSecs = 5;
        this.dismissCountDown = 0,
        this.showDismissibleAlert = false;

        if (response.data.success) {
          this.$store.commit('setShowAlert', true);
          this.$store.commit('setMessageAlert', response.data.message);
          this.$store.commit('setVariant', 'success');
          
          this.getUsuarios();
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
    },
    relatorio() {
      this
      .$http({
        method: 'GET',
        url: this.$urlApi+'usuario/relatorio',
        responseType: 'blob'
      })
      .then(response => {
        console.log(response);
        
        if (response.data.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || response.data.type == 'application/pdf') {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `relatorio-usuarios.pdf`);
            document.body.appendChild(link);
            link.click();
        } 
      })
      .catch(error => {
        console.log(error);
      })      
    }
  },
  computed:{
     showAlert(){
       return this.$store.getters.showAlert;
     }, 
     messageAlert(){
       return this.$store.getters.messageAlert;
     }, 
     variant(){
       return this.$store.getters.variant;
     } 
  }
}
</script>
