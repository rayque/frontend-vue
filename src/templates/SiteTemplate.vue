<template>
<div>
    <b-navbar toggleable="lg" type="dark" style="background-color:#1D334B; height: 3.93em">
        <b-navbar-brand href="/" class="title-brand"  > PMZ </b-navbar-brand>
    </b-navbar>

    <b-container>
        <div class="header">
            <slot name="header"></slot>
        </div>   
        
        <slot name="content"></slot>

    </b-container>
</div>
</template>
<style >
    .header{
        margin: 1.3rem 0 2rem 0;
        height: 5em; 
        padding: 1.5em 0 0 0;
    }
    .title-brand{
        font-size: 2.1rem !important;
        font-weight: 800;
        margin-left: 0.4rem; 
    }
</style>


