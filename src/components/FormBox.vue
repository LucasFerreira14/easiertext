<template>
    <div class="form-box">
        <h3 class="new-text">Novo Texto:</h3>
        <label for="input-live">Título:</label>
        <b-form-input
            class="title-box"
            id="input-live"
            v-model="title"
            :state="titleState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Insira o título do seu texto"
            trim
        ></b-form-input>

        <b-form-invalid-feedback id="input-live-feedback">
        Coloque pelo menos 6 letras
        </b-form-invalid-feedback>

        <b-form-textarea
            class="text-box"
            id="textarea"
            v-model="text"
            placeholder="Escreva alguma coisa..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>

        <b-button class="text-save" @click="createText" variant="dark">Salvar</b-button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    computed: {
      titleState() {
        return this.title.length > 5 ? true : false
      }
    },
    data() {
        return {
            title: "",
            text: "",
        }
    },
    components: { },
    methods: {
        async createText() {
            let result = await axios.post("http://easiertext-api.herokuapp.com/texts/add", {
                "title": this.title,
                "text": this.text
            })
            if (result.status == 200) {
                alert("Texto criado com sucesso")
            }
            window.location.reload()
        }
    },
}
</script>

<style>

.form-box {
    margin: 15px;
    border: 2px solid rgb(255, 0, 0);
    padding: 15px;
    border-radius: 8px;
}

.title-box {
    margin-top: 10px;
    margin-bottom: 2.5px;
}

.text-box {
    margin-bottom: 10px;
    margin-top: 10px;
}

.text-save {
    margin-left: 465px;

}

.new-text{
    margin: 0px 0px 20px 0px;
}

/* .text {
    margin-top: 10px;
} */
</style>
