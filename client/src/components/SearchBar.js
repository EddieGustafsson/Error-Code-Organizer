import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const source = _.times(5, () => ({
  _id: "5ef3a55836a97f2d086377da",
  title: "test",
  description: "dwadwadawdwad",
  type: "dawdawda"
}))

export default class SearchExampleStandard extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source.projects, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    
    return (
      <Segment>
        <Search
          fluid
          input={{ fluid: true, placeholder: 'Search...' }}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
          {...this.props}
        />
      </Segment>
    )
  }
}