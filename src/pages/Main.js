import React, { Component } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { Input, Radio } from 'antd';


import RequestTable from '../components/RequestTable'

const Search = Input.Search;
const TabPane = Tabs.TabPane



class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'departing',
      search: ''
    };


  }

  callback = (key) => { this.setState({ status: key }) }

  render() {

    return (
      <div>
        <h1>Расписание аэропорта Шереметьево</h1>

        <Search placeholder='Поиск по номеру рейса' enterButton='Поиск' onChange={(e) => this.setState({ search: e.target.value })} />

        <Radio.Group defaultValue="departing" buttonStyle="solid" onChange={(e) => {this.setState({status:e.target.value})}}>
          <Radio.Button value="departing">Вылетающие рейсы</Radio.Button>
          <Radio.Button value="arriving">Прилетающие рейсы</Radio.Button>
          <Radio.Button value="late">Опаздывающие рейсы</Radio.Button>


        </Radio.Group>
        <RequestTable status={this.state.status} search={this.state.search}/>
      </div>
    );
  }
}

export default Main;
