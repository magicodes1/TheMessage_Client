
function MessageReducer(state,action) {
    switch (action.type) {
        case 'ADD':{
            return [...action.messages];
        }
        case 'MESSAGES':{
            return [...state];
        }
        case 'ADD_MESSAGE':{
            const message = action.message;
            return [...state,message];
        }
        default:{
            return state;
        }
           
    }
}

export default MessageReducer
