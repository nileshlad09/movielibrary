export const initialState = localStorage.getItem("token2") || null;

export const reducer = (state, action)=>{
      if(action.type==="USER"){
        return action.payload;
      }
      return state;
}