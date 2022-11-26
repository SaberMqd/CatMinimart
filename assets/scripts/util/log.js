let Log;
export default Log = {
    Debug:function(str){
        this.Print("Debug: " + str);
    },
    Error:function(str){
        this.Print("Error: " + str);
    },
    Print:function(str){
        console.log(str)
    },
}