<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">PMZ</b-navbar-brand>
    </b-navbar>

    <b-container>
        <div>
            <div>Bem vindo(a) ao</div>      
            <div> <b> Sistema TI </b> </div>      
        </div>  

        <div class="pmz-card">
            <slot></slot>
        </div>
    </b-container>

</div>
</template>
<script>
export default {
}
</script>
<style>
    .pmz-card {
        border-top: 0.4em solid #1D334B;
        /* border-left: 1px solid #4A4A4A;
        border-right: 1px solid #4A4A4A;
        border-bottom: 1px solid #4A4A4A; */
        min-height: 10em;
    }
</style>

