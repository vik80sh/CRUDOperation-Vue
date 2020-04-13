<template>
    <div v-if= "smoothie" class="edit-smoothie container">
        <h2>Edit {{smoothie.title}} Smoothie</h2>
        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">smoothie Title : </label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type= "text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleting(ing)">delete</i>
            </div>
             <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredient : </label>
                <input type="text" name="add-ingredient" v-model="anothor">
                <i class="material-icons add" @click="addIng">add</i>
            </div> 
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
            </div>
            <div class="field center-align">
                <button class="btn pink">Edit Smoothie </button>
            </div>
        </form>
    </div>
</template>

<script>
import db from './../firebase/init';
import slugify from 'slugify'

export default {
    name :"EditSmoothie",
    data(){
        return {
            smoothie: null,
            anothor:null,
            feedback:null
        }
    },
    methods: {
        EditSmoothie(){
            if(this.smoothie.title && this.smoothie.ingredients.length>0){
                this.feedback = null;
                this.smoothie.slug = slugify(this.smoothie.title,{
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-@]/g,
                    lower:true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    slug: this.smoothie.slug,
                    ingredients: this.smoothie.ingredients
                })
                .then(()=>{
                    this.$router.push({name: "Index"})
                })
                .catch(err=>{
                    this.feedback = "Something went Wrong"
                    console.log("Error ",err)
                })
            }else
                this.feedback= "Please add data in Empty fields"
        },
        addIng(){
            if(this.anothor){
                this.smoothie.ingredients.push(this.anothor)
                this.anothor= null;
                this.feedback= null;
            }else{
                this.feedback= "Please add some ingredient"
            }
        },
        deleting(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => ingredient!==ing)
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug','==',this.$route.params.smoothie_slug)
        ref.get()
        .then((snapshot)=>{
            snapshot.forEach(doc=>{
                this.smoothie = doc.data();
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
 .edit-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .edit-smoothie h2{
        font-size: 2em;
        margin: 20px auto;
    }
    .edit-smoothie .field{
        margin: 20px auto;
        position: relative;
    }
    .edit-smoothie .delete{
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
    .edit-smoothie .add{
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>