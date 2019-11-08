import axios from 'axios'
import urls from './urls'
const common=async (config)=>{
    let response= await axios(config)
    return response.data
}
export default{
    getNav:()=>common({url:urls.getNav}),
    getList:(param)=>common({url:urls.getList+param}),
    getMyBook:()=>common({url:urls.getMyBook}),
    myLogin:(param)=>common({url:urls.myLogin,method:'post',data:param}),
    detail:(param)=>common({url:urls.detail,method:'post',data:param}),
    get_mybook:()=>common({url:urls.get_mybook}),
    add_mybook:(param)=>common({url:urls.add_mybook,method:'post',data:param}),
    del_mybook:(param)=>common({url:urls.del_mybook,method:'post',data:param}),
    updata_mybook:(param)=>common({url:urls.updata_mybook,method:'post',data:param})
}