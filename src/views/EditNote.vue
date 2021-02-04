<template>
    <div>
        <header class="bg-gray-900 shadow h-12 w-full mb-4 flex justify-center items-center">
            <a href="/" class="text-gray-50 font-bold text-lg uppercase tracking-wide">Notes</a>
        </header>

        <div class="px-4 mb-4">
            <form class="px-4 py-6 rounded-lg shadow-lg">
                <label for="title" class="text-white text-sm ml-1">Note Title</label>
                <input type="text" class="w-full p-4 rounded-lg outline-none text-gray-300 bg-gray-800 block mb-4 " v-model="title" id="title" name="title">


                <label for="body" class="text-white text-sm ml-1">Note Body</label>
                <textarea type="text" class="w-full h-36 p-4 rounded-lg text-gray-300 bg-gray-800 outline-none bg-transparent mb-4" id="body" name="title" v-model="body"></textarea>


                <div class="flex justify-between items-center">
                    <div>
                        <button @click.prevent="deleteNote" class="bg-red-500 text-white px-6 py-3 inline-block mb-6 shadow-lg rounded-lg hover:shadow flex items-center">
                            <svg class="h-5 w-5 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>

                            <span class="hidden ml-2 md:inline">Delete Note</span>
                        </button>
                    </div>

                    <div class="flex">
                        <a @click.prevent="saveNote" href="notes.html" class="bg-blue-500 text-white px-6 py-3 inline-block mb-6 shadow-lg rounded-lg hover:shadow flex items-center">
                            <svg class="h-5 w-5 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>

                            <span class="hidden ml-2 md:inline">Save</span>

                        </a>
                        <a @click.prevent="$router.go(-1)" href="notes.html" class="bg-transparent text-gray-800 px-6 py-3 inline-block mb-6 rounded-lg hover:shadow flex items-center">
                            <svg class="h-5 w-5 text-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>

                            <span class="hidden ml-2 md:inline">Cancel</span>
                        </a>
                    </div>
                </div>
            </form>
        </div>



    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            title: '',
            body: '',
        }
    },

    mounted() {
        this._fetchNote();
    },

    methods: {
        deleteNote() {
            axios.delete(`http://localhost:3000/notes/${this.$route.params.id}`)
                .then(response => {
                    this.$router.go(-1);
                });
        },

        saveNote() {
            axios.patch(`http://localhost:3000/notes/${this.$route.params.id}`, {
                title: this.title,
                body: this.body,
            }).then(response => {
                this.$router.go(-1);
            });
        },

        _fetchNote() {
            axios.get(`http://localhost:3000/notes/${this.$route.params.id}`)
                .then(response => {
                    this.title = response.data.title;
                    this.body = response.data.body;
                });
        },
    }
}
</script>
