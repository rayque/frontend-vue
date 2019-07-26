<template>
  <site-template >

    <template v-slot:header>

        <div class="row">
            <div class="col-sm-6">
                <div class="header-title">Bem vindo(a) ao</div>      
                <div class="header-sub-title"> Sistema TI </div> 
            </div>
            <div class="col-sm-6" style="margin-top:0.8em;" >
                <router-link to="/cadastro" class="btn btn-outline-primary float-right"> Novo cadastro </router-link>
            </div>
        </div>

    </template>

    <template v-slot:content>

        <card>
          <b-table :items="itens" :fields="fields" hover responsive="sm">
              
            <template slot="status_usuario" slot-scope="row" >
            
              <b-badge pill v-if="row.item.status_usuario == 'Ativo'" variant="success">&nbsp;</b-badge>
              <b-badge pill v-else variant="danger">&nbsp;</b-badge> 
              &nbsp;{{row.item.status_usuario}}
            </template>

            <template slot="acoes" slot-scope="row" >
              <b-button @click="editar(row.item.id)" size="sm" variant="outline-primary" class="mr-4">Editar</b-button>
              <b-button @click="excluir(row.item.id)" size="sm" variant="outline-primary">Excluir</b-button>
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
    console.log("editar");
      console.log(id);
    },
    excluir(id) {
      console.log("excluir");
      console.log(id);
    },
    showButtons() {
      console.log("foo");       
    }
  }
}
</script>
