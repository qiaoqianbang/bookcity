import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
class Mybook extends Component {
    componentDidMount() {
        const { setState } = this.props
        //页面初始请求书包
        Axios({
            url: '/get-mybook'
        }).then(res => {
            if (res.data.code === 200) {
                setState('myBook', res.data.data)
            }
        })
    }
    componentDidUpdate(){
        const {myBook}=this.props
        Axios({
            url:'/update_mybook',
            data:{mybook:myBook},
            method:'post'
        }).then(res=>{
        
        })
    }
    handleRemoveBook(index) {
        const { setState, myBook } = this.props
        //判断是否选中，选中删除
        if (myBook[index].flag) {
            let newMyBook = JSON.parse(JSON.stringify(myBook))
            newMyBook.splice(index,1)
            setState('myBook', newMyBook)
            //点击删除，
          
        }
    }
    handleChangeInput(index) {
        const { myBook, setState } = this.props
        let newMyBook = JSON.parse(JSON.stringify(myBook))
        newMyBook[index].flag = !newMyBook[index].flag     
        setState('myBook', newMyBook)
    }
    handleAll(){
        const { myBook, setState } = this.props
        let newMyBook = JSON.parse(JSON.stringify(myBook))
        newMyBook.forEach(i=>{
            i.flag=!i.flag
        })
        setState('myBook', newMyBook)
    }
    handleRemoveAll(){
        const { myBook, setState } = this.props
        let newMyBook = JSON.parse(JSON.stringify(myBook))
        let filterMyBook=newMyBook.filter(i=>!i.flag)
    setState('myBook',filterMyBook)
    }
    render() {
        const { myBook } = this.props
        console.log(myBook)
        let allChecked=myBook.every(i=>i.flag)&&myBook.length>0
        return (
            <div className='m-mybook'>
                {
                    myBook.map((item, index) => (
                        <div key={index} className='m-mybook-item'>
                            <img src={item.cover} alt="" />
                            <div className="m-mybook-item-right">
                                <p>
                                    <input type="checkbox" checked={item.flag} onChange={this.handleChangeInput.bind(this, index)} />
                                    {item.title}
                                </p>
                                <button onClick={this.handleRemoveBook.bind(this, index)}>删除</button>
                            </div>
                        </div>
                    ))
                }
                <div className="m-mybook-bottom">
                    <p>全选 <input type="checkbox"  checked={allChecked} onChange={this.handleAll.bind(this)}/></p>
                    <button onClick={this.handleRemoveAll.bind(this)}>删除选中</button>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        myBook: state.myBook
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setState(key, value) {
            dispatch({ type: 'SET_STATE', key, value })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mybook)