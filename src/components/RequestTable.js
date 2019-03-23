import React, { Component } from 'react';
import { Table, Divider, Tag, } from 'antd';
import axios from 'axios'
import { Pagination } from 'antd';

import { appId, appKey, departureAirportCode, url, codeType } from '../config.json'
import departing from '../departing.json'
import arriving from '../arriving.json'
import late from '../late.json'

console.log(departing, arriving)


const req = {
  'departing': departing,
  'arriving': arriving,
  'late': late
}


const columns = [{
  title: 'Номер рейса',
  dataIndex: 'flightNumber',
  key: 'flightNumber',
}, {
  title: 'Авиакомпания',
  dataIndex: 'aircompany',
  key: 'aircompany',
}, {
  title: 'Время прибытия',
  dataIndex: 'arrivalTime',
  key: 'arrivalTime',
}, {
  title: 'Город прибытия',
  dataIndex: 'arrivalCity',
  key: 'arrivalCity',
}, {
  title: 'Время отправления',
  key: 'departureTime',
  dataIndex: 'departureTime',
}, {
  title: 'Город назначения',
  key: 'departureСity',
  dataIndex: 'departureСity',
}];





class RequestTable extends Component {


  componentWillMount() {
    this.request(this.props.status)

  }

  constructor(props) {
    super(props)
    console.log('cons')
    this.state = {
      data: [],
    }
  }



  componentWillReceiveProps(nextProps) {
      this.request(nextProps.status, nextProps.search)
      
  }

  imitationRequest = (status) => {
    return req[status]

  }

  request = (status, search) => {
    const { scheduledFlights, appendix: { airlines, airports } } = this.imitationRequest(status)
    const cityes = this.codeToCity(airports)
    const aircompany = this.codeToAircomp(airlines)
    const tempData = []

    for (const fl of scheduledFlights) {
      tempData.push({
        key: fl.flightNumber,
        flightNumber: fl.flightNumber,
        arrivalTime: fl.arrivalTime,
        aircompany: aircompany[fl.carrierFsCode],

        arrivalCity: cityes[fl.arrivalAirportFsCode],
        departureTime: fl.departureTime,
        departureСity: cityes[fl.departureAirportFsCode],


      })
    }

    if (search != '') return this.setState({data: tempData.filter((obj) => obj.flightNumber.startsWith(this.props.search))})

    this.setState({ data: tempData })


  }


  codeToCity = (airports) => {
    const cityObj = {}

    for (const port of airports) {
      cityObj[port.fs] = port.city
    }
    return cityObj
  }

  codeToAircomp = (airlines) => {
    const companyNames = {}
    for (const comp of airlines) {
      companyNames[comp.fs] = comp.name
    }
    return companyNames
  }


  render() {

    return (
      <div>
        <Table columns={columns} dataSource={this.state.data} size='small' pagination={{ pageSize: 5 }} />


      </div>
    );
  }
}

export default RequestTable;