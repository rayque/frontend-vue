<template>
  <site-template >

    <b-table :items="items" :fields="fields" hover responsive="sm">
      
      <template slot="Registro" slot-scope="row" >
        <b-badge pill v-if="row.item.isActive" variant="success">&nbsp;</b-badge>
        <b-badge pill v-else variant="danger">&nbsp;</b-badge> 
        &nbsp;{{row.item.isActive}}
      </template>

      <template slot="btn" slot-scope="row" >
          <b-button @click="editar(row.item.id)" size="sm" variant="outline-primary" class="mr-4">Editar</b-button>
          <b-button @click="excluir(row.item.id)" size="sm" variant="outline-primary">Excluir</b-button>
      </template>

    </b-table>

  </site-template>
</template>
<script>

import SiteTemplate from '@/templates/SiteTemplate'

export default {
  name: 'home',
  components: {
    SiteTemplate
  },
  data() {
    return {
        fields: ['codigo', 'nome', 'Registro', 'btn'],
        items: [
          { id: 1, isActive: true, codigo: 40, nome: 'Dickerson', last_name: 'Macdonald' },
          { id: 2, isActive: false, codigo: 21, nome: 'Larsen', last_name: 'Shaw' },
          { id: 3, isActive: false, codigo: 89, nome: 'Geneva', last_name: 'Wilson'},
          { id: 4, isActive: true, codigo: 38, nome: 'Jami', last_name: 'Carney'},
        ]
      }
  }, methods: {
      editar(id){
        console.log("editar");
        console.log(id);
      },
      excluir(id){
        console.log("excluir");
        console.log(id);
      },
      showButtons(){
        console.log("foo");        
      },
  },
}
</script>
