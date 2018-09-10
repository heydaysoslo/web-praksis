import React, { Component } from 'react'
import { getData } from '../utils/wp'

const DataWrapper = dataType => WrappedComponent => {
  return class DataWrapper extends Component {
    state = {
      data: [],
      loading: true
    }
    setStateAsync = state => {
      return new Promise(resolve => {
        this.setState(state, resolve)
      })
    }
    componentDidMount = async () => {
      const res = await getData()
      if (Array.isArray(dataType) && dataType.length > 1) {
        await this.setStateAsync({
          data: dataType.reduce((object, curr) => {
            object[curr] = res[curr]
            return object
          }, {}),
          loading: false
        })
      } else {
        await this.setStateAsync({
          data: dataType ? { [dataType]: res[dataType] } : res,
          loading: false
        })
      }
    }
    render() {
      return this.state.loading ? (
        <Loading />
      ) : (
        <WrappedComponent {...this.props} {...this.state} />
      )
    }
  }
}

export default DataWrapper
