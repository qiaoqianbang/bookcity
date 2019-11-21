import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
class Detail extends Component {
    componentDidMount() {
        const { id } = this.props.match.params
        const { setState } = this.props
        Axios({
            url: `/mydetail?id=${id}`
        }).then(res => {
            if (res.data.code === 200) {
                setState('detail', res.data.data)
            }
        })
    }
    handleAdd(id){
        const { setState} = this.props
        Axios({
            url: `/add-mybook?id=${id}`
        }).then(res=>{
            if(res.data.code===200){
                Axios({
                    url: `/mydetail?id=${id}`
                }).then(res => {
                    if (res.data.code === 200) {
                        setState('detail', res.data.data)
                    }
                })        
            }
        })
    }
    render() {
        const { detail } = this.props
        //console.log(detail)
        return (
            <div>
                {
                    <div className='m-detail-item' >
                        <img src={detail.cover} alt="" />
                        <p>简介：{detail.description}</p>
                        <p>{detail.title}</p>
                        {detail.is_my_book ? <button onClick={this.handleAdd.bind(this, detail.id)}>收藏</button> : <button>已收藏</button>}
                    </div>

                }
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        detail: state.detail
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setState(key, value) {
            dispatch({ type: 'SET_STATE', key, value })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)