import getSelfInfo from "@/api/getSelfInfo";
export async function useAuth(){
  console.log('token',localStorage.getItem('token'),'userid',localStorage.getItem('user_id'));
  if(false){
    return false
  }else{
    //   return .then(res=>{
    //   return res.data.code === 200 ? true : ()=>{localStorage.setItem('token','');localStorage.setItem('user_id','');return false}
    // })
    var {data}=await getSelfInfo()
    data.code === 200 ? '' : localStorage.setItem('token','');localStorage.setItem('user_id','')
    return data.code === 200
  }
}
