<template>
  <site-template >

    <template v-slot:header>

        <div class="row">
            <div class="col-sm-6">
                <div class="header-title">Sistema TI</div>      
                <div class="header-sub-title">Novo cadastro</div> 
            </div>
            <div class="col-sm-6" style="margin-top:0.8em;" >
                <router-link to="/cadastro" class="btn btn-outline-primary float-right"> Novo cadastro </router-link>
            </div>
        </div>

    </template>

    <template v-slot:content>
        <card>

          <div class="row" style="padding: 2rem;">

              <div class="col-md-4">
                
                <div class="form-group">
                  <label for="email">Email address:</label>
                  <input type="email" class="form-control" id="email">
                </div>

              </div>
              <div class="col-md-4">
                
                  <label for="checkbox-1">Registro:</label>
                <b-form-checkbox
                  id="checkbox-1"
                  v-model="status"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                </b-form-checkbox>

              </div>
              <div class="col-md-4">

                dfd
              </div>

          </div>
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
    Card
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
  },
  methods: {
    getUsuarios() {
    },
  }
}
</script>
