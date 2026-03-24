const mongoose = require("mongoose")
const { trim } = require("validator")
const { Schema } = mongoose

const ItemsData = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        minlength: [3, "title minimum atlist 3 character"],
        maxlength: [20, "fullName is contains maximum 20 charcter"],
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Invalid Price"],
        trim: true

    },
    description: {
        type: String,
        required: true,
        minlength: [30, "minimun 30 character"],
        trim: true

    },
    total_product:{
        type:Number,
        required:true,
        min: [0, "Invalid Value"],
        trim: true

    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        trim: true

    },
    image: {
        type: String,
        validate: {
            validator: function (v) {
                // Check that it ends with a valid image extension
                return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(v);
            },
            message: props => `${props.value} is not a valid image file!`
        }
    },
    rating: {
        rate: {
            type: Number,
            minlength: [0, "negative no is not allowed"],
            maxlength: [5, "max 5 point is allowed"]
        },
        count: {
            type: Number,
            minlength: [0, "negative no is not allowed"],
            maxlength: [1000, "max 1000 items ia allowed"],

        }
    }

})

const product = mongoose.model("ProductDetail", ItemsData)
module.exports = product;
