const initialState = [
    {
        id: 0,
        name: "Dhruv Kaura",
        number: 9877523654,
        email: "dhruvkaura25@gmail.com"
    },
    {
        id: 1,
        name: "Ishant",
        number: 9877488887,
        email:  "ishant.kumar@hotmail.com"
    },
];

const contactReducer = (state = initialState, action) =>{
    switch(action.type){
        case "ADD_CONTACT":
            state = [...state, action.payload];
            return state;
        case "UPDATE_STATE":
            const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact );
            state = updateState;
            return state;
        case "DELETE_CONTACT":
            const filterContacts = state.filter(contact => contact.id !== action.payload && contact);
            state = filterContacts;
            return state;
        default:
            return state;
    }
};

export default contactReducer