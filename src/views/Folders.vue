<template>
    <div>
        <header class="bg-gray-900 shadow h-12 w-full mb-4 flex justify-center items-center">
            <a href="/" class="text-gray-50 font-bold text-lg uppercase tracking-wide">Notes</a>
        </header>
        <!-- <h1 class="text-4xl font-bold px-4 mt-4 mb-4">
            Notes
        </h1> -->

        <div class="w-full px-4 mb-4">
            <div class="block w-full bg-gray-800 rounded-lg h-10 outline-none p-2 flex">
                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
                <input v-model="searchQuery" type="text" class="flex-1 outline-none h-full bg-transparent ml-2 font text-gray-300" placeholder="Search">
            </div>
        </div>


        <div class="px-4 mb-4 lg:grid lg:grid-cols-4 lg:gap-2">
            <router-link :to="`/folders/${folder.id}`" v-for="folder in filteredFolders" :key="folder.id" href="notes.html" class="bg-gray-700 hover:bg-gray-600 shadow w-full rounded-lg flex px-3 py-4 mb-3 cursor-pointer">
                <div class="text-blue-500 flex justify-center items-center">
                    <svg class="h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                </div>

                <div class="flex-1 flex justify-center items-start flex-col">
                    <div class="ml-6">
                        <h2 class="text-lg font-medium text-white" v-text="folder.name"></h2>
                        <p class="text-sm text-gray-400">Last updated yesterday</p>
                    </div>
                </div>
            </router-link>
        </div>

        <a @click.prevent="showModal = true" href="new-folder.html" class="block right-10 bottom-10 z-10 absolute h-14 w-14 rounded-full bg-blue-500 text-white shadow-lg text-xl flex justify-center items-center outline-none focus:outline-none focus:bg-blue-600">
            <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
        </a>

        <div v-show="showModal" class="w-full h-full fixed top-0 left-0 z-10 bg-black bg-opacity-70 flex items-center">
            <div class="bg-gray-900 w-4/5 mx-auto rounded-2xl shadow-lg">


                <div class="flex justify-end m-4">
                    <a @click.prevent="showModal = false" href="index.html">
                        <svg class="h-6 w-6 text-gray-300 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>

                <div class="flex items-center flex-col">
                    <svg class="h-14 w-14 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>

                    <p class="font-medium text-gray-100">
                        Create New Folder
                    </p>

                    <form @submit.prevent="addNewFolder" class="m-4 flex" action="/">
                        <input v-model="newFolderName" type="text" class="w-full p-2 rounded-lg bg-gray-800 text-gray-300 outline-none block mb-4 text-center text-sm" placeholder="Your Folder Name" autofocus>

                        <button class="hidden" type="submit"></button>
                    </form>


                </div>


            </div>
        </div>


    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            folders: [],

            searchQuery: '',

            showModal: false,

            newFolderName: '',
        }
    },

    mounted() {
        this._fetchFolders();
    },

    computed: {
        filteredFolders() {
            return this.folders.filter(folder => {
                return folder.name.toLowerCase().match(this.searchQuery.toLowerCase());
            })
        }
    },

    methods: {
        addNewFolder() {
            axios.post('http://localhost:3000/folders', {
                name: this.newFolderName
            }).then(response => {
                console.log(response.data);

                this.folders.push(response.data);

                this.newFolderName = '';
                this.showModal = false;
            });

        },

        _fetchFolders() {
            axios.get('http://localhost:3000/folders')
                .then(response => {
                    this.folders = response.data;
                })
        }
    }
}
</script>
