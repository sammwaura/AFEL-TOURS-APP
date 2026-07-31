import moongoose from 'mongoose';

const BookngSchema = new moongoose.Schema({
    room: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    hotel: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    guests: {
            type: Number,
            required: true,
        },
    hasKids: {
        type: Boolean,
        default: false,
    },
    kidsAges: {
        type: [Number], //eg, [4-7]
        default:[],
    },

    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
);
export default moongoose.model("Booking", BookngSchema);
