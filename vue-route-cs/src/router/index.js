import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'

import novoFuncionario   from  '@/components/funcionario/Add'
import listFuncionarios from  '@/components/funcionario/List'
import editFuncionario   from  '@/components/funcionario/Edit'

import novoCliente from '@/components/cliente/Add'
import listClientes from '@/components/cliente/List'
import editCliente from '@/components/cliente/Edit'

import novoRaca from '@/components/raca/Add'
import listRacas from '@/components/raca/List'
import editRaca from '@/components/raca/Edit'


import insertPet from '@/components/pet/Add'
import listPets from '@/components/pet/List'
import editPets from '@/components/pet/Edit'

import novoVenda from '@/components/venda/Add'
import listVendas from '@/components/venda/List'
import editVendas from '@/components/venda/Edit'

import novoPagamento from '@/components/pagamento/Add'
import listPagamento from '@/components/pagamento/List'
import editPagamento from '@/components/pagamento/Edit'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
     {
      path: '/listfuncionario',
      name: 'funcionario-list',
      component: listFuncionarios   
    },
    {
      path: '/updatefuncionario/:cpf',
      name: "funcionario-edit",
      component: editFuncionario
    }, 
    {
      path: '/addfuncionario',
      name: "funcionario-add",
      component: novoFuncionario
    },


    {
      path: '/listclientes',
      name: 'clientes-list',
      component: listClientes    
    },
    {
      path: '/updatecliente/:cpf',
      name: "cliente-edit",
      component: editCliente
    }, 
    {
      path: '/addcliente',
      name: "cliente-add",
      component: novoCliente
    },


    {
      path: '/listraca',
      name: 'raca-list',
      component: listRacas    
    },
    {
      path: '/updateraca',
      name: "raca-edit",
      component: editRaca
    }, 
    {
      path: '/addraca',
      name: "raca-add",
      component: novoRaca
    },

    {
      path: '/listpets',
      name: 'pet-list',
      component: listPets    
    },
    {
      path: '/updatepet',
      name: "pet-edit",
      component: editPets
    }, 
    {
      path: '/addpet',
      name: "pet-add",
      component: insertPet
    },


    {
      path: '/listvendas',
      name: 'venda-list',
      component: listVendas    
    },
    {
      path: '/updatevenda/:id',
      name: "venda-edit",
      component: editVendas
    }, 
    {
      path: '/addvenda',
      name: "venda-add",
      component: novoVenda
    },

    {
      path: '/listpagamento',
      name: 'pagamento-list',
      component: listPagamento    
    },
    {
      path: '/updatepagamento',
      name: "pagamento-edit",
      component: editPagamento
    }, 
    {
      path: '/addpagamento',
      name: "pagamento-add",
      component: novoPagamento
    }
  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;