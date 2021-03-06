<template>
    <div>
        <header class="bg-gray-900 shadow h-12 w-full mb-4 flex justify-center items-center">
            <a href="/" class="text-gray-50 font-bold text-lg uppercase tracking-wide">Notes</a>
        </header>

        <div class="w-full px-4 mb-4">
            <div class="block w-full bg-gray-800 rounded-lg h-10 outline-none p-2 flex">
                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
                <input v-model="searchQuery" type="text" class="flex-1 outline-none h-full bg-transparent ml-2 font text-gray-300" placeholder="Search">
            </div>
        </div>

        <div class="px-4 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <router-link :to="`/notes/${note.id}`" v-for="note in filteredNotes" :key="note.id" href="single-note.html" class="bg-blue-200 p-3 rounded shadow">
                <div class="flex justify-between items-center mb-1">
                    <h1 class="font-medium text-lg" v-text="note.title"></h1>
                </div>
                <p class="text-gray-600 text-sm" v-text="note.body"></p>
            </router-link>
        </div>

        <div class="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-20 flex justify-center items-center hidden">
            <div class="bg-white w-4/5 rounded-lg p-4">
                <div class="flex justify-end">
                    <div class="rounded-full bg-transparent border border-gray-500 h-8 w-8 flex justify-center items-center text-gray-500 cursor-pointer hover:border-gray-700 text-gray-700">
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <router-link :to="`/folders/${this.$route.params.id}/create`" class="right-10 bottom-10 z-10 absolute h-14 w-14 rounded-full bg-blue-500 text-white shadow-lg text-xl flex justify-center items-center outline-none focus:outline-none focus:bg-blue-600">
            <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
        </router-link>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            notes: [],

            searchQuery: '',
        };
    },

    mounted() {
        this._fetchNotes();
    },

    computed: {
        filteredNotes() {
            return this.notes.filter(note => {
                return  note.title.toLowerCase().match(this.searchQuery.toLowerCase())
                ||      note.body.toLowerCase().match(this.searchQuery.toLowerCase());
            })
        }
    },

    methods: {
        _fetchNotes() {
            axios.get(`http://localhost:3000/folders/${this.$route.params.id}/notes`)
                .then(response => {
                    this.notes = response.data;
                })
        }
    }
}
</script>
