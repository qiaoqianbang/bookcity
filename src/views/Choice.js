import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
class Choice extends Component {
    handleTab(index) {
        const { setState } = this.props
        //tab切换更改currentIndex （高亮，列表数据分类）
        setState('currentIndex', index)
        //动态传入index，获取不同的列表数据
        Axios({
            url: `/man-tab?index=${index}`
        }).then(res => {
            if (res.data.code === 200) {
                setState('novelList', res.data.data)
            }
        })
    }
    //详情
    handleToDetail(id) {
        this.props.history.push({ pathname: `/index/detail/${id}` })
    }
    //收藏
    handleAdd(id) {
        const { setState ,currentIndex} = this.props
        Axios({
            url: `/add-mybook?id=${id}`
        }).then(res => {
            if (res.data.code === 200) {
                //收藏成功后收藏标识更改，再次请求列表刷新数据
                Axios({
                    url: `/man-tab?index=${currentIndex}`
                }).then(res => {
                    if (res.data.code === 200) {
                        setState('novelList', res.data.data)
                    }
                })
            }
        })
    }
    render() {
        const { category, novelList, currentIndex } = this.props
        return (
            <div className='m-choice'>
                <div className="m-choice-nav">
                    {
                        category.map((item, index) => (
                            <span className={currentIndex === index ? 'active1' : ''} key={index} onClick={this.handleTab.bind(this, index)}>{item}</span>
                        ))
                    }
                </div>
                <div className="m-choice-content">
                    {
                        novelList.map((item, index) => (
                            <div className='m-choice-content-item' key={index}>
                                <img src={item.cover} alt="" />
                                <div className='m-choice-content-right'>
                                    <p>{item.title}</p>
                                    <button onClick={this.handleToDetail.bind(this, item.id)}>详情</button>
                                    {
                                        item.is_my_book ? <button onClick={this.handleAdd.bind(this, item.id)}>收藏</button> : <button>已收藏</button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        const { setState,currentIndex } = this.props
        //tab导航，
        Axios({
            url: '/hotRead'
        }).then(res => {
            if (res.data.code === 200) {
                //赋值store的category
                setState('category', res.data.data.category)
            }
        })
        //列表初始渲染
        Axios({
            url: `/man-tab?index=${currentIndex}`
        }).then(res => {
            if (res.data.code === 200) {
                setState('novelList', res.data.data)
            }
        })
    }
}
let mapStateToProps = (state) => {
    return {
        novelList: state.novelList,
        category: state.category,
        currentIndex: state.currentIndex
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setState(key, value) {
            dispatch({ type: 'SET_STATE', key, value })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Choice)