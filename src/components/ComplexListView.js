'use strict';

import React, { Component } from 'react';
import { ListView } from 'react-native';

import Data from '../Data';

export default class MeteorListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }
  componentWillReceiveProps(props) {
    const { elements } = props;

    const elems = elements();
    this.setState({
      ds: this.state.ds.cloneWithRows(elems),
    });
  }
  componentWillMount() {
    const { elements } = this.props;

    this.onChange = () => {
      const elems = elements();
      this.setState({
        ds: this.state.ds.cloneWithRows(elems),
      });
    };

    this.onChange();
    Data.onChange(this.onChange);
  }
  componentWillUnmount() {
    Data.offChange(this.onChange);
  }
  render() {
    const { ds } = this.state;
    const { listViewRef, ...props } = this.props;

    return <ListView {...props} ref={listViewRef} dataSource={ds} />;
  }
}
