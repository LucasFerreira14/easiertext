<template>
    <div class="main-box">
        <div role="group">
            <label for="input-live">Título:</label>
            <b-form-input
            class="title"
            id="input-live"
            :v-model="title"
            :value="title"
            @input="onInputTitle"
            aria-describedby="input-live-help input-live-feedback"
            trim
            :disabled="edit"
            
            ></b-form-input>

        </div>
        <div>
            <b-form-textarea
                class="text"
                id="textarea"
                :v-model="text"
                :value="text"
                @input="onInputText"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                :disabled="edit"
            ></b-form-textarea>
        </div>
        <div class="buttons">

            <b-button @click="deleteText" class="delete" variant="danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></b-button>


            <b-button class="edit" @click="enableEditButton" variant="outline-primary">Editar</b-button>
            <b-button class="save" v-show="save" @click="saveEdition" variant="outline-success">Salvar</b-button>

            <b-button class="copy" @click="copyText" variant="dark">Copiar</b-button>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            edit: true,
            save: false,
            showModal: false,
            showMessage: false,
            title_receive: "",
            text_receive: "",

        }
    },
    methods: {
        async deleteText() {
            let result = await axios.delete("http://easiertext-api.herokuapp.com/texts/delete/" + this.id)
            if (result.status == 200) {
                alert("Texto deletado com sucesso")
            }
            window.location.reload()
        },
        enableEditButton() {
            this.edit = !this.edit
            this.save = !this.save

            this.text_receive = this.text
            this.title_receive = this.title
        },
        async saveEdition(){
            this.save = !this.save;
            this.edit = !this.edit;

            let result = await axios.post("http://easiertext-api.herokuapp.com/texts/edit/" + this.id , {
                "id": this.id,
                "title": this.title_receive,
                "text": this.text_receive
            });

            if (result.status == 200) {
                alert("Texto alterado com sucesso")
            }
            window.location.reload()

        },
        copyText() {
            navigator.clipboard.writeText(this.text); 
        },
        onInputTitle(e) {
            this.title_receive = e
        },
        onInputText(e) {
            this.text_receive = e
        },
             
    },
    props: ["id", "title", "text"]
}
</script>

<style>
.main-box {
    margin: 15px;
    border: 2px solid black;
    padding: 15px;
    border-radius: 8px;
}

.delete {
    margin: 20px 10px 0 0;
}

.edit {
    margin: 20px 20px 0 0;
}

.save {
    margin: 20px 0 0 0;
}


.copy {
    position: absolute;
    margin-top: 20px;
    left: 495px;
}

.title {
    margin-top: 5px;
}

.text {
    margin-top: 10px;
}
</style>