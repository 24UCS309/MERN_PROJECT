function createResult(error,data){
    const result={}
    if(data){
        result.status="SUCCESS"
        result.data=data
    }else{
        result.status="ERROR"
        result.error=error
    }
    return result
}

module.exports={createResult}